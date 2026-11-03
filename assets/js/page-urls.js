'use strict';

(() => {
  function splitReference(value) {
    const hashAt = value.indexOf('#');
    const hash = hashAt < 0 ? '' : value.slice(hashAt);
    const beforeHash = hashAt < 0 ? value : value.slice(0, hashAt);
    const queryAt = beforeHash.indexOf('?');
    return {
      path: queryAt < 0 ? beforeHash : beforeHash.slice(0, queryAt),
      search: queryAt < 0 ? '' : beforeHash.slice(queryAt),
      hash
    };
  }

  function createPageUrlResolver(pageMap, siteRoot) {
    const root = new URL(siteRoot);
    const files = new Map();
    const canonicalFiles = new Map();
    for (const [file, target] of Object.entries(pageMap || {})) {
      if (!/^[a-z0-9][a-z0-9-]*\.html$/.test(file) || typeof target !== 'string'
        || !/^\/(?:[a-z0-9-]+\/)?(?:#[a-z0-9-]+)?$/.test(target)) continue;
      const parsed = splitReference(target);
      files.set(file, parsed);
      // Redirect aliases such as voorbeelden.html must not replace index.html
      // as the offline destination of the homepage.
      if (!parsed.hash) {
        canonicalFiles.set(parsed.path, file);
        if (parsed.path !== '/') {
          canonicalFiles.set(parsed.path.slice(0, -1), file);
          canonicalFiles.set(parsed.path + 'index.html', file);
        }
      }
    }

    return function toHref(value) {
      if (typeof value !== 'string' || !value || /^[#?]/.test(value)
        || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(value)) return value;
      const parsed = splitReference(value);
      const legacy = /^(?:\/|(?:\.\.?\/)*)?([a-z0-9][a-z0-9-]*\.html)$/.exec(parsed.path);
      const file = legacy && files.has(legacy[1]) ? legacy[1] : canonicalFiles.get(parsed.path);
      if (!file) return value;
      const target = files.get(file);
      let hash = target.hash || parsed.hash;
      // Retired report links keep the selected report in the homepage reader.
      // Other aliases retain their fixed landing section.
      if (file === 'voorbeelden.html' && target.hash === '#voorbeeldrapport') {
        hash = parsed.hash === '#rapport-bekijken' ? '#concurrentieanalyse'
          : ['#concurrentieanalyse', '#omgevingsanalyse'].includes(parsed.hash)
            ? parsed.hash : '#voorbeeldrapport';
      }
      if (root.protocol === 'file:') {
        const offlineFile = target.hash ? canonicalFiles.get(target.path) || file : file;
        return new URL(offlineFile + parsed.search + hash, root).href;
      }
      return target.path + parsed.search + hash;
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { createPageUrlResolver };
  if (typeof document === 'undefined') return;
  const payload = document.querySelector('[data-page-url-map]');
  const scriptUrl = document.currentScript?.src;
  if (!payload || !scriptUrl) return;
  let pageMap;
  try { pageMap = JSON.parse(payload.textContent); } catch (_) { return; }
  const root = new URL('../../', scriptUrl);
  const toHref = createPageUrlResolver(pageMap, root.href);
  window.VARIANA_URLS = Object.freeze({ toHref, root: root.href });
  document.querySelectorAll('a[href]').forEach(link => {
    const before = link.getAttribute('href');
    const after = toHref(before);
    if (after !== before) link.setAttribute('href', after);
  });
})();

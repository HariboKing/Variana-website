'use strict';

(() => {
  document.querySelectorAll('[data-system-explorer]').forEach(root => {
    let content;
    try { content = JSON.parse(root.querySelector('[data-system-content]').textContent); } catch (_) { return; }
    const buttons = [...root.querySelectorAll('[data-system-node]')];
    const categories = new Set(['strategie', 'ontwikkeling', 'marketing', 'evaluatie']);
    const aliases = {
      systeem: 'input', architectuur: 'input', systeemopbouw: 'input', 'fases-titel': 'input', vraagstuk: 'input',
      analyses: 'analyse', analytisch: 'analyse', onderzoek: 'blauwdruk', blauwdruk: 'blauwdruk', samenhang: 'blauwdruk',
      'specialistische-modules': 'modules', uitwerken: 'modules', strategie: 'strategie',
      ontwikkeling: 'ontwikkeling', marketing: 'marketing', beoordelen: 'evaluatie', evaluatie: 'evaluatie'
    };
    const safeLink = /^[a-z0-9][a-z0-9-]*\.html(?:#[a-z0-9-]+)?$/;

    function select(id, updateHash = false) {
      const item = content[id];
      if (!item || !safeLink.test(item.href)) return;
      buttons.forEach(button => {
        const active = button.dataset.systemNode === id;
        button.classList.toggle('is-selected', active);
        button.classList.toggle('is-parent', button.dataset.systemNode === 'modules' && categories.has(id));
        button.setAttribute('aria-pressed', String(active));
      });
      root.querySelector('[data-system-detail-kicker]').textContent = item.kicker;
      root.querySelector('[data-system-detail-title]').textContent = item.title;
      root.querySelector('[data-system-detail-description]').textContent = item.description;
      root.querySelector('[data-system-detail-relation]').textContent = item.relation;
      root.querySelector('[data-system-detail-link]').setAttribute('href', window.VARIANA_URLS?.toHref(item.href) || item.href);
      root.dataset.selectedNode = id;
      if (updateHash) {
        const button = buttons.find(candidate => candidate.dataset.systemNode === id);
        try { history.replaceState(null, '', '#' + button.id); } catch (_) { /* File previews remain usable. */ }
      }
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => select(button.dataset.systemNode, true));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % buttons.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          buttons[next].focus();
          select(buttons[next].dataset.systemNode, true);
        }
      });
    });
    select(aliases[location.hash.slice(1)] || 'input');
    window.addEventListener('hashchange', () => {
      const id = aliases[location.hash.slice(1)];
      if (id) select(id);
    });
    root.dataset.ready = 'true';
  });
})();

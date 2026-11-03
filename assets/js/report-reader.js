(() => {
  'use strict';
  document.querySelectorAll('[data-report-reader]').forEach(root => {
    const buttons = Array.from(root.querySelectorAll('[data-report-select]'));
    const sources = Array.from(root.querySelectorAll('[data-report-source]'));
    const frame = root.querySelector('[data-report-frame]');
    const panel = root.querySelector('#report-reader-panel');
    const title = root.querySelector('[data-report-active-title]');
    const description = root.querySelector('[data-report-description]');
    const meta = root.querySelector('[data-report-meta]');
    const open = root.querySelector('[data-report-open]');
    const download = root.querySelector('[data-report-download]');
    const reports = new Map(sources.map(source => {
      const file = source.querySelector('[data-report-source-open]');
      const downloadLink = source.querySelector('[data-report-source-download]');
      return [source.dataset.reportSource, {
        label: source.dataset.reportLabel,
        description: source.dataset.reportDescription,
        pages: source.dataset.reportPages,
        size: source.dataset.reportSize,
        url: file.href,
        filename: downloadLink.getAttribute('download')
      }];
    }));
    if (!buttons.length || !frame || !panel || buttons.some(button => !reports.has(button.dataset.reportSelect))) return;

    function select(button, options = {}) {
      const id = button.dataset.reportSelect;
      const report = reports.get(id);
      if (!report) return;
      buttons.forEach(candidate => {
        const selected = candidate === button;
        candidate.setAttribute('aria-selected', String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', button.id);
      title.textContent = report.label;
      description.textContent = report.description;
      meta.textContent = `${report.label} · PDF · ${report.pages} pagina’s · ${report.size}`;
      open.href = report.url;
      open.setAttribute('aria-label', `Open de ${report.label.toLocaleLowerCase('nl-NL')} in een apart venster`);
      download.href = report.url;
      download.setAttribute('download', report.filename);
      download.setAttribute('aria-label', `Download de ${report.label.toLocaleLowerCase('nl-NL')} als PDF`);
      frame.title = `${report.label}, PDF van ${report.pages} pagina’s`;
      if (frame.dataset.reportId !== id) {
        frame.src = `${report.url}#view=FitH`;
        frame.dataset.reportId = id;
      }
      root.dataset.activeReport = id;
      if (options.focus) button.focus();
      if (options.hash) {
        const url = new URL(window.location.href);
        url.hash = id;
        window.history.replaceState(null, '', url);
      }
    }

    function hashButton() {
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return null; }
      return buttons.find(button => button.dataset.reportSelect === id) || null;
    }
    buttons.forEach((button, index) => {
      button.disabled = false;
      button.addEventListener('click', () => select(button, { hash: true }));
      button.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = buttons[(index + 1) % buttons.length];
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = buttons[(index + buttons.length - 1) % buttons.length];
        if (event.key === 'Home') target = buttons[0];
        if (event.key === 'End') target = buttons[buttons.length - 1];
        if (!target) return;
        event.preventDefault();
        select(target, { focus: true, hash: true });
      });
    });
    select(hashButton() || buttons[0]);
    root.querySelector('[data-report-files]').hidden = true;
    window.addEventListener('hashchange', () => {
      const button = hashButton();
      if (button) select(button);
    });
  });
})();

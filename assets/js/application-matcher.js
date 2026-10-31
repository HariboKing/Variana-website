'use strict';

(() => {
  document.querySelectorAll('[data-application-matcher]').forEach(root => {
    const payload = root.querySelector('[data-matcher-data]');
    if (!payload) return;
    let data;
    try { data = JSON.parse(payload.textContent); } catch (_) { return; }
    if (!data.routes?.length || !data.outputs?.length) return;
    const questions = [...root.querySelectorAll('[data-matcher-question]')];
    const outputs = [...root.querySelectorAll('[data-matcher-output]')];
    const modules = [...root.querySelectorAll('[data-matcher-module]')];
    const status = root.querySelector('[data-matcher-status]');
    const tabs = [...root.querySelectorAll('[data-matcher-tab]')];
    const panels = [...root.querySelectorAll('[data-matcher-panel]')];
    const panelHashes = { a: 'vraagstuk', b: 'onderzoek', c: 'samenhang' };
    const hashPanels = { vraagstuk: 'a', onderzoek: 'b', samenhang: 'c', resultaten: 'c', demonstratie: 'a' };

    function setPanel(name, focus = false, updateHash = true) {
      if (!tabs.some(tab => tab.dataset.matcherTab === name)) return;
      tabs.forEach(tab => {
        const selected = tab.dataset.matcherTab === name;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus();
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.matcherPanel !== name; });
      root.dataset.activePanel = name;
      if (updateHash) {
        try { history.replaceState(null, '', '#' + panelHashes[name]); } catch (_) { /* Local file previews still work. */ }
      }
    }

    function selectRoute(id, focus = false) {
      const route = data.routes.find(item => item.id === id);
      if (!route) return;
      const outputIds = new Set(route.outputIds || []);
      const moduleIds = new Set(route.moduleIds || []);
      questions.forEach(button => {
        const active = button.dataset.matcherQuestion === route.id;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-checked', String(active));
        button.tabIndex = active ? 0 : -1;
        if (active && focus) button.focus();
      });
      outputs.forEach(output => {
        const active = outputIds.has(output.dataset.matcherOutput);
        output.classList.toggle('is-active', active);
        if (active) output.setAttribute('aria-describedby', 'matcher-selection');
        else output.removeAttribute('aria-describedby');
      });
      modules.forEach(module => {
        const active = moduleIds.has(module.dataset.matcherModule);
        module.classList.toggle('is-active', active);
        if (active) module.setAttribute('aria-describedby', 'matcher-selection');
        else module.removeAttribute('aria-describedby');
      });
      root.dataset.selectedRoute = route.id;
      if (status) {
        const labels = data.outputs.filter(item => outputIds.has(item.id)).map(item => item.label);
        status.textContent = 'Gekozen output: ' + labels.join(', ') + '.';
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => setPanel(tab.dataset.matcherTab));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          event.stopPropagation();
          setPanel(tabs[next].dataset.matcherTab, true);
        }
      });
    });

    questions.forEach((button, index) => {
      button.addEventListener('click', () => selectRoute(button.dataset.matcherQuestion));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % questions.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + questions.length) % questions.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = questions.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          event.stopPropagation();
          selectRoute(questions[next].dataset.matcherQuestion, true);
        }
      });
    });
    const requested = new URLSearchParams(location.search).get('vraag');
    selectRoute(data.routes.some(route => route.id === requested) ? requested : data.defaultRoute);
    setPanel(hashPanels[location.hash.slice(1)] || 'a', false, false);
    window.addEventListener('hashchange', () => {
      const hash = location.hash.slice(1);
      if (!hash || hashPanels[hash]) setPanel(hashPanels[hash] || 'a', false, false);
    });
    root.dataset.ready = 'true';
  });
})();

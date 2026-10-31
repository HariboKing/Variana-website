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
          selectRoute(questions[next].dataset.matcherQuestion, true);
        }
      });
    });
    const requested = new URLSearchParams(location.search).get('vraag');
    selectRoute(data.routes.some(route => route.id === requested) ? requested : data.defaultRoute);
    root.dataset.ready = 'true';
  });
})();

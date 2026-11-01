'use strict';

(() => {
  // This public selector describes possible work. It never executes research.
  const governmentExclusions = new Set(['financiering', 'pitchdeck', 'memorandum', 'targetlist', 'investering']);

  function resolveSelection(data, input) {
    const organization = data.organizations.find(item => item.id === input.organization) || null;
    const route = data.routes.find(item => item.id === input.routeId) || null;
    const goals = organization ? data.goals.filter(item => item.organizations.includes(organization.id)) : [];
    const goal = route?.id === 'uitwerking' ? goals.find(item => item.id === input.goalId) || null : null;
    const tasks = goal ? data.tasks.filter(item => item.goalId === goal.id && item.organizations.includes(organization.id)
      && !(organization.id === 'overheid' && governmentExclusions.has(item.id))) : [];
    const task = tasks.find(item => item.id === input.taskId) || (tasks.length === 1 ? tasks[0] : null);
    const pending = !organization ? 'organization' : !route ? 'route'
      : route.id !== 'uitwerking' ? null : !goal ? 'goal' : !task ? 'task' : null;
    const complete = pending === null;
    const category = complete ? data.outputs.find(item => item.id === route.outputIds[0]) : null;
    const result = complete ? (route.id === 'uitwerking'
      ? { id: task.id, label: task.outputLabel, description: task.description, href: task.href }
      : { id: category.id, label: route.resultLabel || category.label, description: route.resultDescription || category.description, href: category.href }) : null;
    const stepIds = complete ? (route.id === 'uitwerking' ? task.stepIds : data.flows[route.id]) : [];
    const steps = stepIds.map(id => data.steps.find(item => item.id === id))
      .filter(item => item && !(organization.id === 'overheid' && item.businessOnly));
    return { organization, route, goals, goal, tasks, task, pending, complete, result, steps,
      outputIds: complete ? route.outputIds : [] };
  }

  // Keep the resolver available to the dependency-free regression check.
  if (typeof module !== 'undefined' && module.exports) module.exports = { resolveSelection };
  if (typeof document === 'undefined') return;

  document.querySelectorAll('[data-application-matcher]').forEach(root => {
    const payload = root.querySelector('[data-matcher-data]');
    if (!payload) return;
    let data;
    try { data = JSON.parse(payload.textContent); } catch (_) { return; }
    if (!data.organizations?.length || !data.routes?.length || !data.tasks?.length) return;
    const choices = [...root.querySelectorAll('[data-matcher-choice]')];
    const outputs = [...root.querySelectorAll('[data-matcher-output]')];
    const tabs = [...root.querySelectorAll('[data-matcher-tab]')];
    const panels = [...root.querySelectorAll('[data-matcher-panel]')];
    const groups = [...root.querySelectorAll('[data-matcher-group]')];
    const status = root.querySelector('[data-matcher-status]');
    const flow = root.querySelector('[data-matcher-modules]');
    const panelHashes = { a: 'vraagstuk', b: 'onderzoek', c: 'samenhang' };
    const hashPanels = { vraagstuk: 'a', onderzoek: 'b', samenhang: 'c', resultaten: 'c', demonstratie: 'a' };
    const state = { organization: null, routeId: null, goalId: null, taskId: null };
    const stateKeys = { organization: 'organization', route: 'routeId', goal: 'goalId', task: 'taskId' };
    const pendingText = {
      organization: 'Kies bij A eerst voor welke organisatie je vraag bedoeld is.',
      route: 'Kies bij A eerst welke uitkomst je nodig hebt.',
      goal: 'Geef bij A aan waarvoor je de gerichte uitwerking wilt gebruiken.',
      task: 'Maak bij A de laatste keuze om de passende uitwerking te bepalen.'
    };
    let selection;

    function setPanel(name, focus = false, updateHash = true, scroll = false) {
      if (!tabs.some(tab => tab.dataset.matcherTab === name)) return;
      tabs.forEach(tab => {
        const selected = tab.dataset.matcherTab === name;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && focus) tab.focus({ preventScroll: true });
      });
      panels.forEach(panel => { panel.hidden = panel.dataset.matcherPanel !== name; });
      root.dataset.activePanel = name;
      if (updateHash) {
        try { history.replaceState(null, '', '#' + panelHashes[name]); } catch (_) { /* Local previews still work. */ }
      }
      if (scroll) root.scrollIntoView({ block: 'start', behavior: 'auto' });
    }

    function drawFlow() {
      const fragment = document.createDocumentFragment();
      const items = selection.steps.map(step => ({ ...step, blueprint: step.id === 'blauwdruk' }));
      if (selection.route.id === 'overzicht') {
        Object.assign(items[items.length - 1], { label: selection.result.label, description: selection.result.description, final: true });
      } else {
        items.push({ id: 'output', label: selection.result.label, description: selection.route.id === 'uitwerking'
          ? 'Deze specialistische uitwerking bouwt voort op de interne blauwdruk en beantwoordt je concrete vraag.'
          : 'Een onderbouwde uitwerking van je gekozen onderzoeksvraag.', final: true });
      }
      items.forEach((step, index) => {
        const item = document.createElement('li');
        item.className = 'matcher-flow-step' + (step.blueprint ? ' is-blueprint' : '') + (step.final ? ' is-result' : '');
        item.dataset.matcherModule = step.id;
        const number = document.createElement('span');
        number.className = 'matcher-flow-number';
        number.setAttribute('aria-hidden', 'true');
        number.textContent = String(index + 1).padStart(2, '0') + (step.final ? ' / Uitwerking' : '');
        const title = document.createElement('h4');
        title.textContent = step.label;
        const description = document.createElement('p');
        description.textContent = step.description;
        item.append(number, title, description);
        fragment.append(item);
      });
      flow.replaceChildren(fragment);
    }

    function render() {
      selection = resolveSelection(data, state);
      const visibleGroups = {
        organization: true,
        route: !!selection.organization,
        goal: !!selection.organization && selection.route?.id === 'uitwerking',
        task: !!selection.organization && selection.route?.id === 'uitwerking' && !!selection.goal && selection.tasks.length > 1
      };
      const allowed = {
        organization: data.organizations.map(item => item.id),
        route: data.routes.map(item => item.id),
        goal: selection.goals.map(item => item.id),
        task: selection.tasks.map(item => item.id)
      };
      const selected = {
        organization: selection.organization?.id,
        route: selection.route?.id,
        goal: selection.route?.id === 'uitwerking' ? selection.goal?.id : null,
        task: selection.route?.id === 'uitwerking' ? selection.task?.id : null
      };
      groups.forEach(group => { group.hidden = !visibleGroups[group.dataset.matcherGroup]; });
      for (const groupName of Object.keys(allowed)) {
        let firstVisible = true;
        let visibleIndex = 0;
        choices.filter(button => button.dataset.matcherChoice === groupName).forEach(button => {
          const value = button.dataset.choiceValue;
          const shown = allowed[groupName].includes(value);
          const active = shown && selected[groupName] === value;
          button.hidden = !shown;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-checked', String(active));
          button.tabIndex = shown && (active || (!selected[groupName] && firstVisible)) ? 0 : -1;
          if (shown) {
            firstVisible = false;
            visibleIndex++;
            button.querySelector('.matcher-choice-number').textContent = String(visibleIndex).padStart(2, '0');
          }
          if (groupName === 'route') {
            const route = data.routes.find(item => item.id === value);
            button.querySelector('[data-choice-label]').textContent = selection.organization?.id === 'overheid'
              ? (route.governmentQuestion || route.question) : route.question;
          }
        });
      }
      root.querySelector('[data-matcher-next]').hidden = !selection.complete;
      root.querySelectorAll('[data-matcher-pending]').forEach(item => { item.hidden = selection.complete; });
      root.querySelectorAll('[data-matcher-pending-text]').forEach(item => { item.textContent = pendingText[selection.pending] || ''; });
      root.querySelector('[data-matcher-output-content]').hidden = !selection.complete;
      root.querySelector('[data-matcher-flow-content]').hidden = !selection.complete;
      const context = selection.complete ? [selection.organization.label, selection.goal?.label].filter(Boolean).join(' · ') : '';
      root.querySelectorAll('[data-matcher-context]').forEach(item => { item.textContent = context; item.hidden = !context; });
      outputs.forEach(output => {
        const active = selection.outputIds.includes(output.dataset.matcherOutput);
        output.classList.toggle('is-active', active);
        if (active) output.setAttribute('aria-describedby', 'matcher-selection');
        else output.removeAttribute('aria-describedby');
      });
      // Clearing detail prevents an earlier commercial choice surviving an organization change.
      root.querySelector('[data-matcher-result-title]').textContent = selection.result?.label || '';
      root.querySelector('[data-matcher-result-description]').textContent = selection.result?.description || '';
      const resultHref = selection.result?.href || 'specialistische-modules.html';
      root.querySelector('[data-matcher-result-link]').setAttribute('href', window.VARIANA_URLS?.toHref(resultHref) || resultHref);
      root.querySelector('[data-matcher-flow-explanation]').textContent = !selection.complete ? ''
        : selection.route.id === 'inzicht' ? 'Een analyse kan zelfstandig worden uitgevoerd en geeft inzicht in je onderwerp.'
        : selection.route.id === 'overzicht' ? 'De blauwdruk brengt de opbouw en inrichting samen. Van daaruit werken we het plan van aanpak of stappenplan uit.'
        : 'Voor een specialistische uitwerking wordt altijd eerst intern een blauwdruk opgebouwd. De specialistische module komt daarna en gebruikt die samenhang als basis.';
      flow.replaceChildren();
      if (selection.complete) drawFlow();
      root.dataset.selectedOrganization = selection.organization?.id || '';
      root.dataset.selectedRoute = selection.route?.id || '';
      root.dataset.selectedTask = selection.route?.id === 'uitwerking' ? selection.task?.id || '' : '';
      root.dataset.selectionComplete = String(selection.complete);
      status.textContent = selection.complete
        ? 'Passende output voor ' + selection.organization.label + ': ' + selection.result.label + '. Bekijk B voor de output en C voor de route.'
        : pendingText[selection.pending];
    }

    function selectChoice(group, value, focus = false) {
      state[stateKeys[group]] = value;
      if (group === 'organization' || group === 'route') { state.goalId = null; state.taskId = null; }
      if (group === 'goal') state.taskId = null;
      render();
      if (focus) choices.find(button => button.dataset.matcherChoice === group && button.dataset.choiceValue === value)?.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => setPanel(tab.dataset.matcherTab, false, true, root.getBoundingClientRect().top < 0));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          event.stopPropagation();
          setPanel(tabs[next].dataset.matcherTab, true, true, root.getBoundingClientRect().top < 0);
        }
      });
    });
    choices.forEach(button => {
      button.addEventListener('click', () => selectChoice(button.dataset.matcherChoice, button.dataset.choiceValue));
      button.addEventListener('keydown', event => {
        const siblings = choices.filter(item => item.dataset.matcherChoice === button.dataset.matcherChoice && !item.hidden);
        const index = siblings.indexOf(button);
        let next;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % siblings.length;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + siblings.length) % siblings.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = siblings.length - 1;
        if (next !== undefined) {
          event.preventDefault();
          event.stopPropagation();
          selectChoice(button.dataset.matcherChoice, siblings[next].dataset.choiceValue, true);
        }
      });
    });
    root.querySelectorAll('[data-matcher-open]').forEach(button => {
      button.addEventListener('click', () => setPanel(button.dataset.matcherOpen, true, true, true));
    });
    root.querySelectorAll('[data-matcher-back]').forEach(button => {
      button.addEventListener('click', () => {
        setPanel('a', false, true, true);
        const group = root.querySelector('[data-matcher-group="' + selection.pending + '"]');
        const target = [...group.querySelectorAll('[role="radio"]')].find(item => !item.hidden && item.tabIndex === 0);
        target?.focus();
      });
    });
    const requested = new URLSearchParams(location.search).get('vraag');
    if (data.routes.some(route => route.id === requested)) state.routeId = requested;
    render();
    setPanel(hashPanels[location.hash.slice(1)] || 'a', false, false);
    window.addEventListener('hashchange', () => {
      const hash = location.hash.slice(1);
      if (!hash || hashPanels[hash]) setPanel(hashPanels[hash] || 'a', false, false);
    });
    root.dataset.ready = 'true';
  });
})();

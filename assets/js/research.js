'use strict';

(() => {
  const root = document.querySelector('[data-research-explorer]');
  const data = window.VARIANA_RESEARCH_DEMOS;
  if (!root || !data?.cases?.length) return;
  const tabs = [...root.querySelectorAll('[data-research-tab]')];
  const tabNames = tabs.map(t => t.dataset.researchTab);
  const params = new URLSearchParams(location.search);
  const state = { item: data.cases.find(c => c.id === params.get('casus')) || data.cases.find(c => c.id === data.defaultCase) || data.cases[0], module: '', mode: 'dependencies', loop: '' };
  const select = s => root.querySelector(s);
  const element = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const list = values => {
    const ul = element('ul', 'research-detail-list');
    values.forEach(value => ul.append(element('li', '', value)));
    return ul;
  };
  const modules = () => state.item.modules;
  const getModule = id => modules().find(m => m.id === id);
  const downstream = id => modules().filter(m => m.dependsOn.includes(id));
  const approved = items => state.item.executionStatus === 'not_executed' ? [] : (items || []).filter(i => i.reviewStatus === 'approved');
  const outputs = () => approved(state.item.outputs);
  const safePath = path => typeof path === 'string' && /^assets\/research\//.test(path) && !path.includes('..') && !path.includes('\\') ? path : null;

  function setTab(name, focus = false, updateHash = true) {
    if (!tabNames.includes(name)) name = 'vraagstuk';
    tabs.forEach(tab => {
      const selected = tab.dataset.researchTab === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    root.querySelectorAll('[data-research-panel]').forEach(panel => { panel.hidden = panel.dataset.researchPanel !== name; });
    if (updateHash) {
      try { history.replaceState(null, '', '#' + name); } catch (_) { /* File previews retain full functionality. */ }
    }
    if (name === 'samenhang') requestAnimationFrame(drawGraph);
  }

  function moduleButtons(items) {
    const wrap = element('div', 'research-related-buttons');
    items.forEach(m => {
      const button = element('button', '', m.title);
      button.type = 'button';
      button.dataset.selectModule = m.id;
      wrap.append(button);
    });
    return wrap;
  }

  function section(title, content) {
    const part = element('section', 'research-detail-section');
    part.append(element('h5', '', title), content);
    return part;
  }

  function renderModule() {
    const m = getModule(state.module);
    root.querySelectorAll('[data-research-module]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.researchModule === m.id)));
    const detail = select('[data-module-detail]');
    detail.replaceChildren();
    detail.append(element('p', 'eyebrow', 'ONDERZOEKSOPZET / ' + String(modules().indexOf(m) + 1).padStart(2, '0')),
      element('h4', '', m.title), element('p', 'research-module-purpose', m.purpose));
    detail.append(element('span', 'tag', m.executionStatus === 'completed' ? 'Uitvoering geregistreerd' : 'Nog niet uitgevoerd'));
    detail.append(section('Deelvragen', list(m.questions)));
    detail.append(section('Benodigde informatie', list(m.requiredInputs)));
    const approach = element('details', 'research-approach');
    approach.append(element('summary', '', 'Bekijk de voorgenomen benadering'), list(m.plannedApproach));
    detail.append(approach);
    const methods = state.item.methodologyStatus === 'verified' ? m.appliedMethods : [];
    detail.append(section('Werkelijk toegepaste methoden', methods.length ? list(methods) : element('p', 'research-muted', 'Nog niet vastgelegd. De werkelijk toegepaste methoden en doorlopen stappen worden aan het gecontroleerde onderzoeksdossier gekoppeld zodra dat beschikbaar is.')));
    detail.append(section('Bijdrage aan het geheel', element('p', '', m.expectedContribution)));
    detail.append(section('Gebruikt informatie uit', m.dependsOn.length ? moduleButtons(m.dependsOn.map(getModule)) : element('p', 'research-muted', 'Dit onderdeel begint bij de demonstratie-input.')));
    const next = downstream(m.id);
    detail.append(section('Kan doorwerken naar', next.length ? moduleButtons(next) : element('p', 'research-muted', 'Dit onderdeel brengt de informatie samen voor bespreking en besluitvorming.')));
    detail.append(section('Wanneer kan herbeoordeling nodig zijn?', list(m.reviewTriggers)));
    const available = outputs().filter(o => o.moduleIds?.includes(m.id));
    const status = element('div', 'research-detail-status');
    status.append(element('p', '', available.length ? 'Gecontroleerde output voor dit onderdeel is opgenomen bij De resultaten.' : 'Er is nog geen gecontroleerde onderzoeksoutput voor dit onderdeel beschikbaar.'));
    const button = element('button', 'button secondary', 'Bekijk de koppelingen →');
    button.type = 'button';
    button.dataset.openModuleGraph = m.id;
    status.append(button);
    if (available.length) {
      const resultsButton = element('button', 'text-link', 'Naar gecontroleerde resultaten →');
      resultsButton.type = 'button';
      resultsButton.dataset.showResearchTab = 'resultaten';
      status.append(resultsButton);
    }
    detail.append(status);
  }

  function renderGraph() {
    const columns = select('[data-graph-columns]');
    columns.replaceChildren();
    state.item.graphGroups.forEach((name, group) => {
      const column = element('div', 'research-graph-column');
      column.append(element('p', 'research-graph-column-name', name));
      modules().filter(m => m.group === group).forEach(m => {
        const button = element('button', 'research-node');
        button.type = 'button';
        button.dataset.graphModule = m.id;
        button.append(element('span', '', String(modules().indexOf(m) + 1).padStart(2, '0')), element('strong', '', m.title));
        column.append(button);
      });
      columns.append(column);
    });
    updateGraphState();
  }

  function updateGraphState() {
    const current = getModule(state.module);
    const loop = state.item.loops.find(l => l.id === state.loop);
    const neighbors = state.mode === 'feedback' ? loop.nodes : [current.id, ...current.dependsOn, ...downstream(current.id).map(m => m.id)];
    root.querySelectorAll('[data-graph-module]').forEach(button => {
      const id = button.dataset.graphModule;
      button.classList.toggle('is-connected', neighbors.includes(id));
      button.classList.toggle('is-loop', state.mode === 'feedback' && loop.nodes.includes(id));
      button.classList.toggle('is-selected', id === state.module);
      button.setAttribute('aria-pressed', String(id === state.module));
    });
    root.querySelectorAll('[data-graph-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.graphMode === state.mode)));
    select('[data-loop-picker]').hidden = state.mode !== 'feedback';
    const context = select('[data-graph-context]');
    context.replaceChildren();
    if (state.mode === 'feedback') {
      context.append(element('p', 'eyebrow', 'MOGELIJKE FEEDBACKLUS'), element('h4', '', loop.title), element('p', '', loop.description));
      context.append(list(loop.nodes.map(id => getModule(id).title)));
      context.append(element('p', 'research-status-note', 'Een terugkoppeling kan eerdere deelvragen of uitgangspunten opnieuw ter beoordeling brengen. Deze route is niet als onderzoeksgebeurtenis geregistreerd.'));
    } else {
      context.append(element('p', 'eyebrow', 'GESELECTEERD ONDERDEEL'), element('h4', '', current.title), element('p', '', current.expectedContribution));
      context.append(element('h5', '', 'Heeft informatie nodig uit'));
      context.append(current.dependsOn.length ? moduleButtons(current.dependsOn.map(getModule)) : element('p', 'research-muted', 'De fictieve demonstratie-input.'));
      context.append(element('h5', '', 'Kan informatie leveren aan'));
      const next = downstream(current.id);
      context.append(next.length ? moduleButtons(next) : element('p', 'research-muted', 'De uiteindelijke bespreking en besluitvorming.'));
    }
    const button = element('button', 'button secondary', 'Open dit onderzoeksonderdeel →');
    button.type = 'button';
    button.dataset.openModule = current.id;
    context.append(button);
    requestAnimationFrame(drawGraph);
  }

  function drawGraph() {
    const graph = select('[data-research-graph]');
    const svg = select('.research-connections');
    if (select('#samenhang').hidden || !graph.clientWidth) return;
    const ns = 'http://www.w3.org/2000/svg';
    svg.replaceChildren();
    svg.setAttribute('viewBox', `0 0 ${graph.offsetWidth} ${graph.offsetHeight}`);
    const defs = document.createElementNS(ns, 'defs');
    ['base', 'active', 'loop'].forEach(type => {
      const marker = document.createElementNS(ns, 'marker');
      marker.setAttribute('id', 'research-arrow-' + type);
      marker.setAttribute('viewBox', '0 0 10 10');
      marker.setAttribute('refX', '9'); marker.setAttribute('refY', '5');
      marker.setAttribute('markerWidth', '5'); marker.setAttribute('markerHeight', '5');
      marker.setAttribute('orient', 'auto-start-reverse');
      const arrow = document.createElementNS(ns, 'path');
      arrow.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z');
      arrow.setAttribute('fill', type === 'loop' ? '#b7a1e4' : type === 'active' ? '#63c8d4' : '#526d84');
      marker.append(arrow); defs.append(marker);
    });
    svg.append(defs);
    const area = graph.getBoundingClientRect();
    const nodeRect = id => root.querySelector(`[data-graph-module="${id}"]`).getBoundingClientRect();
    function line(from, to, type) {
      const a = nodeRect(from), b = nodeRect(to);
      const same = getModule(from).group === getModule(to).group;
      let x1, y1, x2, y2, d;
      if (same) {
        x1 = a.left + a.width / 2 - area.left; y1 = a.bottom - area.top;
        x2 = b.left + b.width / 2 - area.left; y2 = b.top - area.top;
        d = `M${x1},${y1} C${x1},${(y1+y2)/2} ${x2},${(y1+y2)/2} ${x2},${y2}`;
      } else if (type === 'loop') {
        x1 = a.left - area.left; y1 = a.top + a.height / 2 - area.top;
        x2 = b.right - area.left; y2 = b.top + b.height / 2 - area.top;
        const bottom = graph.offsetHeight - 18;
        d = `M${x1},${y1} C${x1-22},${bottom} ${x2+22},${bottom} ${x2},${y2}`;
      } else {
        x1 = a.right - area.left; y1 = a.top + a.height / 2 - area.top;
        x2 = b.left - area.left; y2 = b.top + b.height / 2 - area.top;
        const mid = (x1+x2)/2;
        d = `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`;
      }
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d); path.setAttribute('class', 'research-edge edge-' + type);
      path.setAttribute('marker-end', 'url(#research-arrow-' + type + ')');
      svg.append(path);
    }
    const loop = state.item.loops.find(l => l.id === state.loop);
    const edges = [];
    modules().forEach(m => m.dependsOn.forEach(id => {
      const active = state.mode === 'feedback' ? loop.nodes.includes(id) && loop.nodes.includes(m.id) : id === state.module || m.id === state.module;
      edges.push({from:id,to:m.id,type:active ? 'active' : 'base'});
    }));
    edges.sort((a,b) => Number(a.type === 'active') - Number(b.type === 'active')).forEach(e => line(e.from,e.to,e.type));
    if (state.mode === 'feedback') line(loop.back[0],loop.back[1],'loop');
  }

  function renderResults() {
    const area = select('[data-research-results]');
    area.replaceChildren();
    const available = outputs().filter(o => safePath(o.path));
    if (!available.length) {
      const empty = element('div', 'research-empty-state');
      const explanation = state.item.executionStatus === 'not_executed'
        ? 'Het demonstratieonderzoek is nog niet uitgevoerd. Er zijn daarom geen analysefragmenten, conclusies, berekeningen, bronverwijzingen of rapporten om te openen.'
        : 'Er is nog geen onderzoeksoutput gecontroleerd en vrijgegeven voor deze website. Zodra dat is gebeurd, kan de onderliggende informatie hier worden geopend.';
      empty.append(element('span', 'tag', 'Nog niet beschikbaar'), element('h4', '', 'Nog geen gecontroleerde onderzoeksoutput toegevoegd.'), element('p', '', explanation));
      area.append(empty);
      const slots = element('div', 'research-output-slots');
      state.item.outputSlots.forEach(slot => {
        const card = element('article', 'research-output-slot');
        card.append(element('span', '', 'LATER TOE TE VOEGEN'), element('h4', '', slot.title), element('p', '', slot.detail));
        slots.append(card);
      });
      area.append(slots);
      const note = element('p', 'research-status-note', 'Deze plekken worden gevuld met werkelijk uitgevoerde, gecontroleerde en voor publicatie vrijgegeven Variana-output. Er zijn nu geen download- of rapportknoppen.');
      area.append(note);
      return;
    }
    const intro = element('p', 'research-result-count', `${available.length} gecontroleerde onderdelen beschikbaar. Open een onderdeel en bekijk de gekoppelde onderzoeksinformatie.`);
    area.append(intro);
    const cards = element('div', 'research-approved-results');
    available.forEach(output => {
      const card = element('article', 'research-approved-result');
      card.append(element('span', 'tag available', 'Gecontroleerde output'), element('h4', '', output.title));
      if (output.description) card.append(element('p', '', output.description));
      const anchor = element('a', 'text-link', 'Open het onderzoeksdeel →');
      anchor.href = safePath(output.path);
      card.append(anchor);
      const linkedModules = (output.moduleIds || []).map(getModule).filter(Boolean);
      if (linkedModules.length) card.append(section('Hoort bij', moduleButtons(linkedModules)));
      const sources = approved(state.item.sources).filter(s => output.sourceIds?.includes(s.id));
      if (sources.length) {
        const detail = element('details', 'research-source-detail');
        detail.append(element('summary', '', 'Onderliggende bronnen en toelichting'));
        sources.forEach(source => {
          const p = element('p');
          const path = safePath(source.path);
          const online = typeof source.url === 'string' && /^https?:\/\//.test(source.url) ? source.url : null;
          if (path || online) {
            const link = element('a', 'text-link', source.title + (online ? ' (online bron)' : ''));
            link.href = path || online;
            if (online) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
            p.append(link);
          } else p.append(document.createTextNode(source.title));
          if (source.note) p.append(document.createTextNode(' — ' + source.note));
          detail.append(p);
        });
        card.append(detail);
      }
      cards.append(card);
    });
    area.append(cards);
    const findings = approved(state.item.findings);
    if (findings.length) {
      const section = element('section', 'research-reviewed-findings');
      section.append(element('h4', '', 'Vastgelegde bevindingen en onzekerheden'));
      findings.forEach(f => {
        const detail = element('details');
        detail.append(element('summary', '', f.title), element('p', '', f.text || ''));
        if (f.uncertainties?.length) detail.append(list(f.uncertainties));
        detail.append(moduleButtons((f.moduleIds || []).map(getModule).filter(Boolean)));
        section.append(detail);
      });
      area.append(section);
    }
  }

  function renderCase() {
    const c = state.item;
    state.module = getModule(params.get('module'))?.id || c.modules[0].id;
    state.loop = c.loops[0].id;
    state.mode = 'dependencies';
    select('[data-research-category]').textContent = data.categories[c.category];
    select('[data-research-title]').textContent = c.title;
    select('[data-research-subtitle]').textContent = c.subtitle;
    select('[data-input-notice]').textContent = c.inputNotice;
    select('[data-research-brief]').textContent = c.brief;
    select('[data-execution-label]').textContent = c.executionStatus === 'reviewed' ? 'Uitgevoerd en gecontroleerd' : c.executionStatus === 'executed_review_pending' ? 'Uitgevoerd · controle loopt' : 'Niet uitgevoerd';
    select('[data-output-label]').textContent = outputs().length ? `${outputs().length} gecontroleerde onderdelen` : 'Nog niet beschikbaar';
    const facts = select('[data-input-facts]'); facts.replaceChildren();
    c.inputFacts.forEach(fact => {
      const div = element('div'); div.append(element('dt','',fact.label),element('dd','',fact.value)); facts.append(div);
    });
    select('[data-missing-inputs]').replaceChildren(...c.missingInputs.map(value => element('li','',value)));
    const nav = select('[data-module-nav]'); nav.replaceChildren();
    c.modules.forEach((m,i) => {
      const button = element('button'); button.type = 'button'; button.dataset.researchModule = m.id;
      button.append(element('span','',String(i+1).padStart(2,'0')),element('strong','',m.title),element('small','','Onderzoeksopzet'));
      nav.append(button);
    });
    const loops = select('#research-loop-select'); loops.replaceChildren();
    c.loops.forEach(loop => { const option = element('option','',loop.title); option.value=loop.id; loops.append(option); });
    renderModule(); renderGraph(); renderResults();
  }

  tabs.forEach((tab,index) => {
    tab.addEventListener('click', () => setTab(tab.dataset.researchTab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next=(index+1)%tabs.length;
      if (event.key === 'ArrowLeft') next=(index-1+tabs.length)%tabs.length;
      if (event.key === 'Home') next=0;
      if (event.key === 'End') next=tabs.length-1;
      if (next!==undefined) { event.preventDefault(); setTab(tabs[next].dataset.researchTab,true); }
    });
  });
  root.addEventListener('click', event => {
    const moduleButton=event.target.closest('[data-research-module],[data-select-module],[data-graph-module],[data-open-module],[data-open-module-graph]');
    if (moduleButton) {
      const id=moduleButton.dataset.researchModule || moduleButton.dataset.selectModule || moduleButton.dataset.graphModule || moduleButton.dataset.openModule || moduleButton.dataset.openModuleGraph;
      if (!getModule(id)) return;
      state.module=id; renderModule(); updateGraphState();
      if (moduleButton.dataset.openModule || moduleButton.dataset.selectModule) setTab('onderzoek',true);
      if (moduleButton.dataset.openModuleGraph) setTab('samenhang',true);
    }
    const target=event.target.closest('[data-show-research-tab]');
    if (target) setTab(target.dataset.showResearchTab,true);
    const mode=event.target.closest('[data-graph-mode]');
    if (mode) {
      state.mode=mode.dataset.graphMode;
      if (state.mode==='feedback') state.module=state.item.loops.find(l=>l.id===state.loop).nodes[0];
      renderModule(); updateGraphState();
    }
  });
  select('#research-loop-select').addEventListener('change', event => {
    state.loop=event.target.value;
    state.module=state.item.loops.find(l=>l.id===state.loop).nodes[0];
    renderModule(); updateGraphState();
  });
  const caseSelect=select('#research-case-select');
  data.cases.forEach(c => { const option=element('option','',c.title); option.value=c.id; caseSelect.append(option); });
  caseSelect.value=state.item.id;
  select('.research-case-selector').hidden=data.cases.length<2;
  caseSelect.addEventListener('change', () => { state.item=data.cases.find(c=>c.id===caseSelect.value); renderCase(); setTab('vraagstuk'); });
  window.addEventListener('hashchange', () => { const key=location.hash.slice(1); if (tabNames.includes(key)) setTab(key,false,false); });
  window.addEventListener('resize', () => requestAnimationFrame(drawGraph));
  if (typeof ResizeObserver === 'function') new ResizeObserver(() => requestAnimationFrame(drawGraph)).observe(select('[data-research-graph]'));
  renderCase();
  setTab(location.hash.slice(1),false,false);
  root.dataset.ready='true';
})();

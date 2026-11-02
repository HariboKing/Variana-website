"""Render the public A/B/C route indication from validated local definitions.

The selector explains a possible route. It does not execute research or expose
the private instructions used to carry out an assignment.
"""
import html
import json
import re
from pathlib import Path


def esc(value):
    return html.escape(str(value), quote=True)


def load_application_routes(base):
    """Validate identifiers, references, links and the public-sector boundary."""
    data = json.loads((Path(base) / 'toepassingsroutes.json').read_text(encoding='utf-8'))
    slug = re.compile(r'[a-z0-9]+(?:-[a-z0-9]+)*')
    local_href = re.compile(r'[a-z0-9][a-z0-9-]*\.html(?:#[a-z0-9-]+)?')
    groups = {}

    def text(item, key, group):
        if not isinstance(item.get(key), str) or not item[key].strip():
            raise ValueError(f'{group}: {key} vereist een niet-lege tekst.')

    def refs(values, known, label, required=True):
        if not isinstance(values, list) or (required and not values):
            raise ValueError(f'{label}: een lijst met verwijzingen is vereist.')
        if any(not isinstance(value, str) or value not in known for value in values):
            raise ValueError(f'{label}: onbekende verwijzing.')
        if len(values) != len(set(values)):
            raise ValueError(f'{label}: dubbele verwijzing.')

    for name in ('organizations', 'routes', 'outputs', 'goals', 'tasks', 'steps'):
        items = data.get(name)
        if not isinstance(items, list) or not items:
            raise ValueError(f'{name}: ten minste één definitie is vereist.')
        ids = []
        for item in items:
            if not isinstance(item, dict):
                raise ValueError(f'{name}: iedere definitie moet een object zijn.')
            value = item.get('id')
            if not isinstance(value, str) or not slug.fullmatch(value):
                raise ValueError(f'{name}: ongeldige ID.')
            ids.append(value)
        if len(ids) != len(set(ids)):
            raise ValueError(f'{name}: dubbele ID.')
        groups[name] = dict(zip(ids, items))

    organizations, routes, outputs, goals, tasks, steps = (
        groups[name] for name in ('organizations', 'routes', 'outputs', 'goals', 'tasks', 'steps')
    )
    if not {'bedrijf', 'overheid'} <= organizations.keys():
        raise ValueError('Bedrijf en overheid moeten als organisatietype beschikbaar zijn.')
    if data.get('defaultRoute') is not None and data['defaultRoute'] not in routes:
        raise ValueError('De opgegeven standaardroute bestaat niet.')
    for item in organizations.values():
        text(item, 'label', 'organizations')
        text(item, 'description', 'organizations')
    for item in routes.values():
        text(item, 'question', 'routes')
        if 'governmentQuestion' in item:
            text(item, 'governmentQuestion', 'routes')
        for field in ('resultLabel', 'resultDescription'):
            if field in item:
                text(item, field, 'routes')
        refs(item.get('outputIds'), outputs, 'routes/outputIds')
    for item in list(outputs.values()) + list(tasks.values()):
        for field in ('description', 'href'):
            text(item, field, 'outputs/tasks')
        if not local_href.fullmatch(item['href']):
            raise ValueError('Gebruik uitsluitend veilige lokale paginaverwijzingen.')
    for item in outputs.values():
        text(item, 'label', 'outputs')
    for item in goals.values():
        text(item, 'label', 'goals')
        refs(item.get('organizations'), organizations, 'goals/organizations')
    for item in steps.values():
        text(item, 'label', 'steps')
        text(item, 'description', 'steps')
        if 'businessOnly' in item and not isinstance(item['businessOnly'], bool):
            raise ValueError('steps/businessOnly moet een booleaanse waarde zijn.')
    forbidden_government_tasks = {'financiering', 'pitchdeck', 'memorandum', 'targetlist', 'investering'}
    for item in tasks.values():
        for field in ('label', 'outputLabel', 'goalId'):
            text(item, field, 'tasks')
        if item['goalId'] not in goals:
            raise ValueError('Een specialistische uitwerking verwijst naar een onbekend doel.')
        refs(item.get('organizations'), organizations, 'tasks/organizations')
        if not set(item['organizations']) <= set(goals[item['goalId']]['organizations']):
            raise ValueError('Een uitwerking is niet toegestaan voor het gekozen organisatiedoel.')
        refs(item.get('stepIds'), steps, 'tasks/stepIds')
        if 'overheid' in item['organizations']:
            if item['id'] in forbidden_government_tasks or item.get('businessOnly'):
                raise ValueError('Deze specialistische uitwerking is uitgesloten voor de overheid.')
            # Shared blueprint definitions contain business-only stages. The
            # resolver excludes those stages from every public-sector route.
    for goal in goals.values():
        for organization in goal['organizations']:
            options = [item for item in tasks.values()
                       if item['goalId'] == goal['id'] and organization in item['organizations']]
            if not 1 <= len(options) <= 3:
                raise ValueError('Ieder organisatiedoel vereist één tot drie passende vervolgkeuzes.')
    flows = data.get('flows')
    if not isinstance(flows, dict) or not {'inzicht', 'overzicht'} <= flows.keys():
        raise ValueError('De algemene onderzoeksroutes ontbreken.')
    for route_id, step_ids in flows.items():
        if route_id not in routes:
            raise ValueError('Een onderzoeksroute verwijst naar een onbekende vraag.')
        refs(step_ids, steps, 'flows')
    if flows['overzicht'][-1] != 'blauwdruk' or 'blauwdruk' in flows['inzicht']:
        raise ValueError('Een organisatie-uitwerking vereist een blauwdruk; een losse analyse niet.')
    if any(item['stepIds'] != flows['overzicht'] for item in tasks.values()):
        raise ValueError('Iedere specialistische module moet op de gedeelde blauwdruk voortbouwen.')
    if any(not steps[item].get('businessOnly') for item in ('product', 'marketing')):
        raise ValueError('Productontwikkeling en marketing moeten voor overheid uitgesloten blijven.')
    return data


def _choices(group, items, label_key='label', descriptions=False):
    buttons = []
    for index, item in enumerate(items):
        detail = f'<small>{esc(item["description"])}</small>' if descriptions else ''
        buttons.append(
            f'<button type="button" class="matcher-question" role="radio" '
            f'aria-checked="false" tabindex="{0 if index == 0 else -1}" '
            f'data-matcher-choice="{esc(group)}" data-choice-value="{esc(item["id"])}">'
            f'<span class="matcher-choice-number" aria-hidden="true">{index + 1:02}</span>'
            f'<span class="matcher-choice-copy"><span data-choice-label>{esc(item[label_key])}</span>'
            f'{detail}</span></button>'
        )
    return ''.join(buttons)


def _group(name, title, choices, hidden=True):
    return (
        f'<section class="matcher-choice-group" data-matcher-group="{name}" role="radiogroup" '
        f'aria-labelledby="matcher-{name}-title"{" hidden" if hidden else ""}>'
        f'<h4 id="matcher-{name}-title">{esc(title)}</h4>'
        f'<div class="matcher-choice-list matcher-choice-list-{name}">{choices}</div></section>'
    )


def _pending():
    return (
        '<div class="matcher-pending" data-matcher-pending>'
        '<p data-matcher-pending-text>Kies bij A eerst je organisatietype en je vraagstuk.</p>'
        '<button type="button" class="button secondary" data-matcher-back>Vul je vraag in bij A '
        '<span aria-hidden="true">→</span></button></div>'
    )


def _contact_action():
    return (
        '<div data-matcher-contact hidden>'
        '<p class="matcher-scope">Je gekozen uitwerking staat alvast ingevuld.</p>'
        '<div class="matcher-next button-row"><a class="button primary" data-matcher-contact-link>'
        'Ga verder naar contact <span aria-hidden="true">→</span></a></div></div>'
    )


def render_application_matcher(base, site=None):
    """Return static accessible markup. No answer is selected on first display."""
    data = load_application_routes(base)
    if site is not None:
        for item in data['outputs'] + data['tasks']:
            if not (Path(site) / item['href'].split('#', 1)[0]).is_file():
                raise ValueError(f'Ontbrekende lokale pagina: {item["href"]}')
    organization_choices = _choices('organization', data['organizations'], descriptions=True)
    route_choices = _choices('route', data['routes'], label_key='question')
    goal_choices = _choices('goal', data['goals'])
    task_choices = _choices('task', data['tasks'])
    groups = ''.join((
        _group('organization', 'Voor welk type organisatie is dit bedoeld?', organization_choices, hidden=False),
        _group('route', 'Wat wil je laten uitwerken?', route_choices),
        _group('goal', 'Waar wil je de uitwerking voor gebruiken?', goal_choices),
        _group('task', 'Wat wil je concreet kunnen doen?', task_choices),
    ))
    outputs = ''.join(
        f'<li><a class="matcher-output" href="{esc(output["href"])}" '
        f'data-matcher-output="{esc(output["id"])}"><strong>{esc(output["label"])}</strong>'
        '<span aria-hidden="true">→</span></a></li>'
        for output in data['outputs']
    )
    payload = json.dumps(data, ensure_ascii=False).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
    return f'''<section class="application-matcher container" id="demonstratie" aria-labelledby="verkenner-titel" data-application-matcher data-active-panel="a">
<div class="matcher-tabs" role="tablist" aria-label="Van vraagstuk naar output en onderzoek">
<button type="button" role="tab" id="matcher-tab-a" aria-controls="matcher-panel-a" aria-selected="true" tabindex="0" data-matcher-tab="a"><span class="matcher-tab-letter">A</span><span class="matcher-tab-label">Het vraagstuk</span></button>
<button type="button" role="tab" id="matcher-tab-b" aria-controls="matcher-panel-b" aria-selected="false" tabindex="-1" data-matcher-tab="b"><span class="matcher-tab-letter">B</span><span class="matcher-tab-label">De output</span></button>
<button type="button" role="tab" id="matcher-tab-c" aria-controls="matcher-panel-c" aria-selected="false" tabindex="-1" data-matcher-tab="c"><span class="matcher-tab-letter">C</span><span class="matcher-tab-label">Modules &amp; onderzoeken</span></button>
</div>
<section class="matcher-panel" id="matcher-panel-a" role="tabpanel" aria-labelledby="matcher-tab-a" tabindex="0" data-matcher-panel="a">
<span id="vraagstuk" class="matcher-anchor"></span>
<div class="matcher-panel-heading"><p class="eyebrow">A / Het vraagstuk</p><h3 id="matcher-question-title">Wat is je vraagstuk?</h3><p>Je keuzes maken zichtbaar welke uitwerking en onderzoeksroute bij je vraag kunnen passen.</p></div>
{groups}
<div class="matcher-next button-row" data-matcher-next hidden><button type="button" class="button primary" data-matcher-open="b">Bekijk de passende output <span aria-hidden="true">→</span></button><button type="button" class="button secondary" data-matcher-open="c">Bekijk de onderzoeksroute <span aria-hidden="true">→</span></button></div>
<noscript><p>Schakel JavaScript in voor de keuzehulp, of bekijk de uitleg over <a href="analyse.html">analyses</a>, <a href="blauwdruk.html">blauwdrukken</a> en <a href="specialistische-modules.html">specialistische uitwerkingen</a>.</p></noscript>
</section>
<section class="matcher-panel" id="matcher-panel-b" role="tabpanel" aria-labelledby="matcher-tab-b" tabindex="0" data-matcher-panel="b" hidden>
<span id="onderzoek" class="matcher-anchor"></span>
<div class="matcher-panel-heading"><p class="eyebrow">B / De output</p><h3 id="matcher-output-title">Welke output hoort daarbij?</h3><p class="matcher-context" data-matcher-context hidden></p></div>
{_pending()}
<div data-matcher-output-content hidden><ul class="matcher-output-list" aria-labelledby="matcher-output-title">{outputs}</ul>
<article class="matcher-result"><p class="eyebrow">Passende uitwerking</p><h4 data-matcher-result-title></h4><p data-matcher-result-description></p><a class="text-link" href="specialistische-modules.html" data-matcher-result-link>Lees meer over deze uitwerking <span aria-hidden="true">→</span></a></article>
<p class="matcher-scope">Dit is een indicatie op basis van je keuzes. De precieze uitwerking stemmen we af op je vraag en de beschikbare informatie.</p>{_contact_action()}</div>
</section>
<section class="matcher-panel" id="matcher-panel-c" role="tabpanel" aria-labelledby="matcher-tab-c" tabindex="0" data-matcher-panel="c" hidden>
<span id="samenhang" class="matcher-anchor"></span><span id="resultaten" class="matcher-anchor"></span>
<div class="matcher-panel-heading"><p class="eyebrow">C / Modules en onderzoeken</p><h3 id="matcher-modules-title">Welke onderdelen dragen bij aan je antwoord?</h3><p class="matcher-context" data-matcher-context hidden></p></div>
{_pending()}
<div data-matcher-flow-content hidden><p class="matcher-scope matcher-flow-intro">Een mogelijke route op hoofdlijnen. Welke onderdelen nodig zijn en hoe diep ze worden uitgewerkt, hangt af van je vraag en de beschikbare informatie.</p>
<p class="matcher-blueprint-note" data-matcher-flow-explanation></p>
<ol class="matcher-flow-list" data-matcher-modules aria-labelledby="matcher-modules-title"></ol>
<aside class="matcher-feedback" aria-labelledby="matcher-feedback-title"><h4 id="matcher-feedback-title">Intern aangescherpt vóór de eerste oplevering</h4><p>Vóór de eerste oplevering doorloopt de uitwerking uitgebreide interne terugkoppelingen. Onderzoeksuitkomsten worden aan bronnen en aan elkaar getoetst; nieuwe inzichten worden in eerdere onderdelen verwerkt.</p><p>De eerste versie die je ontvangt, is daardoor intern al herzien en aangescherpt. Feedback van jou of externe betrokkenen is daarin nog niet verwerkt.</p></aside>{_contact_action()}</div>
</section>
<p class="matcher-sr-only" id="matcher-selection" role="status" aria-live="polite" aria-atomic="true" data-matcher-status>Kies je organisatietype om je vraag verder in te vullen.</p>
<script type="application/json" data-matcher-data>{payload}</script>
</section>'''

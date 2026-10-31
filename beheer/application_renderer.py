"""Static markup and data validation for the A/B/C application selector.

The renderer reads toepassingsroutes.json from the maintenance directory.
It does not fetch data or write files. Add module definitions and route
moduleIds together when column C is ready to receive content.
"""
import html
import json
import re
from pathlib import Path


def esc(value):
    return html.escape(str(value), quote=True)


def load_application_routes(base):
    data = json.loads((Path(base) / 'toepassingsroutes.json').read_text(encoding='utf-8'))
    slug = re.compile(r'[a-z0-9]+(?:-[a-z0-9]+)*')
    for group in ['routes', 'outputs', 'modules']:
        ids = [item['id'] for item in data[group]]
        if len(ids) != len(set(ids)) or any(not slug.fullmatch(item_id) for item_id in ids):
            raise ValueError(f'Ongeldige of dubbele ID in {group}.')
    routes = {item['id']: item for item in data['routes']}
    outputs = {item['id']: item for item in data['outputs']}
    modules = {item['id']: item for item in data['modules']}
    if not routes or not outputs or data['defaultRoute'] not in routes:
        raise ValueError('De keuzehulp mist vragen, output of een geldige standaardkeuze.')
    for route in routes.values():
        if not route.get('question') or not route.get('outputIds'):
            raise ValueError('Iedere vraag vereist tekst en ten minste één output.')
        if any(item_id not in outputs for item_id in route['outputIds']):
            raise ValueError('Een vraag verwijst naar onbekende output.')
        if any(item_id not in modules for item_id in route.get('moduleIds', [])):
            raise ValueError('Een vraag verwijst naar een onbekende module.')
    for item in list(outputs.values()) + list(modules.values()):
        if not item.get('label'):
            raise ValueError('Output en modules vereisen een label.')
        if item.get('href') and not re.fullmatch(r'[a-z0-9][a-z0-9-]*\.html(?:#[a-z0-9-]+)?', item['href']):
            raise ValueError('Gebruik uitsluitend veilige lokale paginaverwijzingen.')
    return data


def render_application_matcher(base, site=None):
    """Render from the maintenance directory; site is accepted for build parity."""
    data = load_application_routes(base)
    current = next(route for route in data['routes'] if route['id'] == data['defaultRoute'])
    active_outputs = set(current['outputIds'])
    active_modules = set(current.get('moduleIds', []))
    questions = []
    for index, route in enumerate(data['routes']):
        selected = route['id'] == current['id']
        questions.append(
            f'<button type="button" class="matcher-question{" is-active" if selected else ""}" '
            f'role="radio" aria-checked="{str(selected).lower()}" tabindex="{0 if selected else -1}" '
            f'data-matcher-question="{esc(route["id"])}">'
            f'<span class="matcher-choice-number" aria-hidden="true">{index + 1:02}</span>'
            f'<span>{esc(route["question"])}</span></button>'
        )
    outputs = []
    for output in data['outputs']:
        active = output['id'] in active_outputs
        description = ' aria-describedby="matcher-selection"' if active else ''
        outputs.append(
            f'<li><a class="matcher-output{" is-active" if active else ""}" '
            f'href="{esc(output["href"])}" data-matcher-output="{esc(output["id"])}"{description}>'
            f'<strong>{esc(output["label"])}</strong><span aria-hidden="true">→</span></a></li>'
        )
    modules = []
    for module in data['modules']:
        active = module['id'] in active_modules
        text = esc(module['label'])
        content = f'<a href="{esc(module["href"])}">{text}</a>' if module.get('href') else f'<span>{text}</span>'
        modules.append(
            f'<li class="matcher-module{" is-active" if active else ""}" '
            f'data-matcher-module="{esc(module["id"])}">{content}</li>'
        )
    labels = ', '.join(item['label'] for item in data['outputs'] if item['id'] in active_outputs)
    payload = json.dumps(data, ensure_ascii=False).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
    return f'''<section class="application-matcher container" id="demonstratie" aria-labelledby="verkenner-titel" data-application-matcher data-selected-route="{esc(current['id'])}">
<span id="samenhang" class="matcher-anchor"></span>
<div class="matcher-columns">
<section class="matcher-column" aria-labelledby="matcher-question-title"><span id="vraagstuk" class="matcher-anchor"></span><div class="matcher-column-heading"><span class="matcher-letter" aria-hidden="true">A</span><h3 id="matcher-question-title">Wat is je vraagstuk?</h3></div><div class="matcher-question-list" role="radiogroup" aria-labelledby="matcher-question-title">{''.join(questions)}</div></section>
<section class="matcher-column" aria-labelledby="matcher-output-title"><span id="onderzoek" class="matcher-anchor"></span><div class="matcher-column-heading"><span class="matcher-letter" aria-hidden="true">B</span><h3 id="matcher-output-title">Welke output hoort daarbij?</h3></div><ul class="matcher-output-list" aria-labelledby="matcher-output-title">{''.join(outputs)}</ul></section>
<section class="matcher-column" aria-labelledby="matcher-modules-title"><span id="resultaten" class="matcher-anchor"></span><div class="matcher-column-heading"><span class="matcher-letter" aria-hidden="true">C</span><h3 id="matcher-modules-title">Welke modules en onderzoeken hangen samen voor dat antwoord?</h3></div><ul class="matcher-module-list{' is-empty' if not modules else ''}" data-matcher-modules aria-labelledby="matcher-modules-title">{''.join(modules)}</ul></section>
</div>
<p class="matcher-sr-only" id="matcher-selection" role="status" aria-live="polite" aria-atomic="true" data-matcher-status>Gekozen output: {esc(labels)}.</p>
<script type="application/json" data-matcher-data>{payload}</script>
</section>'''

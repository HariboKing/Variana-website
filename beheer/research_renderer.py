"""Data and static markup for the offline research explorer."""
import html
import json
import re
from pathlib import Path

def esc(value):
    return html.escape(str(value),quote=True)

def load_research(base,site):
    data=json.loads((base/'demonstraties.json').read_text(encoding='utf-8'))
    ids=[c['id'] for c in data['cases']]
    if len(ids)!=len(set(ids)) or data['defaultCase'] not in ids:
        raise ValueError('Demonstratie-ID ontbreekt of is dubbel.')
    for case in data['cases']:
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',case['id']):
            raise ValueError('Ongeldige demonstratie-ID.')
        if case['executionStatus'] not in ['not_executed','executed_review_pending','reviewed']:
            raise ValueError('Onbekende uitvoeringsstatus.')
        if case['methodologyStatus'] not in ['illustrative_unconfirmed','verified']:
            raise ValueError('Onbekende methodologiestatus.')
        if case['category'] not in data['categories']:
            raise ValueError('Onbekend toepassingsgebied.')
        modules={m['id']:m for m in case['modules']}
        if not modules or not case['loops']:
            raise ValueError('Een demonstratie vereist modules en ten minste één terugkoppelroute.')
        if len(modules)!=len(case['modules']):
            raise ValueError('Dubbele module-ID.')
        for m in modules.values():
            if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*',m['id']) or m['group'] not in range(len(case['graphGroups'])):
                raise ValueError('Ongeldige module-ID of grafiekgroep.')
            if any(x not in modules for x in m['dependsOn']):
                raise ValueError('Afhankelijkheid verwijst naar onbekende module.')
            if m.get('appliedMethods') and case['methodologyStatus']!='verified':
                raise ValueError('Toegepaste methoden vereisen een geverifieerde methodologiestatus.')
            if case['executionStatus']=='not_executed' and (m.get('appliedMethods') or m['executionStatus']!='not_executed'):
                raise ValueError('Niet-uitgevoerde casus mag geen uitgevoerde methoden of modules claimen.')
        for loop in case['loops']:
            if len(loop['back'])!=2 or not loop['nodes']:
                raise ValueError('Feedbacklus mist onderdelen of terugkoppelroute.')
            if any(x not in modules for x in loop['nodes']+loop['back']):
                raise ValueError('Feedbacklus verwijst naar onbekende module.')
        if case['executionStatus']=='not_executed' and any(case.get(x) for x in ['outputs','sources','findings']):
            raise ValueError('Een niet-uitgevoerd onderzoek mag geen onderzoeksoutput bevatten.')
        source_ids={x['id'] for x in case.get('sources',[])}
        for group in ['outputs','sources','findings']:
            for item in case.get(group,[]):
                if item.get('reviewStatus')!='approved':
                    raise ValueError('Voeg uitsluitend gecontroleerde, voor publicatie goedgekeurde output toe.')
                if not item.get('id') or not item.get('title'):
                    raise ValueError('Onderzoeksitem mist ID of titel.')
                if any(x not in modules for x in item.get('moduleIds',[])):
                    raise ValueError('Onderzoeksitem verwijst naar onbekende module.')
                if any(x not in source_ids for x in item.get('sourceIds',[])):
                    raise ValueError('Onderzoeksitem verwijst naar onbekende bron.')
                if group=='outputs':
                    rel=Path(item.get('path',''))
                    target=(site/rel).resolve()
                    if not str(rel).startswith('assets/research/') or not target.is_relative_to(site.resolve()) or not target.is_file():
                        raise ValueError('Uitvoerbestand ontbreekt of staat buiten assets/research/.')
    dest=site/'assets'/'js'/'research-data.js'
    dest.write_text('/* Generated from beheer/demonstraties.json. No runtime fetch. */\nwindow.VARIANA_RESEARCH_DEMOS = '+json.dumps(data,ensure_ascii=False,indent=2).replace('<','\\u003c')+';\n',encoding='utf-8')
    return data

def render_teaser():
    return '''<div class="report-preview research-teaser"><div class="report-preview-bar"><span>INTERACTIEVE ONDERZOEKSVERKENNING</span><span>VARIANA</span></div><div class="report-paper"><span class="doc-kicker">FICTIEVE DEMONSTRATIE-INPUT</span><p class="doc-title">Internationale groei.<br>Onderzoek in samenhang.</p><p class="doc-intro">Een complexe industriële groeivraag, met verbonden commerciële en operationele onderzoekslijnen.</p><div class="teaser-research-lines"><span>Omgeving &amp; markt</span><span aria-hidden="true">↔</span><span>Capaciteit &amp; logistiek</span><span aria-hidden="true">↘</span><span>Scenario’s &amp; risico’s</span></div><div class="doc-finding"><span class="doc-kicker">ONDERZOEKSOPZET · NOG NIET UITGEVOERD</span><p>Verken deelvragen, afhankelijkheden en mogelijke feedbacklussen. Er zijn nog geen onderzoeksresultaten beschikbaar.</p></div></div><a class="report-preview-link" href="voorbeelden.html#demonstratie">Verken de onderzoeksstructuur <span aria-hidden="true">→</span></a></div>'''

def render_explorer(data):
    case=next(c for c in data['cases'] if c['id']==data['defaultCase'])
    tabs=[('vraagstuk','A','Het vraagstuk'),('onderzoek','B','Het onderzoek'),('samenhang','C','De samenhang'),('resultaten','D','De resultaten')]
    tab_html=''.join(f'<button type="button" role="tab" id="research-tab-{key}" aria-controls="{key}" aria-selected="{str(i==0).lower()}" tabindex="{0 if i==0 else -1}" data-research-tab="{key}"><span>{letter}</span>{label}</button>' for i,(key,letter,label) in enumerate(tabs))
    facts=''.join(f'<div><dt>{esc(x["label"])}</dt><dd>{esc(x["value"])}</dd></div>' for x in case['inputFacts'])
    missing=''.join('<li>'+esc(x)+'</li>' for x in case['missingInputs'])
    nav=''.join(f'<button type="button" data-research-module="{esc(m["id"])}" aria-pressed="{str(i==0).lower()}"><span>{i+1:02}</span><strong>{esc(m["title"])}</strong><small>Onderzoeksopzet</small></button>' for i,m in enumerate(case['modules']))
    fallback=''.join(f'<details><summary>{esc(m["title"])}</summary><p>{esc(m["purpose"])}</p><ul>'+''.join('<li>'+esc(q)+'</li>' for q in m['questions'])+'</ul></details>' for m in case['modules'])
    return f'''<section class="research-explorer container" id="demonstratie" data-research-explorer>
<div class="research-case-banner"><div><p class="eyebrow" data-research-category>{esc(data['categories'][case['category']])}</p><h2 data-research-title>{esc(case['title'])}</h2><p data-research-subtitle>{esc(case['subtitle'])}</p></div><span class="tag">Tijdelijke demonstratieweergave</span></div>
<div class="research-state-strip"><span><small>INVOER</small><strong>Volledig fictief</strong></span><span><small>ONDERZOEK</small><strong data-execution-label>Niet uitgevoerd</strong></span><span><small>RESULTATEN</small><strong data-output-label>Nog niet beschikbaar</strong></span></div>
<div class="research-case-selector" hidden><label for="research-case-select">Demonstratieonderzoek</label><select id="research-case-select"></select></div>
<div class="research-tabs" role="tablist" aria-label="Verken het demonstratieonderzoek">{tab_html}</div>
<section class="research-panel" id="vraagstuk" role="tabpanel" aria-labelledby="research-tab-vraagstuk" tabindex="0" data-research-panel="vraagstuk"><div class="research-panel-intro"><p class="eyebrow">A / DEMONSTRATIE-INPUT</p><h3>De vraag achter de groeistrategie.</h3><p data-input-notice>{esc(case['inputNotice'])}</p></div><div class="research-input-layout"><div><dl class="research-facts" data-input-facts>{facts}</dl><details class="research-brief"><summary>Lees de volledige demonstratie-input</summary><pre data-research-brief>{esc(case['brief'])}</pre></details></div><aside class="research-context"><h4>Wat ontbreekt nog?</h4><ul data-missing-inputs>{missing}</ul><p class="research-status-note">Deze verkenner laat een onderzoeksopzet zien. Er wordt hier geen onderzoek gestart of uitgevoerd.</p><button class="button secondary" type="button" data-show-research-tab="onderzoek">Verken de onderzoeksopzet <span aria-hidden="true">→</span></button></aside></div></section>
<section class="research-panel" id="onderzoek" role="tabpanel" aria-labelledby="research-tab-onderzoek" tabindex="0" data-research-panel="onderzoek" hidden><div class="research-panel-intro"><p class="eyebrow">B / ONDERZOEKSOPZET</p><h3>Deelvragen, informatie en terugkoppeling.</h3><p>De onderstaande indeling is een illustratieve onderzoeksopzet. De daadwerkelijk doorlopen stappen en toegepaste methoden worden pas na uitvoering aan het gecontroleerde Variana-dossier gekoppeld.</p></div><div class="research-module-layout"><nav class="research-module-nav" aria-label="Onderzoeksmodules" data-module-nav>{nav}</nav><article class="research-module-detail" aria-live="polite" aria-atomic="false" data-module-detail></article></div></section>
<section class="research-panel" id="samenhang" role="tabpanel" aria-labelledby="research-tab-samenhang" tabindex="0" data-research-panel="samenhang" hidden><div class="research-panel-intro"><p class="eyebrow">C / GEDEELDE ONDERZOEKSSTRUCTUUR</p><h3>Analyses bouwen op elkaar voort.</h3><p>Selecteer een onderdeel om de geplande koppelingen te bekijken. Met een feedbacklus zie je welke onderdelen bij een herbeoordeling geraakt kunnen worden. De lijnen tonen geen werkelijk vastgestelde bevindingen.</p></div><div class="research-graph-toolbar" role="group" aria-label="Weergave onderzoeksstructuur"><button type="button" data-graph-mode="dependencies" aria-pressed="true">Afhankelijkheden</button><button type="button" data-graph-mode="feedback" aria-pressed="false">Feedbacklussen</button></div><div class="research-loop-picker" data-loop-picker hidden><label for="research-loop-select">Mogelijke aanleiding voor herbeoordeling</label><select id="research-loop-select"></select></div><div class="research-dependency-layout"><div><div class="research-graph-viewport" tabindex="0" aria-label="Onderzoekskaart; op smalle schermen horizontaal schuifbaar"><div class="research-graph" data-research-graph><svg class="research-connections" aria-hidden="true" focusable="false"></svg><div class="research-graph-columns" data-graph-columns></div></div></div><p class="research-graph-help">Selecteer een onderdeel. Op een smal scherm kun je de kaart horizontaal verschuiven.</p><div class="research-graph-legend"><span>Geplande koppeling</span><span class="legend-active">Geselecteerde koppeling</span><span class="legend-loop">Mogelijke terugkoppeling</span></div></div><aside class="research-context" data-graph-context aria-live="polite"></aside></div></section>
<section class="research-panel" id="resultaten" role="tabpanel" aria-labelledby="research-tab-resultaten" tabindex="0" data-research-panel="resultaten" hidden><div class="research-panel-intro"><p class="eyebrow">D / GECONTROLEERDE OUTPUT</p><h3>Resultaten worden hier aan hun onderbouwing gekoppeld.</h3><p>Alleen werkelijk door Variana uitgevoerde en gecontroleerde onderzoeksoutput kan dit onderdeel vullen.</p></div><div data-research-results></div></section>
<p class="research-method-note">De algemene methodologie van Variana verbindt invoer, conceptontwikkeling, probleemanalyse, oplossingsrichting en doelgroep, marketing en sales, planning en specialistische modules met feedbacklussen. Deze casusindeling is een website-opzet en geen verslag van uitgevoerde stappen.</p>
<noscript><div class="research-no-script"><h3>Onderzoeksopzet zonder interactie</h3><p>JavaScript is nodig voor de tabbladen en onderzoekskaart. Hieronder kun je de voorgenomen vragen lezen. Er zijn nog geen onderzoeksresultaten beschikbaar.</p>{fallback}</div></noscript>
</section>'''

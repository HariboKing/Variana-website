"""Build the static Variana website. No packages or internet required.

In the delivered site: python beheer/build.py
Edit page fragments in beheer/paginas; metadata is in beheer/pages.json. The shared layout is here.
"""
from pathlib import Path
import json
import html
import hashlib
from research_renderer import load_research, render_explorer, render_teaser
from application_renderer import render_application_matcher

BASE = Path(__file__).resolve().parent
SITE = BASE.parent if BASE.name == 'beheer' else BASE.parent / 'outputs' / 'variana-website'
SITE.mkdir(parents=True, exist_ok=True)
pages = json.loads((BASE/'pages.json').read_text(encoding='utf-8'))

def arrow():
    return '<span aria-hidden="true">→</span>'

def propositions():
    return '''<div class="proposition-grid" aria-label="Variana als dienst en als software"><article class="proposition-card is-service"><p class="eyebrow">Variana als dienst</p><h3>Laat je vraag uitwerken.</h3><span class="product-status">Nu beschikbaar</span><p>Laat analyses, adviesrapporten en blauwdrukken uitvoeren, afgestemd op het besluit dat je voorbereidt.</p><a class="text-link" href="toepassingen.html">Ontdek de dienstverlening <span aria-hidden="true">→</span></a></article><article class="proposition-card is-software"><p class="eyebrow">Variana als software</p><h3>Werk straks zelfstandig.</h3><span class="product-status">In ontwikkeling</span><p>De zelfstandige onderzoeksomgeving voor analyses, organisatieblauwdrukken en strategische uitwerkingen.</p><a class="text-link" href="software.html">Ontdek Variana Desktop <span aria-hidden="true">→</span></a></article></div>'''

nav_items = [('toepassingen.html','Toepassingen'),('hoe-het-werkt.html','Hoe het werkt'),('software.html','Software'),('voor-wie.html','Voor wie'),('samenwerken.html#tarieven','Tarieven'),('kennisbank.html','Kennisbank')]

def header(filename):
    links = ''
    for url, label in nav_items:
        active = url.split('#')[0] == filename or (url == 'toepassingen.html' and filename in ['analyse.html','adviesrapport.html','bedrijfsplan.html']) or (url=='kennisbank.html' and filename.startswith('kennis-')) or (url=='hoe-het-werkt.html' and filename in ['blauwdruk.html','specialistische-modules.html','strategie.html','analytische-verdieping.html','organisatieontwikkeling.html','marketing.html','evaluatie.html','samenhang.html']) or (url=='toepassingen.html' and filename=='plan-van-aanpak.html')
        links += f'<a href="{url}"'+(' aria-current="page"' if active else '')+f'>{label}</a>'
    return f'''<a class="skip-link" href="#main">Ga naar inhoud</a><header class="site-header"><div class="container nav-inner"><a class="brand" href="index.html" aria-label="Variana, naar home"><img src="assets/images/variana-mark.png" alt="" width="38" height="38"><span>VARIANA</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation"><span class="menu-lines" aria-hidden="true"></span><span>Menu</span></button><nav id="main-navigation" aria-label="Hoofdnavigatie">{links}<a class="button primary nav-cta" href="contact.html?onderwerp=opdracht">Dien je vraag in {arrow()}</a></nav></div></header>'''

def footer():
    return '''<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="index.html"><img src="assets/images/variana-mark.png" alt="" width="38" height="38"><span>VARIANA</span></a><p>Een geïntegreerde AI-onderzoeksomgeving. Van gespecialiseerde analyses naar samenhangende beslisinformatie.</p><span class="footer-status"><i></i> Online ondersteund prototype<br><span>Zelfstandige offline software in ontwikkeling</span></span></div><div><h2>Laat uitwerken</h2><a href="analyse.html">Analyse</a><a href="adviesrapport.html">Adviesrapport</a><a href="bedrijfsplan.html">Blauwdruk &amp; uitvoering</a><a href="samenwerken.html#tarieven">Tarieven &amp; samenwerken</a></div><div><h2>Ontdek Variana</h2><a href="hoe-het-werkt.html">Hoe het werkt</a><a href="software.html">Software</a><a href="toepassingen.html#demonstratie">Van vraag naar output</a><a href="index.html#opdrachten">Onze opdrachten</a><a href="voor-wie.html">Voor wie</a><a href="kennisbank.html">Kennisbank</a></div><div><h2>In gesprek</h2><a href="contact.html?onderwerp=opdracht">Dien je vraag in</a><a href="contact.html?onderwerp=demo">Vraag een demo aan</a><a href="mailto:info@variana.nl">info@variana.nl</a></div></div><div class="container footer-bottom"><span>© 2026 Variana</span><span>Onderzoek. Ontwikkeling. Besluitvorming.</span><a href="contact.html#contact-form">Contact &amp; gegevensgebruik</a></div></footer>'''

def viewer():
    return '''<dialog id="image-viewer" class="image-viewer" aria-label="Vergrote productweergave"><div class="viewer-heading"><p id="viewer-caption">Productweergave van het prototype</p><button type="button" data-close-viewer>Sluiten <span aria-hidden="true">×</span></button></div><img src="assets/images/variana-prototype-home.webp" alt="" width="1151" height="611"></dialog>'''

research_data=None
style_version=hashlib.sha256((SITE/'assets/css/styles.css').read_bytes()).hexdigest()[:12]

for filename, page in pages.items():
    source_body = page.get('body')
    if source_body is None:
        source_body = (BASE/page['body_file']).read_text(encoding='utf-8')
    body = source_body
    if '<!-- RESEARCH_PREVIEW -->' in body:
        body = body.replace('<!-- RESEARCH_PREVIEW -->', render_teaser())
    if '<!-- RESEARCH_EXPLORER -->' in body:
        if research_data is None:
            research_data=load_research(BASE,SITE)
        body = body.replace('<!-- RESEARCH_EXPLORER -->', render_explorer(research_data))
    if '<!-- APPLICATION_MATCHER -->' in body:
        body = body.replace('<!-- APPLICATION_MATCHER -->', render_application_matcher(BASE,SITE))
    if '<!-- SYSTEM_EXPLORER -->' in body:
        body = body.replace('<!-- SYSTEM_EXPLORER -->', '')
    if '<!-- PROPOSITIONS -->' in body:
        body = body.replace('<!-- PROPOSITIONS -->', propositions())
    title = html.escape(page['title'])
    description = html.escape(page['description'], quote=True)
    schema = {'@context':'https://schema.org','@type':'Article' if filename.startswith('kennis-') else 'WebPage','name':page['title'],'description':page['description'],'inLanguage':'nl-NL'}
    if filename.startswith('kennis-'):
        schema['headline'] = page['title'].split('|')[0].strip()
        schema['author'] = {'@type':'Organization','name':'Variana'}
    body_class = 'home' if filename == 'index.html' else ('inner-page article-page' if filename.startswith('kennis-') else 'inner-page')
    if filename in ['blauwdruk.html','specialistische-modules.html','strategie.html','analytische-verdieping.html','organisatieontwikkeling.html','marketing.html','evaluatie.html','samenhang.html','plan-van-aanpak.html']:
        body_class += ' system-detail-page'
    extra_scripts=''
    if '<!-- RESEARCH_EXPLORER -->' in source_body:
        research_css_version=hashlib.sha256((SITE/'assets/css/research.css').read_bytes()).hexdigest()[:12]
        research_js_version=hashlib.sha256((SITE/'assets/js/research.js').read_bytes()).hexdigest()[:12]
        extra_scripts=f'<link rel="stylesheet" href="assets/css/research.css?v={research_css_version}"><script src="assets/js/research-data.js" defer></script><script src="assets/js/research.js?v={research_js_version}" defer></script>'
    if '<!-- APPLICATION_MATCHER -->' in source_body:
        matcher_css_version=hashlib.sha256((SITE/'assets/css/application-matcher.css').read_bytes()).hexdigest()[:12]
        matcher_js_version=hashlib.sha256((SITE/'assets/js/application-matcher.js').read_bytes()).hexdigest()[:12]
        extra_scripts=f'<link rel="stylesheet" href="assets/css/application-matcher.css?v={matcher_css_version}"><script src="assets/js/application-matcher.js?v={matcher_js_version}" defer></script>'
    if '<!-- SYSTEM_EXPLORER -->' in source_body:
        system_css_version=hashlib.sha256((SITE/'assets/css/system-explorer.css').read_bytes()).hexdigest()[:12]
        system_js_version=hashlib.sha256((SITE/'assets/js/system-explorer.js').read_bytes()).hexdigest()[:12]
        extra_scripts+=f'<link rel="stylesheet" href="assets/css/system-explorer.css?v={system_css_version}"><script src="assets/js/system-explorer.js?v={system_js_version}" defer></script>'
    if filename=='index.html':
        cinematic_css_version=hashlib.sha256((SITE/'assets/css/cinematic.css').read_bytes()).hexdigest()[:12]
        extra_scripts=f'<link rel="preload" as="image" href="assets/images/variana-city-hero.webp" type="image/webp" fetchpriority="high"><link rel="stylesheet" href="assets/css/cinematic.css?v={cinematic_css_version}">'
    if '<!-- PROPOSITIONS -->' in source_body or filename == 'software.html':
        product_css_version=hashlib.sha256((SITE/'assets/css/product.css').read_bytes()).hexdigest()[:12]
        extra_scripts+=f'<link rel="stylesheet" href="assets/css/product.css?v={product_css_version}">'
    content = f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#081322"><title>{title}</title><meta name="description" content="{description}"><meta property="og:title" content="{title}"><meta property="og:description" content="{description}"><meta property="og:type" content="{'article' if filename.startswith('kennis-') else 'website'}"><meta property="og:locale" content="nl_NL"><link rel="icon" href="assets/images/variana-mark.png" type="image/png"><link rel="stylesheet" href="assets/css/styles.css?v={style_version}"><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script><script src="assets/js/config.js" defer></script><script src="assets/js/main.js" defer></script>{extra_scripts}</head><body class="{body_class}">{header(filename)}<main id="main">{body}</main>{footer()}{viewer() if 'data-image-zoom' in body else ''}<noscript><div class="noscript-note">Alle inhoud en links zijn beschikbaar. Voor de interactieve schermen, het mobiele menu en het lokale aanvraagbestand is JavaScript nodig. Productafbeeldingen kun je ook via de afbeeldingslinks vergroten.</div></noscript></body></html>'''
    if '<!--' in body:
        raise ValueError(f'Unfilled marker in {filename}')
    (SITE/filename).write_text(content,encoding='utf-8')
# Preserve old bookmarks without retaining a separate examples page.
redirect_content = f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Opdrachten | Variana</title><meta name="description" content="Bekijk een greep uit onze opdrachten op de homepage van Variana."><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=index.html#opdrachten"><link rel="canonical" href="https://variana.nl/"><link rel="stylesheet" href="assets/css/styles.css?v={style_version}"></head><body class="inner-page"><main class="page-intro container"><h1>Onze opdrachten staan op de homepage.</h1><p><a class="button primary" href="index.html#opdrachten">Bekijk onze opdrachten <span aria-hidden="true">→</span></a></p></main></body></html>'''
(SITE/'voorbeelden.html').write_text(redirect_content,encoding='utf-8')
software_redirect = '''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Variana Desktop | Software</title><meta name="description" content="Ontdek Variana Desktop en bekijk de ontwikkelpreview."><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=../software.html"><link rel="canonical" href="https://variana.nl/software.html"></head><body><main><h1>Variana Desktop</h1><p><a href="../software.html">Ontdek de software</a></p></main></body></html>'''
(SITE/'software').mkdir(exist_ok=True)
(SITE/'software/index.html').write_text(software_redirect,encoding='utf-8')
print(f'Built {len(pages)} content pages and two redirects in {SITE}')

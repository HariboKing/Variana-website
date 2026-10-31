"""Build the static Variana website. No packages or internet required.

In the delivered site: python beheer/build.py
Edit page fragments in beheer/paginas; metadata is in beheer/pages.json. The shared layout is here.
"""
from pathlib import Path
import json
import html
import hashlib
from research_renderer import load_research, render_explorer, render_teaser

BASE = Path(__file__).resolve().parent
SITE = BASE.parent if BASE.name == 'beheer' else BASE.parent / 'outputs' / 'variana-website'
SITE.mkdir(parents=True, exist_ok=True)
pages = json.loads((BASE/'pages.json').read_text(encoding='utf-8'))

def arrow():
    return '<span aria-hidden="true">→</span>'

def product_tour():
    return '''<div class="product-tour" data-demo><div class="tour-tabs" role="tablist" aria-label="Verken de Variana-werkomgeving"><button type="button" role="tab" id="tour-tab-1" aria-controls="tour-panel-1" aria-selected="true" data-demo-tab="1">1. Het vraagstuk</button><button type="button" role="tab" id="tour-tab-2" aria-controls="tour-panel-2" aria-selected="false" tabindex="-1" data-demo-tab="2">2. De uitwerking</button><button type="button" role="tab" id="tour-tab-3" aria-controls="tour-panel-3" aria-selected="false" tabindex="-1" data-demo-tab="3">3. Onderzoek verkennen</button></div><div class="tour-panel" id="tour-panel-1" role="tabpanel" aria-labelledby="tour-tab-1" tabindex="0" data-demo-panel="1"><figure><a class="zoom-image" href="assets/images/variana-prototype-home.webp" data-image-zoom><img src="assets/images/variana-prototype-home.webp" alt="Echt startscherm van het Variana-prototype met de vraag Wat pakken we vandaag op en een invoerveld" width="1151" height="611" loading="eager"><span>Vergroot het softwarescherm <span aria-hidden="true">↗</span></span></a><figcaption>Echte productweergave · startscherm uit het prototype.</figcaption></figure><div><p class="eyebrow">EEN GOED VERTREKPUNT</p><h3>Begin met de beslissing die voorligt.</h3><p>In de kennismaking bepalen we de vraag en het gewenste resultaat. De software biedt een werkomgeving waarin de context en de uitwerking bij elkaar komen.</p><p class="status-note">Een screenshot toont de interface. De opdracht bepaalt welke informatie wordt ingevoerd en onderzocht.</p></div></div><div class="tour-panel" id="tour-panel-2" role="tabpanel" aria-labelledby="tour-tab-2" tabindex="0" data-demo-panel="2" hidden><figure><a class="zoom-image" href="assets/images/variana-prototype-modules.webp" data-image-zoom><img src="assets/images/variana-prototype-modules.webp" alt="Echt moduleoverzicht van Variana met analyses, blauwdruk en bedrijfsplannen in de ontwikkelversie" width="768" height="408" loading="eager"><span>Vergroot het softwarescherm <span aria-hidden="true">↗</span></span></a><figcaption>Echte productweergave · moduleoverzicht uit de ontwikkelversie.</figcaption></figure><div><p class="eyebrow">EEN PASSENDE UITWERKING</p><h3>De module volgt uit de opdracht.</h3><p>Het moduleoverzicht laat analyses, blauwdrukken en bedrijfsplannen zien. De onderzoeksvraag en de afgesproken oplevering bepalen welke uitwerking nodig is.</p><p class="status-note">De software op deze beelden is een ontwikkelversie. Een zichtbare module betekent niet dat deze al als zelfstandig offline product beschikbaar is.</p></div></div><div class="tour-panel" id="tour-panel-3" role="tabpanel" aria-labelledby="tour-tab-3" tabindex="0" data-demo-panel="3" hidden><div class="tour-research-visual"><span class="tag">Illustratieve onderzoeksopzet</span><h3>Deelvragen ↔ analyses ↔ afweging</h3><p>Open de modules en bekijk welke informatie andere onderdelen nodig hebben.</p><a class="button secondary" href="toepassingen.html#samenhang">Open de onderzoekskaart <span aria-hidden="true">→</span></a></div><div><p class="eyebrow">Wat je nu kunt verkennen</p><h3>Een opzet voor verbonden onderzoek.</h3><p>De interactieve omgeving bevat fictieve demonstratie-input en mogelijke koppelingen. Dit is geen opname van een uitgevoerde onderzoeksrun.</p><p class="status-note">Echte onderzoeksuitvoering en eindoutput zijn nog niet als gecontroleerd demonstratiemateriaal beschikbaar. Er worden geen bevindingen of rapporten gesimuleerd.</p></div></div></div>'''

nav_items = [('toepassingen.html','Toepassingen'),('hoe-het-werkt.html','Hoe het werkt'),('voor-wie.html','Voor wie'),('voorbeelden.html','Voorbeelden'),('samenwerken.html#tarieven','Tarieven'),('kennisbank.html','Kennisbank')]

def header(filename):
    links = ''
    for url, label in nav_items:
        active = url.split('#')[0] == filename or (url == 'toepassingen.html' and filename in ['analyse.html','adviesrapport.html','bedrijfsplan.html']) or (url=='kennisbank.html' and filename.startswith('kennis-')) or (url=='hoe-het-werkt.html' and filename in ['blauwdruk.html','specialistische-modules.html','strategie.html','analytische-verdieping.html','organisatieontwikkeling.html','marketing.html','evaluatie.html','samenhang.html']) or (url=='toepassingen.html' and filename=='plan-van-aanpak.html')
        links += f'<a href="{url}"'+(' aria-current="page"' if active else '')+f'>{label}</a>'
    return f'''<a class="skip-link" href="#main">Ga naar inhoud</a><header class="site-header"><div class="container nav-inner"><a class="brand" href="index.html" aria-label="Variana, naar home"><img src="assets/images/variana-mark.png" alt="" width="38" height="38"><span>VARIANA</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-navigation"><span class="menu-lines" aria-hidden="true"></span><span>Menu</span></button><nav id="main-navigation" aria-label="Hoofdnavigatie">{links}<a class="button primary nav-cta" href="contact.html?onderwerp=opdracht">Dien je vraag in {arrow()}</a></nav></div></header>'''

def footer():
    return '''<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="index.html"><img src="assets/images/variana-mark.png" alt="" width="38" height="38"><span>VARIANA</span></a><p>Een geïntegreerde AI-onderzoeksomgeving. Van gespecialiseerde analyses naar samenhangende beslisinformatie.</p><span class="footer-status"><i></i> Online ondersteund prototype<br><span>Zelfstandige offline software in ontwikkeling</span></span></div><div><h2>Laat uitwerken</h2><a href="analyse.html">Analyse</a><a href="adviesrapport.html">Adviesrapport</a><a href="bedrijfsplan.html">Blauwdruk &amp; uitvoering</a><a href="samenwerken.html#tarieven">Tarieven &amp; samenwerken</a></div><div><h2>Ontdek Variana</h2><a href="hoe-het-werkt.html">Hoe het werkt</a><a href="toepassingen.html#demonstratie">Onderzoeksverkenning</a><a href="voorbeelden.html">Voorbeelden</a><a href="voor-wie.html">Voor wie</a><a href="kennisbank.html">Kennisbank</a></div><div><h2>In gesprek</h2><a href="contact.html?onderwerp=opdracht">Dien je vraag in</a><a href="contact.html?onderwerp=demo">Vraag een demo aan</a><a href="mailto:info@variana.nl">info@variana.nl</a></div></div><div class="container footer-bottom"><span>© 2026 Variana</span><span>Onderzoek. Ontwikkeling. Besluitvorming.</span><a href="contact.html#contact-form">Contact &amp; gegevensgebruik</a></div></footer>'''

def viewer():
    return '''<dialog id="image-viewer" class="image-viewer" aria-label="Vergrote productweergave"><div class="viewer-heading"><p id="viewer-caption">Productweergave van het prototype</p><button type="button" data-close-viewer>Sluiten <span aria-hidden="true">×</span></button></div><img src="assets/images/variana-prototype-home.webp" alt="" width="1151" height="611"></dialog>'''

research_data=load_research(BASE,SITE)
style_version=hashlib.sha256((SITE/'assets/css/styles.css').read_bytes()).hexdigest()[:12]

for filename, page in pages.items():
    source_body = page.get('body')
    if source_body is None:
        source_body = (BASE/page['body_file']).read_text(encoding='utf-8')
    body = source_body.replace('<!-- RESEARCH_PREVIEW -->', render_teaser()).replace('<!-- PRODUCT_DEMO -->', product_tour()).replace('<!-- RESEARCH_EXPLORER -->', render_explorer(research_data))
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
    if filename=='index.html':
        extra_scripts='<link rel="preload" as="image" href="assets/images/variana-city-hero.webp" type="image/webp" fetchpriority="high"><link rel="stylesheet" href="assets/css/cinematic.css">'
    content = f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#081322"><title>{title}</title><meta name="description" content="{description}"><meta property="og:title" content="{title}"><meta property="og:description" content="{description}"><meta property="og:type" content="{'article' if filename.startswith('kennis-') else 'website'}"><meta property="og:locale" content="nl_NL"><link rel="icon" href="assets/images/variana-mark.png" type="image/png"><link rel="stylesheet" href="assets/css/styles.css?v={style_version}"><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script><script src="assets/js/config.js" defer></script><script src="assets/js/main.js" defer></script>{extra_scripts}</head><body class="{body_class}">{header(filename)}<main id="main">{body}</main>{footer()}{viewer() if 'data-image-zoom' in body else ''}<noscript><div class="noscript-note">Alle inhoud en links zijn beschikbaar. Voor de producttabs, het mobiele menu en het lokale aanvraagbestand is JavaScript nodig. Productafbeeldingen kun je ook via de afbeeldingslinks vergroten.</div></noscript></body></html>'''
    if '<!--' in body:
        raise ValueError(f'Unfilled marker in {filename}')
    (SITE/filename).write_text(content,encoding='utf-8')
print(f'Built {len(pages)} pages in {SITE}')

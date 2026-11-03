"""Directory routes for static hosting, with compatible legacy/offline pages."""
import html
import json
import re
from urllib.parse import urlsplit, urlunsplit


def page_url_map(pages):
    result = {name: '/' if name == 'index.html' else '/' + name[:-5] + '/' for name in pages}
    # Reports now live in the shared reader on the homepage. Keep older links.
    result.setdefault('voorbeelden.html', '/#voorbeeldrapport')
    return result


def rewrite_urls(document, asset_prefix, routes):
    pattern = re.compile(r'\b(href|src|poster)=("|\')(.*?)\2', re.IGNORECASE)

    def replace(match):
        attr, quote, value = match.groups()
        raw = html.unescape(value)
        url = urlsplit(raw)
        if not raw or raw.startswith(('#', '?')) or url.scheme or url.netloc:
            return match.group(0)
        path = url.path
        if path.startswith('assets/') or path.startswith('/assets/'):
            path = asset_prefix + path.lstrip('/')
            target = urlunsplit(('', '', path, url.query, url.fragment))
        elif path.lstrip('/') in routes:
            target_url = urlsplit(routes[path.lstrip('/')])
            # Keep report-specific old links pointed at the selected home tab.
            if path.lstrip('/') == 'voorbeelden.html' and target_url.fragment == 'voorbeeldrapport':
                fragment = {'concurrentieanalyse': 'concurrentieanalyse',
                            'omgevingsanalyse': 'omgevingsanalyse',
                            'rapport-bekijken': 'concurrentieanalyse'}.get(url.fragment, 'voorbeeldrapport')
            else:
                fragment = target_url.fragment or url.fragment
            target = urlunsplit(('', '', target_url.path, url.query, fragment))
        else:
            return match.group(0)
        return f'{attr}={quote}{html.escape(target, quote=True)}{quote}'

    return pattern.sub(replace, document)


def render_clean_page(document, canonical_path, asset_prefix, routes, helper_version, legacy=False):
    document = rewrite_urls(document, asset_prefix, routes)
    canonical = 'https://variana.nl' + canonical_path
    path_json = json.dumps(canonical_path)
    normalizer = f'''<script>(()=>{{if(/^https?:$/.test(location.protocol)&&location.pathname!=={path_json}){{location.replace({path_json}+location.search+location.hash);}}}})();</script>'''
    mapping = json.dumps(routes, ensure_ascii=True).replace('<', '\\u003c')
    head = normalizer + f'<link rel="canonical" href="{canonical}"><meta property="og:url" content="{canonical}">'
    head += f'<script type="application/json" data-page-url-map>{mapping}</script>'
    head += f'<script src="{asset_prefix}assets/js/page-urls.js?v={helper_version}" defer></script>'
    if legacy and canonical_path != '/':
        head += f'<noscript><meta http-equiv="refresh" content="0; url={canonical_path}"></noscript>'
    # Keep charset first, including offline copies served without HTTP headers.
    return document.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + head, 1)


def examples_redirect(asset_prefix):
    fallback = asset_prefix + 'index.html#voorbeeldrapport'
    return f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Voorbeeldrapporten | Variana</title><meta name="description" content="Bekijk onze voorbeeldrapporten in de PDF-lezer op de homepage van Variana."><meta name="robots" content="noindex"><link rel="canonical" href="https://variana.nl/#voorbeeldrapport"><script>(()=>{{const p=/^https?:$/.test(location.protocol)?'/':{json.dumps(asset_prefix + 'index.html')};const sections={{'#concurrentieanalyse':'#concurrentieanalyse','#omgevingsanalyse':'#omgevingsanalyse','#rapport-bekijken':'#concurrentieanalyse'}};location.replace(p+location.search+(sections[location.hash]||'#voorbeeldrapport'));}})();</script><noscript><meta http-equiv="refresh" content="0; url={fallback}"></noscript></head><body><main><h1>Onze voorbeeldrapporten staan op de homepage.</h1><p><a href="{fallback}">Bekijk de voorbeeldrapporten</a></p></main></body></html>'''

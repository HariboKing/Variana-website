"""Directory routes for static hosting, with compatible legacy/offline pages."""
import html
import json
import re
from urllib.parse import urlsplit, urlunsplit


def page_url_map(pages):
    result = {name: '/' if name == 'index.html' else '/' + name[:-5] + '/' for name in pages}
    # Older builds without an examples page still retain their original alias.
    result.setdefault('voorbeelden.html', '/#opdrachten')
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
            # A legacy alias may define its own landing section. Real pages
            # preserve the requested section, including the report viewer.
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
    fallback = asset_prefix + 'index.html#opdrachten'
    return f'''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Opdrachten | Variana</title><meta name="description" content="Bekijk onze opdrachten op de homepage van Variana."><meta name="robots" content="noindex"><link rel="canonical" href="https://variana.nl/#opdrachten"><script>(()=>{{const p=/^https?:$/.test(location.protocol)?'/':{json.dumps(asset_prefix + 'index.html')};location.replace(p+location.search+'#opdrachten');}})();</script><noscript><meta http-equiv="refresh" content="0; url={fallback}"></noscript></head><body><main><h1>Onze opdrachten staan op de homepage.</h1><p><a href="{fallback}">Bekijk onze opdrachten</a></p></main></body></html>'''

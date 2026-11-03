"""Render the homepage report selector from the maintained report catalogue."""
import html
import json
import re
from pathlib import Path


def load_reports(base, site):
    reports = json.loads((Path(base) / 'rapporten.json').read_text(encoding='utf-8'))['reports']
    if not reports:
        raise ValueError('The report catalogue must contain at least one report')
    seen = set()
    site = Path(site).resolve()
    for report in reports:
        identifier = report['id']
        if not re.fullmatch(r'[a-z][a-z0-9-]*', identifier) or identifier in seen:
            raise ValueError(f'Invalid or duplicate report ID: {identifier}')
        seen.add(identifier)
        file = Path(report['file'])
        resolved = (site / file).resolve()
        if file.is_absolute() or not resolved.is_relative_to(site) or resolved.suffix.lower() != '.pdf' or not resolved.is_file():
            raise ValueError(f'Invalid report file: {file}')
        if not isinstance(report['pages'], int) or report['pages'] < 1:
            raise ValueError(f'Invalid page count for {identifier}')
        if not report['label'] or not report['description'] or Path(report['filename']).name != report['filename']:
            raise ValueError(f'Invalid report metadata for {identifier}')
        report['sizeLabel'] = f"{round(resolved.stat().st_size / 1000)} kB"
    return reports


def render_report_reader(base, site):
    reports = load_reports(base, site)
    esc = lambda value: html.escape(str(value), quote=True)
    first = reports[0]
    buttons = []
    files = []
    for index, report in enumerate(reports):
        identifier = esc(report['id'])
        label = esc(report['label'])
        file = esc(report['file'])
        buttons.append(f'<button type="button" role="tab" id="{identifier}" aria-selected="{str(index == 0).lower()}" aria-controls="report-reader-panel" tabindex="{0 if index == 0 else -1}" data-report-select="{identifier}" disabled>{label}</button>')
        files.append(f'<li data-report-source="{identifier}" data-report-label="{label}" data-report-description="{esc(report["description"])}" data-report-pages="{report["pages"]}" data-report-size="{esc(report["sizeLabel"])}"><span>{label}</span><a class="text-link" data-report-source-open href="{file}" target="_blank" rel="noopener noreferrer">Open {label.lower()} als PDF</a><a class="text-link" data-report-source-download href="{file}" download="{esc(report["filename"])}">Download {label.lower()}</a></li>')
    return f'''<section class="section container home-report-reader" id="voorbeeldrapport" aria-labelledby="report-reader-title" data-report-reader>
  <div class="section-heading report-reader-intro"><p class="eyebrow">Voorbeelden van onze output</p><h2 id="report-reader-title">Bekijk wat een analyse oplevert.</h2><p>Ontdek hoe Variana bevindingen, onderbouwing en afwegingen presenteert. Kies een voorbeeldrapport en lees het hieronder.</p></div>
  <div class="home-report-reader-shell">
    <div class="home-report-reader-selector"><p id="report-reader-choose">Kies een voorbeeldrapport</p><div class="home-report-reader-tabs" role="tablist" aria-labelledby="report-reader-choose" data-report-tabs>{''.join(buttons)}</div></div>
    <div class="home-report-reader-panel" id="report-reader-panel" role="tabpanel" aria-labelledby="{esc(first['id'])}" tabindex="0">
      <div class="home-report-reader-heading"><div><h3 data-report-active-title>{esc(first['label'])}</h3><p class="home-report-reader-meta" data-report-meta role="status" aria-live="polite" aria-atomic="true">{esc(first['label'])} · PDF · {first['pages']} pagina’s · {esc(first['sizeLabel'])}</p></div><div class="home-report-reader-actions"><a class="text-link" href="{esc(first['file'])}" target="_blank" rel="noopener noreferrer" data-report-open>Open in apart venster</a><a class="button secondary" href="{esc(first['file'])}" download="{esc(first['filename'])}" data-report-download>Download als PDF</a></div></div>
      <p class="home-report-reader-description" data-report-description>{esc(first['description'])}</p>
      <iframe class="home-report-pdf" src="{esc(first['file'])}#view=FitH" title="{esc(first['label'])}, PDF van {first['pages']} pagina’s" loading="lazy" data-report-frame data-report-id="{esc(first['id'])}"></iframe>
      <p class="home-report-reader-note">Wordt de PDF niet weergegeven? Open het rapport in een apart venster of download het bestand. Deze documenten zijn voorbeelden; de inhoud van jouw analyse wordt afgestemd op je vraagstuk.</p>
    </div>
  </div>
  <div class="home-report-reader-files" data-report-files><p>Alle voorbeeldrapporten openen of downloaden:</p><ul>{''.join(files)}</ul></div>
</section>'''

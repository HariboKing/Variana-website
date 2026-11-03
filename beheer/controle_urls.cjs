'use strict';

// node beheer/controle_urls.cjs — routing behavior without browser dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createPageUrlResolver } = require('../assets/js/page-urls.js');
const routes = {
  'software.html': '/software/',
  'index.html': '/',
  'analyse.html': '/analyse/',
  'blauwdruk.html': '/blauwdruk/',
  'contact.html': '/contact/',
  'voorbeelden.html': '/#voorbeeldrapport'
};
const web = createPageUrlResolver(routes, 'https://variana.nl/');
const file = createPageUrlResolver(routes, 'file:///C:/Variana%20voorbeeld/');
const cases = [
  ['index.html', '/'],
  ['index.html?bron=mail#opdrachten', '/?bron=mail#opdrachten'],
  ['software.html', '/software/'],
  ['./software.html?x=1#werkomgeving', '/software/?x=1#werkomgeving'],
  ['../blauwdruk.html#systeem', '/blauwdruk/#systeem'],
  ['../../contact.html?onderwerp=preview', '/contact/?onderwerp=preview'],
  ['/analyse.html?x=a%2Fb&y=1#uitwerking', '/analyse/?x=a%2Fb&y=1#uitwerking'],
  ['voorbeelden.html?bron=analyse#concurrentieanalyse', '/?bron=analyse#concurrentieanalyse'],
  ['../voorbeelden.html?bron=analyse#omgevingsanalyse', '/?bron=analyse#omgevingsanalyse'],
  ['/voorbeelden.html#rapport-bekijken', '/#concurrentieanalyse'],
  ['voorbeelden.html#onbekend', '/#voorbeeldrapport'],
  ['/voorbeelden/', '/voorbeelden/'],
  ['/voorbeelden', '/voorbeelden'],
  ['/voorbeelden/index.html?bron=oud#rapport-bekijken', '/voorbeelden/index.html?bron=oud#rapport-bekijken'],
  ['/software/', '/software/'],
  ['/software', '/software/'],
  ['/software/index.html?x=1#werkomgeving', '/software/?x=1#werkomgeving']
];
for (const [input, expected] of cases) assert.equal(web(input), expected, input);
const unchanged = [
  '#onderzoek', '?vraag=overzicht', 'mailto:info@variana.nl',
  'https://example.org/software.html', 'https://variana.nl/software.html',
  '//example.org/analyse.html', 'data:text/plain,software.html',
  '/andere-map/analyse.html', 'onbekend/analyse.html',
  'assets/images/software/scherm.png', 'software.html.bak',
  'onbekend.html', '/onbekend/', '/software/extra/'
];
for (const input of unchanged) {
  assert.equal(web(input), input, input);
  assert.equal(file(input), input, input);
}
const offlineCases = [
  ['/software/', 'file:///C:/Variana%20voorbeeld/software.html'],
  ['../contact.html?onderwerp=preview#contact-form', 'file:///C:/Variana%20voorbeeld/contact.html?onderwerp=preview#contact-form'],
  ['/#opdrachten', 'file:///C:/Variana%20voorbeeld/index.html#opdrachten'],
  ['voorbeelden.html?bron=analyse#concurrentieanalyse', 'file:///C:/Variana%20voorbeeld/index.html?bron=analyse#concurrentieanalyse'],
  ['voorbeelden.html?bron=analyse#omgevingsanalyse', 'file:///C:/Variana%20voorbeeld/index.html?bron=analyse#omgevingsanalyse'],
  ['/voorbeelden.html#rapport-bekijken', 'file:///C:/Variana%20voorbeeld/index.html#concurrentieanalyse'],
  ['voorbeelden.html#onbekend', 'file:///C:/Variana%20voorbeeld/index.html#voorbeeldrapport'],
  ['index.html#omgevingsanalyse', 'file:///C:/Variana%20voorbeeld/index.html#omgevingsanalyse'],
  ['/#concurrentieanalyse', 'file:///C:/Variana%20voorbeeld/index.html#concurrentieanalyse'],
  ['/software/index.html', 'file:///C:/Variana%20voorbeeld/software.html']
];
for (const [input, expected] of offlineCases) assert.equal(file(input), expected, input);
assert.equal(createPageUrlResolver({ 'software.html': 'https://evil.test/' }, 'https://variana.nl/')('software.html'), 'software.html');
assert.equal(createPageUrlResolver({ '../evil.html': '/evil/' }, 'https://variana.nl/')('../evil.html'), '../evil.html');
assert.equal(web(null), null);

// Historical builds can retain their prior assignments alias independently.
const legacyRoutes = { ...routes, 'voorbeelden.html': '/#opdrachten' };
const legacyWeb = createPageUrlResolver(legacyRoutes, 'https://variana.nl/');
const legacyFile = createPageUrlResolver(legacyRoutes, 'file:///C:/Variana%20voorbeeld/');
assert.equal(legacyWeb('voorbeelden.html?bron=oud#werkomgeving'), '/?bron=oud#opdrachten');
assert.equal(legacyFile('voorbeelden.html?bron=oud#werkomgeving'), 'file:///C:/Variana%20voorbeeld/index.html?bron=oud#opdrachten');
assert.equal(legacyFile('/#opdrachten'), 'file:///C:/Variana%20voorbeeld/index.html#opdrachten');
// Retired page URLs are handled by their compatibility document. These cases
// execute only that generated redirect script, without a browser or network.
function redirectTarget(documentPath, input) {
  const document = fs.readFileSync(path.join(__dirname, '..', documentPath), 'utf8');
  const script = document.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script, `Build the compatibility page before testing ${documentPath}`);
  const source = new URL(input);
  let target;
  const location = { protocol: source.protocol, search: source.search, hash: source.hash,
    replace(value) { target = new URL(value, input).href; } };
  vm.runInNewContext(script[1], { location });
  return target;
}
const redirectCases = [
  ['voorbeelden.html', 'https://variana.nl/voorbeelden.html', 'https://variana.nl/#voorbeeldrapport'],
  ['voorbeelden.html', 'https://variana.nl/voorbeelden.html?bron=oud#omgevingsanalyse', 'https://variana.nl/?bron=oud#omgevingsanalyse'],
  ['voorbeelden/index.html', 'https://variana.nl/voorbeelden/#concurrentieanalyse', 'https://variana.nl/#concurrentieanalyse'],
  ['voorbeelden/index.html', 'https://variana.nl/voorbeelden/index.html?x=1#rapport-bekijken', 'https://variana.nl/?x=1#concurrentieanalyse'],
  ['voorbeelden/index.html', 'https://variana.nl/voorbeelden/?x=1#onbekend', 'https://variana.nl/?x=1#voorbeeldrapport'],
  ['voorbeelden.html', 'file:///C:/Variana%20voorbeeld/voorbeelden.html?bron=oud#omgevingsanalyse', 'file:///C:/Variana%20voorbeeld/index.html?bron=oud#omgevingsanalyse'],
  ['voorbeelden/index.html', 'file:///C:/Variana%20voorbeeld/voorbeelden/index.html#concurrentieanalyse', 'file:///C:/Variana%20voorbeeld/index.html#concurrentieanalyse'],
  ['voorbeelden/index.html', 'file:///C:/Variana%20voorbeeld/voorbeelden/index.html', 'file:///C:/Variana%20voorbeeld/index.html#voorbeeldrapport']
];
for (const [documentPath, input, expected] of redirectCases) assert.equal(redirectTarget(documentPath, input), expected, input);
console.log(`${cases.length + unchanged.length * 2 + offlineCases.length + 6 + redirectCases.length} URL checks passed: clean routes, homepage reports, compatible old report links, query/hash and offline files.`);

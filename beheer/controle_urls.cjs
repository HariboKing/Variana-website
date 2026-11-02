'use strict';

// node beheer/controle_urls.cjs — routing behavior without browser dependencies.
const assert = require('node:assert/strict');
const { createPageUrlResolver } = require('../assets/js/page-urls.js');
const routes = {
  'software.html': '/software/',
  'index.html': '/',
  'analyse.html': '/analyse/',
  'blauwdruk.html': '/blauwdruk/',
  'contact.html': '/contact/',
  'voorbeelden.html': '/voorbeelden/'
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
  ['voorbeelden.html?bron=analyse#concurrentieanalyse', '/voorbeelden/?bron=analyse#concurrentieanalyse'],
  ['/voorbeelden.html#rapport-bekijken', '/voorbeelden/#rapport-bekijken'],
  ['/voorbeelden/', '/voorbeelden/'],
  ['/voorbeelden', '/voorbeelden/'],
  ['/voorbeelden/index.html?bron=oud#rapport-bekijken', '/voorbeelden/?bron=oud#rapport-bekijken'],
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
  ['voorbeelden.html?bron=analyse#concurrentieanalyse', 'file:///C:/Variana%20voorbeeld/voorbeelden.html?bron=analyse#concurrentieanalyse'],
  ['/voorbeelden/#rapport-bekijken', 'file:///C:/Variana%20voorbeeld/voorbeelden.html#rapport-bekijken'],
  ['/voorbeelden/index.html?bron=oud#rapport-bekijken', 'file:///C:/Variana%20voorbeeld/voorbeelden.html?bron=oud#rapport-bekijken'],
  ['/software/index.html', 'file:///C:/Variana%20voorbeeld/software.html']
];
for (const [input, expected] of offlineCases) assert.equal(file(input), expected, input);
assert.equal(createPageUrlResolver({ 'software.html': 'https://evil.test/' }, 'https://variana.nl/')('software.html'), 'software.html');
assert.equal(createPageUrlResolver({ '../evil.html': '/evil/' }, 'https://variana.nl/')('../evil.html'), '../evil.html');
assert.equal(web(null), null);

// Archived builds without the new page can continue to use the former alias.
const legacyRoutes = { ...routes, 'voorbeelden.html': '/#opdrachten' };
const legacyWeb = createPageUrlResolver(legacyRoutes, 'https://variana.nl/');
const legacyFile = createPageUrlResolver(legacyRoutes, 'file:///C:/Variana%20voorbeeld/');
assert.equal(legacyWeb('voorbeelden.html?bron=oud#werkomgeving'), '/?bron=oud#opdrachten');
assert.equal(legacyFile('voorbeelden.html?bron=oud#werkomgeving'), 'file:///C:/Variana%20voorbeeld/index.html?bron=oud#opdrachten');
assert.equal(legacyFile('/#opdrachten'), 'file:///C:/Variana%20voorbeeld/index.html#opdrachten');
console.log(`${cases.length + unchanged.length * 2 + offlineCases.length + 6} URL checks passed: clean routes, report sections, preserved query/hash, legacy aliases, unknown links and offline files.`);

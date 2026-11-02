'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { resolveSelection, reportExampleIntro } = require('../assets/js/application-matcher.js');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'toepassingsroutes.json'), 'utf8'));
let cases = 0;
let relevant = 0;
function check(input, expected) {
  const selection = resolveSelection(data, input);
  const intro = reportExampleIntro(selection);
  assert.equal(Boolean(intro), expected, JSON.stringify(input));
  if (expected) relevant++;
  cases++;
}
for (const organization of data.organizations) {
  check({ organization: organization.id, routeId: 'inzicht' }, true);
  check({ organization: organization.id, routeId: 'overzicht' }, false);
  for (const task of data.tasks.filter(task => task.organizations.includes(organization.id))) {
    check({ organization: organization.id, routeId: 'uitwerking', goalId: task.goalId, taskId: task.id }, task.id === 'scenarios');
  }
}
for (const input of [{}, { organization: 'bedrijf' }, { organization: 'overheid', routeId: 'uitwerking' },
  { organization: 'bedrijf', routeId: 'uitwerking', goalId: 'strategie' }]) check(input, false);
assert.equal(relevant, 4);
console.log(`${cases} example relevance cases passed: analyses and alternative comparisons only, with incomplete and unrelated selections hidden.`);

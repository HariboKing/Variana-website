'use strict';

// Run with node beheer/controle_routes.cjs. No packages or browser needed.
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'toepassingsroutes.json'), 'utf8'));
const { resolveSelection } = require('../assets/js/application-matcher.js');
const resolve = input => resolveSelection(data, input);
const forbidden = ['financiering', 'pitchdeck', 'memorandum', 'targetlist', 'investering'];
const commercialSteps = ['product', 'marketing'];
let cases = 0;

for (const organization of ['bedrijf', 'overheid']) {
  for (const routeId of ['inzicht', 'overzicht']) {
    const result = resolve({ organization, routeId });
    assert(result.complete);
    assert.equal(result.outputIds.length, 1);
    assert.equal(result.result.id, routeId === 'inzicht' ? 'analyses' : 'blauwdruk');
    assert.equal(result.steps.some(item => item.id === 'blauwdruk'), routeId === 'overzicht');
    if (routeId === 'overzicht') assert.equal(result.steps.at(-1).id, 'blauwdruk');
    if (organization === 'overheid' || routeId === 'inzicht') {
      assert(!result.steps.some(item => commercialSteps.includes(item.id)));
    } else {
      assert(commercialSteps.every(id => result.steps.some(item => item.id === id)));
    }
    cases++;
  }
  for (const task of data.tasks.filter(item => item.organizations.includes(organization))) {
    const result = resolve({ organization, routeId: 'uitwerking', goalId: task.goalId, taskId: task.id });
    assert(result.complete, `${organization}/${task.id} must resolve`);
    assert.equal(result.result.id, task.id);
    assert.deepEqual(result.outputIds, ['specialistische-modules']);
    assert(result.steps.length > 0);
    assert.equal(result.steps.at(-1).id, 'blauwdruk', `${organization}/${task.id} must first complete the blueprint`);
    assert.equal(result.steps.filter(item => item.id === 'blauwdruk').length, 1);
    if (organization === 'overheid') {
      assert(!forbidden.includes(result.result.id));
      assert(!result.steps.some(item => item.businessOnly || commercialSteps.includes(item.id)));
    }
    cases++;
  }
}

// A prior business choice, even if supplied in invalid state, cannot offer a forbidden government output.
for (const goal of data.goals) {
  for (const taskId of forbidden) {
    const result = resolve({ organization: 'overheid', routeId: 'uitwerking', goalId: goal.id, taskId });
    assert(!result.tasks.some(item => forbidden.includes(item.id)));
    assert(!result.result || !forbidden.includes(result.result.id));
    assert(!result.steps.some(item => item.businessOnly || commercialSteps.includes(item.id)));
    cases++;
  }
}

// Incomplete/unknown choices must not fall back to a company route or invented specialist output.
for (const state of [
  {}, { organization: 'bedrijf' }, { organization: 'onbekend', routeId: 'overzicht' },
  { organization: 'overheid', routeId: 'niet-bestaand' },
  { organization: 'bedrijf', routeId: 'uitwerking' },
  { organization: 'bedrijf', routeId: 'uitwerking', goalId: 'strategie' },
  { organization: 'overheid', routeId: 'uitwerking', goalId: 'financiering', taskId: 'pitchdeck' },
  { organization: 'bedrijf', routeId: 'uitwerking', goalId: 'beoordeling', taskId: 'memorandum' }
]) {
  const result = resolve(state);
  assert.equal(result.complete, false);
  assert.equal(result.result, null);
  assert.equal(result.steps.length, 0);
  assert.deepEqual(result.outputIds, []);
  cases++;
}

// Four specialist directions exist, with the commercial directions excluded for government.
assert.deepEqual(resolve({ organization: 'bedrijf' }).goals.map(item => item.id), ['strategie', 'marketing', 'financiering', 'beoordeling']);
assert.deepEqual(resolve({ organization: 'overheid' }).goals.map(item => item.id), ['strategie', 'beoordeling']);
const overview = resolve({ organization: 'bedrijf', routeId: 'overzicht', goalId: 'financiering', taskId: 'memorandum' });
assert.equal(overview.goal, null);
assert.equal(overview.result.id, 'blauwdruk');
cases += 2;
console.log(`${cases} routing cases passed: allowed outputs, government exclusions and a blueprint before every specialist output.`);

import fs from 'node:fs';

function fail(errors) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

const file = process.argv[2];
if (!file) fail(['usage: node self-check.mjs <eval-preflight.json>']);
const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const auth = payload.authorization ?? {};
const commands = payload.commands ?? {};
const negative = payload.negative_task_condition ?? {};

for (const key of ['learner_owned_credentials', 'target_agent_authorized', 'cost_permission_acknowledged']) {
  if (auth[key] !== true) errors.push(`${key} must be true before live eval`);
}
if (auth.secret_values_recorded === true) errors.push('do not record API keys, tokens, or secret values');
if (!String(commands.server ?? '').includes('--filter example-vitest-evals dev')) errors.push('server command should use the grounded package selector and dev script');
if (!String(commands.eval ?? '').includes('--filter example-vitest-evals evals')) errors.push('eval command should use the grounded package selector and evals script');
if (!String(payload.target?.FLUE_AGENT_URL ?? '').startsWith('http')) errors.push('FLUE_AGENT_URL must be recorded');
if (!Array.isArray(payload.static_source_basis) || payload.static_source_basis.length < 4) errors.push('static source basis should list README, package, config, harness/eval source');
if (!String(negative.description ?? '').trim()) errors.push('negative task condition description required');
if (!String(negative.expected_structured_outcome ?? '').trim() && !String(negative.expected_tool_usage ?? '').trim()) {
  errors.push('negative case must define structured outcome or expected tool usage, not fixed model prose only');
}

if (errors.length) fail(errors);
console.log(JSON.stringify({
  ok: true,
  checked: ['authorization preflight', 'grounded commands', 'target URL', 'negative structured condition'],
  limitation: 'This does not start a server, run vitest, call a model, or prove eval success.'
}, null, 2));

import fs from 'node:fs';

function fail(errors) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

const file = process.argv[2];
if (!file) fail(['usage: node self-check.mjs <activation-observation.json>']);
const payload = JSON.parse(fs.readFileSync(file, 'utf8'));
const errors = [];
const auth = payload.authorization ?? {};
const evidence = payload.evidence ?? {};

if (auth.learner_owned_credentials !== true) errors.push('learner_owned_credentials must be true for live execution records');
if (auth.secret_values_recorded === true) errors.push('do not record API keys, tokens, or secret values');
if (auth.cost_permission_acknowledged !== true) errors.push('cost_permission_acknowledged must be true for live execution');
if (!String(payload.command ?? '').includes('flue run')) errors.push('command should record the flue run invocation grounded in the imported-skill README');

const hasTrace = String(evidence.trace_status ?? '') !== 'not_observed' && String(evidence.tool_or_event_evidence ?? '').trim().length > 20;
const hasNegative = String(evidence.negative_resource_case ?? '').trim().length > 20;
const hasBeforeAfter = String(evidence.before_output_summary ?? '').trim().length > 20 && String(evidence.after_output_summary ?? '').trim().length > 20;
if (!hasTrace && !hasNegative) errors.push('record concrete tool/event evidence if available, or a meaningful negative resource case');
if (!hasBeforeAfter && payload.result_status !== 'not_run') errors.push('live result records should summarize before and after observations');

if (errors.length) fail(errors);
console.log(JSON.stringify({
  ok: true,
  checked: ['learner-owned authorization', 'no secret values', 'evidence beyond model self-claim'],
  limitation: 'This does not verify that Flue runtime or a model actually ran.'
}, null, 2));

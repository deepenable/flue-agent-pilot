import fs from 'node:fs';

function fail(errors) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

const file = process.argv[2];
if (!file) fail(['usage: node self-check.mjs <boundary-decision.json>']);

let payload;
try {
  payload = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (error) {
  fail([`cannot read JSON: ${error.message}`]);
}

const decisions = Array.isArray(payload.decisions) ? payload.decisions : [];
const byId = new Map(decisions.map((entry) => [entry.scenario_id, entry]));
const errors = [];

for (const id of ['trusted-native-build', 'untrusted-text-transform', 'durable-issue-workspace']) {
  if (!byId.has(id)) errors.push(`missing decision for scenario: ${id}`);
}

const native = byId.get('trusted-native-build');
if (native) {
  if (native.sandbox === 'virtual') errors.push('native process scenario should not be virtual');
  if (native.sandbox !== 'local') errors.push('trusted-native-build should select local unless the scenario adds provider isolation requirements');
  if (!/native|real process|真实|process/i.test(native.rationale ?? '')) errors.push('trusted-native-build rationale should mention native/real processes');
}

const untrusted = byId.get('untrusted-text-transform');
if (untrusted) {
  if (untrusted.sandbox === 'local') errors.push('unsafe boundary: untrusted multi-tenant work must not use local');
  if (!['virtual', 'remote'].includes(untrusted.sandbox)) errors.push('untrusted-text-transform should select virtual or remote');
  if (!/isolation|隔离|untrusted|tenant/i.test(untrusted.rationale ?? '')) errors.push('untrusted-text-transform rationale should mention isolation or tenant risk');
}

const durable = byId.get('durable-issue-workspace');
if (durable) {
  if (durable.sandbox !== 'remote') errors.push('durable-issue-workspace should select remote');
  const text = JSON.stringify(durable);
  if (!/owner|ownership|cleanup|cancellation|取消|清理|lifecycle/i.test(text)) {
    errors.push('remote ownership missing: mention owner/lifecycle/cleanup/cancellation');
  }
}

for (const decision of decisions) {
  if (!decision.rationale || decision.rationale.trim().length < 30) {
    errors.push(`rationale too short for ${decision.scenario_id}`);
  }
  const whyNot = decision.why_not && typeof decision.why_not === 'object' ? Object.values(decision.why_not) : [];
  if (!whyNot.some((value) => typeof value === 'string' && value.trim().length > 20)) {
    errors.push(`at least one why_not reason required for ${decision.scenario_id}`);
  }
  if (!Array.isArray(decision.risk_controls) || decision.risk_controls.length === 0) {
    errors.push(`risk_controls required for ${decision.scenario_id}`);
  }
}

if (errors.length) fail(errors);

console.log(JSON.stringify({
  ok: true,
  checked: ['scenario coverage', 'negative unsuitable boundary', 'why_not', 'risk_controls'],
  limitation: 'This structural check does not judge the full ADR reasoning quality.'
}, null, 2));

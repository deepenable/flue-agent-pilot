import fs from 'node:fs';
import path from 'node:path';

const requiredNodes = new Set([
  'static_import',
  'use_skill_mount',
  'available_skills',
  'activate_skill',
  'supporting_file',
]);

const forbiddenBoundaryClaims = [
  /skill\s+grants\s+(shell|file)/i,
  /skill\s+.*full\s+file\s+access/i,
  /useSkill\(.*\)\s+proves\s+.*activated/i,
];

function fail(messages) {
  console.error(JSON.stringify({ ok: false, errors: messages }, null, 2));
  process.exit(1);
}

const answerPath = process.argv[2];
if (!answerPath) fail(['usage: node self-check.mjs <answer.json>']);

let answer;
try {
  answer = JSON.parse(fs.readFileSync(answerPath, 'utf8'));
} catch (error) {
  fail([`cannot read JSON: ${error.message}`]);
}

const errors = [];
const nodes = Array.isArray(answer.flow_nodes) ? answer.flow_nodes : [];
const nodeTypes = new Set(nodes.map((node) => node?.type).filter(Boolean));
for (const required of requiredNodes) {
  if (!nodeTypes.has(required)) errors.push(`Missing required flow node: ${required}`);
}

const anchors = Array.isArray(answer.source_anchors) ? answer.source_anchors : [];
const sourceAnchors = anchors.filter((entry) => {
  if (typeof entry !== 'string') return false;
  return entry.replaceAll('\\', '/').startsWith('source/');
});
if (sourceAnchors.length < 3) errors.push('Need at least 3 source anchors under source/. Windows separators are accepted.');
if (anchors.some((entry) => typeof entry === 'string' && /checkpoint|knowledge|ku-|authoring-record/i.test(entry))) {
  errors.push('Use ordinary source paths, not course-authoring record ids.');
}

const serialized = JSON.stringify(answer);
if (!/CHECKLIST\.txt|supporting/i.test(serialized)) {
  errors.push('Answer should mention the supporting file relationship.');
}
for (const pattern of forbiddenBoundaryClaims) {
  if (pattern.test(serialized)) errors.push(`Forbidden overclaim matched: ${pattern}`);
}

if (typeof answer.human_completion_criteria !== 'string' || answer.human_completion_criteria.trim().length < 40) {
  errors.push('human_completion_criteria should describe a human-readable completion standard.');
}

if (errors.length) fail(errors);

console.log(JSON.stringify({
  ok: true,
  checked: {
    required_flow_nodes: [...requiredNodes],
    source_anchor_count: sourceAnchors.length,
    limitation: 'This structural check does not certify semantic correctness or live skill activation.'
  }
}, null, 2));

import fs from 'node:fs';
import path from 'node:path';

function fail(errors) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

const skillDir = process.argv[2];
if (!skillDir) fail(['usage: node self-check.mjs <skill-directory>']);

const skillPath = path.join(skillDir, 'SKILL.md');
if (!fs.existsSync(skillPath)) fail([`missing SKILL.md at ${skillPath}`]);

const text = fs.readFileSync(skillPath, 'utf8');
const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!match) fail(['SKILL.md must start with YAML-style frontmatter delimited by ---']);

const frontmatter = Object.fromEntries(
  match[1]
    .split(/\r?\n/)
    .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
    .filter(Boolean)
    .map((parts) => [parts[1], parts[2].trim()])
);
const body = match[2];
const errors = [];
const dirName = path.basename(path.resolve(skillDir));
const name = frontmatter.name;
const description = frontmatter.description;
const skillNamePattern = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;
const requiredSupportingFiles = ['CHECKLIST.txt', 'STYLE.txt'];

if (!name) errors.push('frontmatter name is required');
else {
  if (!skillNamePattern.test(name) || name.includes('--')) errors.push(`invalid skill name: ${name}`);
  if (name !== dirName) errors.push(`name must match directory name: frontmatter=${name}, directory=${dirName}`);
}
if (!description) errors.push('frontmatter description is required and must be non-empty');
if (description && description.length > 1024) errors.push('description must be at most 1024 characters');

const referencedFiles = [...new Set([...body.matchAll(/`([^`]+\.(?:txt|md|json|yaml|yml))`/gi)].map((entry) => entry[1]))];
for (const relative of referencedFiles) {
  if (relative.includes('/') || relative.includes('\\') || relative.startsWith('.')) {
    errors.push(`supporting file reference must be a same-directory simple filename in this lab: ${relative}`);
    continue;
  }
  const target = path.join(skillDir, relative);
  if (!fs.existsSync(target)) errors.push(`referenced supporting file missing: ${relative}`);
  if (path.dirname(path.resolve(target)) !== path.resolve(skillDir)) {
    errors.push(`supporting file escapes skill directory: ${relative}`);
  }
}
for (const required of requiredSupportingFiles) {
  if (!referencedFiles.includes(required)) {
    errors.push(`SKILL.md must reference required supporting file: ${required}`);
  }
  if (!fs.existsSync(path.join(skillDir, required))) {
    errors.push(`required supporting file missing: ${required}`);
  }
}

if (errors.length) fail(errors);

console.log(JSON.stringify({
  ok: true,
  skill: { name, description },
  files: ['SKILL.md', ...requiredSupportingFiles, ...referencedFiles.filter((file) => !requiredSupportingFiles.includes(file))],
  limitation: 'Static self-check only; it does not run Flue, Vite, pnpm, or a model.'
}, null, 2));

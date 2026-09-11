# 参考链接

> Lab 适配说明（2026-09-11）：将本地许可附件链接改为平台内完整许可章节，固定版源码引用保持不变。

课程主体的 Flue 链接指向固定快照 `cd80df610c39643cc43c06d1cf47132ffc604d55`，用于保持源码事实稳定。另有一条明确标注的当前公开文档证据，不能反向改写固定快照的历史事实。

## Flue 固定版文档与源码

- Agents guide: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/building-agents.md>
- Agent Hooks guide: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/agent-hooks.md>
- Skills guide: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/skills.md>
- Tools guide: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/tools.md>
- Sandboxes guide: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/sandboxes.md>
- `useSkill` hook: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/packages/runtime/src/hooks/use-skill.ts>
- `useSandbox` hook: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/packages/runtime/src/hooks/use-sandbox.ts>
- `skill-frontmatter.ts`: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/packages/runtime/src/skill-frontmatter.ts>
- Tools implementation: <https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/packages/runtime/src/tool.ts>
- Imported skill example: <https://github.com/withastro/flue/tree/cd80df610c39643cc43c06d1cf47132ffc604d55/examples/imported-skill>
- Vitest evals example: <https://github.com/withastro/flue/tree/cd80df610c39643cc43c06d1cf47132ffc604d55/examples/vitest-evals>

## 外部规范或工具

- Agent Skills specification: <https://agentskills.io/specification>
- Valibot: <https://valibot.dev/>
- Vitest: <https://vitest.dev/>
- vitest-evals: <https://github.com/vitest-dev/vitest-evals>
- Apache License 2.0 text: <https://www.apache.org/licenses/LICENSE-2.0>
- Bundled Apache-2.0 text copied from the pinned Flue source: [完整许可正文](./apache-2.0.md)
- Learner package third-party notices: [`../THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md)

## 当前公开文档（WebIQ，独立于固定快照）

- Current public Skills guide: <https://github.com/withastro/flue/blob/main/apps/docs/src/content/docs/guide/skills.md>

WebIQ 于 2026-09-11 获取该公开官方仓库页面。页面正文写有 `lastReviewedAt: 2026-07-21`，并继续描述 progressive disclosure、`useSkill`/`activate_skill`、`.agents/skills/` workspace discovery，以及 `allowed-tools` “accepted, not enforced”。提供方给出了抓取时间但没有 `lastUpdatedAt`；因此这里只说明“检索时页面如此表述”，不把抓取时间当发布日期，也不声称运行时已验证。

# Flue Agent 中文教材

本教材面向两类读者：想修改和构建 Flue agent 的 **Builder**，以及需要解释 harness、skill、tool、state 与 sandbox 边界的 **Architect**。教材基于固定源码快照 `withastro/flue@cd80df610c39643cc43c06d1cf47132ffc604d55`，只把本地固定版源码和文档当作事实来源。

## 如何阅读

Builder 建议按章节顺序阅读，并在每章自查题后写下自己的代码追踪笔记。Architect 可以先读每章的图、对比表和“给 Architect 的讨论提示”，再回到 worked example 检查结论是否有源码锚点。

| 章节 | 解决的学习问题 | 主要产物 |
| --- | --- | --- |
| [01 Agent harness](./01-agent-harness.md) | agent-native harness 与固定脚本流水线有什么不同？ | 技能与资源流图、静态/运行时边界说明 |
| [02 Skills and context](./02-skills-and-context.md) | skill 目录、frontmatter 与 progressive disclosure 如何协作？ | skill contract 修复说明、旧 README 冲突判断 |
| [03 Tools and sandboxes](./03-tools-and-sandboxes.md) | tool 能力和 sandbox 隔离边界如何选择？ | 三场景边界选择表、ADR 草稿 |
| [04 Evaluation and observability](./04-evaluation-and-observability.md) | 如何评估 agent 行为而不夸大未执行结果？ | eval preflight note、治理说明 |

## 范围边界

教材中的命令、代码和路径是学习材料，不代表这些命令已经在你的环境中执行过真实 build、真实 model call、真实 skill activation 或真实 eval。核心实验路径是 `../lab-manual/README.md`、`../lab-manual/01-trace-an-agent.md`、`../lab-manual/02-build-a-skill.md`、`../lab-manual/03-choose-capability-boundaries.md`；可选实作路径是 `../lab-manual/optional/04-activate-and-observe.md`、`../lab-manual/optional/05-evaluate-an-agent.md`。L4/L5 要求学习者使用自己的模型账户和目标环境授权。

## 配套资源

- [术语表](../resources/glossary.md)
- [参考链接](../resources/references.md)
- [延伸阅读](../resources/further-reading.md)
- [第三方来源说明](../THIRD_PARTY_NOTICES.md)

下一步：从 [第 1 章](./01-agent-harness.md) 开始建立共同语言。

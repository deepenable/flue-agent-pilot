# Flue Agent 学习试点说明

这是一门面向 **TypeScript/Node.js 开发者** 与 **技术架构师** 的 Flue 入门课程。课程目标不是带你背 API 清单，而是帮助你读懂一个 agent-native 工程在固定源码快照中如何组织技能、上下文、工具与 sandbox，并把这些判断转化为能复查的图示、说明和实验决策。

本课程当前基于 **withastro/flue** 的固定版源码与文档快照 `cd80df610c39643cc43c06d1cf47132ffc604d55` 设计，课程包版本为 `0.1.1`。环境与能力边界说明来自该快照下的 manifest、guide 与 example 源码；它们说明了应满足的条件，但 **不等于** 你已经在自己的环境中执行过真实技能激活、真实 agent eval 或任何联网运行。

## 这门课适合谁

### Builder 路线

适合已经会读 TypeScript、Node.js 与 pnpm 脚本，想学会下面这些事情的开发者：

- 看懂 `SKILL.md` 如何被导入、挂载并进入代理的技能目录。
- 根据文档与源码判断什么时候该用 skills，什么时候问题其实出在 sandbox 能力边界。
- 在一次性实验副本中实际修改、打包并构建一个 skill，同时把命令、负向控制和证据边界记录清楚。

### Architect 路线

适合需要向团队解释系统边界、评审方案或写 ADR 的技术负责人：

- 说明 harness、skill、tool、sandbox 各自负责什么。
- 比较 virtual、local、remote sandbox 的能力与风险。
- 为课程、平台或团队写出评测边界和授权前提说明。

## 已知前置条件

1. 能阅读 TypeScript 导入、简单 hook 调用和 pnpm 脚本。
2. 愿意以固定版源码为准，不把旧 README 说法或未执行的示例命令当成已验证事实。
3. 如果你只学习核心章节与 L1-L3，不需要真实模型账户；这些核心实验已经写入 `lab-manual/01-trace-an-agent.md`、`lab-manual/02-build-a-skill.md`、`lab-manual/03-choose-capability-boundaries.md`，配套文件放在 `lab-files/lab-01`、`lab-files/lab-02`、`lab-files/lab-03`。
4. 如果你打算做 **L4 技能激活** 或 **L5 agent eval**，必须使用你自己的模型账户、API Key 和目标环境授权。

## 版本与环境范围

- 固定版仓库：`withastro/flue@cd80df610c39643cc43c06d1cf47132ffc604d55`
- 课程包版本：`0.1.1`
- 当前课程包状态：已完成本地 baseline 发布验证。发布方已在 Windows、Node `22.22.2`、pnpm `11.1.1` 与 Git Bash 环境执行 L1/L3 的 good 与 intended-negative 静态自查，以及 L2 的 good、intended-negative 和 repaired 依赖感知 build。该记录只说明发布基线通过，不承诺学习者环境相同，也不表示可选 L4/L5、Flue 模型或云端运行已经执行。
- 语言：中文
- 清单层面的环境要求：固定版 root manifest 说明 **Node >= 22**；如需自行执行仓库脚本，还要准备 **pnpm 11**。
- 本课程当前交付：学习者 README、syllabus、四章教材、核心/可选实验手册、公开实验配套文件与教材参考资源。

如果你想先看固定版来源，可以从下面这些官方或固定版链接开始：

- Flue skills guide（固定版源码路径）：<https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/skills.md>
- Flue sandboxes guide（固定版源码路径）：<https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/apps/docs/src/content/docs/guide/sandboxes.md>
- imported-skill example（固定版源码路径）：<https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/examples/imported-skill/src/agents/with-imported-skill.ts>
- vitest-evals example README（固定版源码路径）：<https://github.com/withastro/flue/blob/cd80df610c39643cc43c06d1cf47132ffc604d55/examples/vitest-evals/README.md>

## 从哪里开始

解压后，**当前这个包含 `README.md`、`syllabus.md`、`lab-files` 与 `lab-manual` 的目录就是课程包根目录**。从这里设置 `$CourseRoot`。Flue 源码不是课程包的一部分；按[实验手册入口](./lab-manual/README.md)把学习者自己取得的固定版公开 checkout 指给 `$SourceRoot`，并确保它位于课程包之外。

- 如果你是 **Builder**，请先读 [`syllabus.md`](./syllabus.md) 里的 Builder 关注点，再读 [`textbook/01-agent-harness.md`](./textbook/01-agent-harness.md)，随后使用 [`lab-manual/01-trace-an-agent.md`](./lab-manual/01-trace-an-agent.md)、[`lab-manual/02-build-a-skill.md`](./lab-manual/02-build-a-skill.md)、[`lab-manual/03-choose-capability-boundaries.md`](./lab-manual/03-choose-capability-boundaries.md)。
- 如果你是 **Architect**，先看 [`syllabus.md`](./syllabus.md) 中每章的 Architect 任务，再从 [`textbook/01-agent-harness.md`](./textbook/01-agent-harness.md) 的职责边界图进入。
- 如果你只关心环境与可选实作边界，请先读 syllabus 中 M4 与 L4/L5 的说明。

教材入口：[`textbook/README.md`](./textbook/README.md)。术语表、参考链接和延伸阅读在 [`resources/`](./resources/) 下；第三方来源说明使用包根目录的 [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md)，Apache-2.0 文本随资源一并提供。

## 关于可选实作

L1-L3 是核心离线实验。L1/L3 先用 Node 标准库 self-check 完成初学者静态热身；L2 的 Builder 路线要求在课程包外的一次性固定源码 workspace 中实际修改、打包并执行文档给出的依赖感知 build，而不是只写计划。L4 和 L5 是可选扩展：

- **L4**：在你自己的授权环境里观察真实技能激活。
- **L5**：在你自己的授权环境里运行真实 agent eval。

实验文件结构如下；核心手册和可选手册已有正文，公开 self-check 只证明结构/边界，不证明 live Flue runtime：

- `lab-manual/README.md`
- `lab-manual/01-trace-an-agent.md`
- `lab-manual/02-build-a-skill.md`
- `lab-manual/03-choose-capability-boundaries.md`
- `lab-manual/optional/04-activate-and-observe.md`
- `lab-manual/optional/05-evaluate-an-agent.md`
- `lab-files/lab-01`
- `lab-files/lab-02`
- `lab-files/lab-03`
- `lab-files/optional`

这两项练习都依赖学习者自备账户与授权。本课程会说明前置条件和观察重点，但不会冒充已经替你跑通过程。

# Flue Agent 学习试点大纲

## 课程总目标

完成本课程后，你应当能够：

1. 根据固定版 Flue 文档与源码，说明技能、上下文、工具与 sandbox 的职责边界。
2. 把一个学习任务拆成可验证目标：动作、条件、成功标准和评估方式都能写清楚。
3. 区分 **静态证据**、**固定版源码结论** 和 **需要学习者自备授权才能验证的运行时结论**。

## 章节顺序

### M1 Agent-native Harness Basics

本章建立共同语言：agent、harness、skills catalog、sandbox、subagent 分别是什么，谁负责把能力暴露给模型，谁只负责承载执行环境。

- **教材**：[`textbook/01-agent-harness.md`](./textbook/01-agent-harness.md)
- **Builder 关注点**：从真实示例追踪 `SKILL.md` 导入、`useSkill(...)` 挂载与 `activate_skill` 的出现位置。
- **Architect 关注点**：画出职责边界图，避免把 “技能可用” 误说成 “一定有 shell/file 权限”。
- **相关实验**：L1 技能与资源流追踪，计划路径 `lab-manual/01-trace-an-agent.md`，配套文件目录 `lab-files/lab-01`。
- **自查**：你是否能指出至少 3 条固定版路径，支撑你的图示或说明？

### M2 Skills and Context

本章聚焦技能包本身：技能目录、frontmatter、supporting file、旧 README 说法与当前 guide/source 之间的关系。

- **教材**：[`textbook/02-skills-and-context.md`](./textbook/02-skills-and-context.md)
- **Builder 关注点**：修复一个故意损坏的 frontmatter，解释为什么规则会在打包前拦下它。
- **Architect 关注点**：写一则 ADR，保留冲突双方并说明为什么课程采用 current guide/source 作为现行解释。
- **相关实验**：L2 imported skill 改写与负例分析，计划路径 `lab-manual/02-build-a-skill.md`，配套文件目录 `lab-files/lab-02`。
- **自查**：你的说明里有没有把旧 README 直接当成当前运行事实？

### M3 Tools and Sandboxes

本章处理最容易混淆的判断：什么时候是 skill 问题，什么时候其实是 sandbox 能力边界问题。

- **教材**：[`textbook/03-tools-and-sandboxes.md`](./textbook/03-tools-and-sandboxes.md)
- **Builder 关注点**：比较 virtual、local、remote sandbox 对原生进程、隔离和远程持久工作区的影响。
- **Architect 关注点**：把 ownership、cancellation、isolation 等约束写成团队可复查的决策记录。
- **相关实验**：L3 三场景边界选择，计划路径 `lab-manual/03-choose-capability-boundaries.md`，配套文件目录 `lab-files/lab-03`。
- **自查**：你是否明确写出至少一个“不选该方案”的理由？

### M4 Evaluation and Observability

本章只讨论被固定版证据支持的结论：有哪些前置条件、哪些只是样例、哪些需要学习者自己授权执行。

- **教材**：[`textbook/04-evaluation-and-observability.md`](./textbook/04-evaluation-and-observability.md)
- **Builder 关注点**：写出 eval preflight note，列清楚账号、Key、URL 和运行前提。
- **Architect 关注点**：写出治理说明，解释静态材料与学习者自己执行的真实 skill activation 或真实 eval 有什么区别。
- **相关实验**：L4 可选真实技能激活，路径 `lab-manual/optional/04-activate-and-observe.md`；L5 可选 agent eval，路径 `lab-manual/optional/05-evaluate-an-agent.md`；配套文件目录 `lab-files/optional`。
- **自查**：你的说明是否把 README 命令和真实执行结果分开了？

## 实验安排

实验手册正文已编写在学习者可见路径：核心入口为 `lab-manual/README.md`，核心实验为 `lab-manual/01-trace-an-agent.md`、`lab-manual/02-build-a-skill.md`、`lab-manual/03-choose-capability-boundaries.md`；可选实作为 `lab-manual/optional/04-activate-and-observe.md`、`lab-manual/optional/05-evaluate-an-agent.md`；配套文件目录为 `lab-files/lab-01`、`lab-files/lab-02`、`lab-files/lab-03`、`lab-files/optional`。

## L1 技能与资源流追踪

- **目标**：产出一张学习者自己的架构图，而不是复述课程设计记录。
- **产物**：图示或图文说明，标出导入、挂载、激活和 supporting file。
- **完成标准**：至少 3 条固定版路径锚点，且能解释它们如何连起来。

## L2 imported skill 改写与负例分析

- **目标**：识别 frontmatter 与目录命名规则，并写出修复说明。
- **产物**：修复后的字段设计、错误原因、打包说明。
- **完成标准**：说清楚为什么负例会被静态规则拦下，以及为什么 supporting file 仍属于技能包。

## L3 三场景能力边界选择

- **目标**：面对不同任务，选择合适的 sandbox，并解释不用其他方案的原因。
- **产物**：对比表、评审记录或 ADR 草稿。
- **完成标准**：必须覆盖原生进程、隔离和远程持久工作区三个场景。

## L4 可选：真实技能激活

- **前提**：学习者自备模型账户、API Key 和授权环境。
- **目标**：在自己的环境中观察技能进入 Available Skills 并能被激活。
- **提醒**：这项练习需要你在自己的授权环境中验证；它是学习者自测扩展。

## L5 可选：真实 agent eval

- **前提**：学习者自备账户、API Key、目标代理地址和授权环境。
- **目标**：把固定版 eval 示例转成自己的运行前检查，并记录真实执行结果。
- **提醒**：README、config、harness 与 `.eval.ts` 只是静态证据，不等于这里已经存在通过日志。

## 路线建议

### Builder 建议走法

按 **M1 -> L1 -> M2 -> L2 -> M3 -> L3 -> M4** 前进。你会先学会“追踪和修复”，再进入“边界选择”和“评测前检查”。

### Architect 建议走法

按 **M1 -> M2 -> M3 -> M4** 阅读，每章都产出一份面向评审的图、对比或 ADR。你不需要先写代码，但要把每个结论落到固定版证据上。建议交付物：

| 章节 | Architect 交付物 | 最低要求 |
| --- | --- | --- |
| M1 | 职责边界图 | 分开标出 harness、skill、tool、sandbox 和 live model 行为。 |
| M2 | Skill contract ADR | 说明 frontmatter/目录命名、supporting file 和旧 README wording 风险。 |
| M3 | Sandbox 边界决策表 | 至少比较 local、virtual、remote 中两种方案，并写 why-not。 |
| M4 | Evaluation governance note | 区分静态证据、真实运行证据、blocked live prerequisite 和发布状态。 |

## 结课自查

完成核心章节后，请确认你能独立回答以下问题：

1. 什么时候问题是 skill 设计，什么时候问题是 sandbox 能力边界？
2. 为什么旧 README wording 不能直接当成当前运行事实？
3. 哪些练习只依赖固定版资料，哪些必须由学习者自己授权执行？

如果这三个问题都能结合固定版路径、实验产物和边界说明回答出来，你就已经具备继续进入教材正文与实验手册的准备。

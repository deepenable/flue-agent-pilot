# 延伸阅读

这些材料适合在读完四章后继续探索。它们不是已经随包提供的 live 验证结果。

## Builder

1. 阅读固定版 `examples/hello-world/src/agents/with-skill.ts`，对照第 1 章画出 `useTool`、`harness.prompt` 和 skill activation 的位置。
2. 阅读固定版 `packages/runtime/src/tool.ts` 中的 validation 逻辑，整理出 tool definition 常见错误清单。
3. 对照固定版 sandboxes guide，把一个任务拆成“需要真实进程”和“不需要真实进程”两版方案。

## Architect

1. 用第 3 章 ADR 模板评审一个不可信代码执行方案，重点检查 local/remote lifecycle/cancellation 责任。
2. 为第 4 章 eval preflight note 增加组织治理字段，例如数据保留、目标系统授权、trace 可见性和失败处置。
3. 对比 skill、tool、sandbox、state 四类资源，写一页“谁是权限边界”的说明。

## 后续课程路径

实验手册已经把 L1-L5 写成可操作练习，路径为 `lab-manual/01-trace-an-agent.md`、`lab-manual/02-build-a-skill.md`、`lab-manual/03-choose-capability-boundaries.md`、`lab-manual/optional/04-activate-and-observe.md`、`lab-manual/optional/05-evaluate-an-agent.md`，配套文件目录为 `lab-files/lab-01`、`lab-files/lab-02`、`lab-files/lab-03`、`lab-files/optional`。后续运行验证才会处理 build/runtime 结果。当前教材不等于发布批准，也不等于 live Flue 环境已经跑通。

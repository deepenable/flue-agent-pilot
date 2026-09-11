# 术语表

## Agent function

Flue 中代表 agent 的 JavaScript/TypeScript 函数。函数返回系统提示；每次模型调用前会重新 render。

## Agent hook

在 agent function 内调用的 `use...` 函数，用来声明模型、tool、skill、sandbox、state、subagent 或生命周期行为。

## Harness

连接 agent function 声明、模型调用、工具执行、对话状态和环境资源的运行层。Harness 不是固定脚本流水线。

## Skill

可按需激活的教学包，通常由 `SKILL.md` 和 supporting files 组成。Skill 教模型如何做，不执行应用代码。

## Progressive disclosure

逐步披露：模型常驻只看到 skill 的 name 和 description；完整说明和 supporting files 在需要时再读取。

## Tool

模型可调用的应用函数。Flue tool 通过 name、description、Valibot input/output schema 和 `run` 函数定义。

## Harness tool

设置 `harness: true` 的 tool。它的 `run` 函数可以使用 `harness.sandbox` 或 `harness.prompt(...)`。

## Sandbox

Agent 的文件系统和命令执行环境。没有 sandbox 时，文件和 shell 工具不会被加入。

## Virtual sandbox

基于 in-memory filesystem 和 emulated bash 的轻量 sandbox；不会启动真实原生进程，文件系统是临时的。

## Local sandbox

Node target 下通过 `local()` 绑定宿主机真实文件系统和 shell。它方便但不是隔离边界。

## Remote sandbox

由外部 provider 管理的 sandbox，通过 adapter 连接到 Flue。适合强隔离或持久远程工作区，但生命周期和取消责任归应用设计。

## Eval

用于评估 agent 行为的测试或评分流程。Eval 可以检查文本、tool trace、usage metadata 或任务结果；它不自动证明学习者掌握程度。

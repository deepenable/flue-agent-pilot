# Flue Agent 学习目标与路线

本课程面向能阅读 TypeScript、Node.js 与 pnpm 脚本的开发者，以及需要评审 agent 系统边界的技术架构师。课程内容来自学习包 `0.1.1`，固定 Flue 源码版本为 `cd80df610c39643cc43c06d1cf47132ffc604d55`；静态源码结论不能代替真实模型、技能激活或 eval 的执行证据。

## 完成后能做到什么

1. 沿着固定源码解释 `SKILL.md` 导入、`useSkill(...)` 挂载、技能激活与 supporting file 的关系。
2. 修改技能包、分析目录名与 frontmatter 不匹配的负例，并在自备环境中完成依赖感知 build。
3. 比较 tool、virtual/local/remote sandbox 的能力与风险，为三种场景写出选择和不选理由。
4. 区分静态证据、真实运行证据与学习产物，写出有授权、费用和清理边界的 eval 预检说明。

## 选择学习路线

**Builder** 按 Harness 与 L1、技能与 L2、Sandbox 与 L3、评估与可观测性的顺序学习。L1 先阅读技能机制；遇到 frontmatter 或逐步披露概念时，交叉阅读[技能包与上下文](textbook/02-skills-and-context.md)。完成标准是可复查的资源流说明、修复和 build 证据，以及包含 why-not 的边界决策。

**Architect** 按四章教材顺序阅读，分别交付职责边界图、skill contract ADR、sandbox 决策表和评估治理说明。每个结论都应指向固定版源码，不能把“有 skill”当作“有 shell 权限”。

L4 技能激活与 L5 agent eval 均为可选扩展；未准备授权环境时，完成核心路线即可，不需要伪造可选实验的通过记录。

## 前置条件与资源

- 使用 Windows PowerShell，准备 Node.js 22 LTS。完整 Flue workspace build 使用项目声明的 pnpm `11.1.1`、Corepack 与 Git Bash。
- L1/L3 和 L2 静态热身在取得固定源码及配套文件后可离线进行；首次下载源码、安装依赖和 L2 完整 build 的依赖准备可能需要网络。
- 平台不分发环境凭据或 GitHub Copilot 邀请，本课程的 `requires` 均为空。软件、源码访问及可选模型账户由学习者自备。
- L4/L5 需要自己的模型账户、API Key、目标环境授权和成本许可；不要把真实秘密写入教材、答案、Git 或预检文件。
- 教材中的 Mermaid 图可能在平台显示为代码文本；图后的说明与对比表仍是学习依据，不以图形渲染作为完成条件。

## 开始前的检查

先阅读[环境与实验材料](lab-manual/README.md)，取得固定版本的完整课程附件，区分课程包根目录、源码目录和一次性实验副本。平台只展示手册，不会自动下载或运行 self-check、安装依赖、创建云资源，也不会把占位符替换成密钥。

核心路线完成后，确认自己能够回答：哪些问题属于 skill 设计，哪些属于 sandbox 能力边界；为什么旧 README 不能直接当作运行事实；哪些结论必须等到授权环境执行后才能成立。

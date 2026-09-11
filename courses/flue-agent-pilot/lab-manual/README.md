# Flue Agent 实验手册

> Lab 适配说明（2026-09-11）：补充固定版本附件入口、明确离线与 build 边界，并移除平台重复导航；保留原实验命令。

这些实验把教材中的概念变成可操作练习。取得源码和配套文件后，L1/L3 与 L2 静态热身只依赖固定版源码、Markdown/JSON 编辑和本地 Node 标准库自查，不需要模型账号、WebIQ、云资源或私有凭据。L2 的 Builder 完整 workspace build 另需安装依赖，首次准备可能联网。L4-L5 是可选 live 扩展，只能在你自己的授权环境中执行。

固定源码快照：`withastro/flue@cd80df610c39643cc43c06d1cf47132ffc604d55`。原始课程包 `0.1.1` 记载其发布 baseline：原发布方在 Windows、Node `22.22.2`、pnpm `11.1.1` 与 Git Bash 环境执行了 L1/L3 的 good 与 intended-negative 静态自查，以及 L2 的 good、intended-negative 与 repaired 依赖感知 build。本次 GitHub 适配交付未重新执行这些实验；原始记录不等于学习者自己的环境已经验证，也不表示可选 L4/L5、Flue 模型或云端运行已经执行。

## 准备环境

- Node.js：固定版 root `package.json` 要求 `node >=22`。
- pnpm：固定版 root `package.json` 写明 `packageManager: pnpm@11.1.1`、`pnpm >=11 <12`。如需执行 Flue workspace 命令，用 Corepack 解析项目声明的 pnpm 版本，不要为课程全局升级 pnpm。
- Git：只有取得或校验公开源码、以及 Windows 完整 build 使用 Git Bash 时才需要。Git、Node 不在默认 PATH 时，请把下面的 `$GitExe`、`$NodeExe`、`$CorepackExe` 改成实际 `.exe` 绝对路径；不要修改系统或全局 Git/npm 配置。
- PowerShell：本文命令使用 Windows 路径。
- 核心实验自查只用 Node 标准库和本目录内文件。

## 路径变量

平台只导入 Markdown，不分发脚本或 fixture。先在有权访问私有仓库的 GitHub 账号中下载[原始 0.1.1 课程包 ZIP](https://github.com/deepenable/flue-agent-pilot/archive/23c1aa6fd33ba689815fdae69490263924808099.zip)并解压；[该固定提交中的配套文件](https://github.com/deepenable/flue-agent-pilot/tree/23c1aa6fd33ba689815fdae69490263924808099/lab-files)可用于查看来源。若显示 404，请向课程管理员申请该私有仓库的只读访问，不要把访问令牌写入链接。

`$CourseRoot` 指向解压后直接包含原始 `README.md`、`syllabus.md`、`lab-files` 的目录，**不是**本平台阅读目录 `courses/flue-agent-pilot`。附件固定在原始提交，不依赖移动的 `main`。所有手册中的 `lab-files` 相对路径均相对于这个解压目录。

在**解压后的课程包根目录**（直接包含 `README.md`、`syllabus.md`、`lab-files`）运行。源码必须是课程包之外由学习者拥有的 checkout；可以把已有 checkout 的绝对路径写入 `$env:FLUE_SOURCE_ROOT`，也可以在课程包同级目录自行 clone：

```powershell
$CourseRoot = (Resolve-Path .).Path
$NodeExe = (Get-Command node -ErrorAction Stop).Source
$CorepackExe = (Get-Command corepack -ErrorAction Stop).Source
$GitExe = (Get-Command git -ErrorAction Stop).Source
$PinnedCommit = "cd80df610c39643cc43c06d1cf47132ffc604d55"

if ($env:FLUE_SOURCE_ROOT) {
    $SourceRoot = (Resolve-Path $env:FLUE_SOURCE_ROOT).Path
} else {
    $SourceRoot = Join-Path (Split-Path $CourseRoot -Parent) "flue-$PinnedCommit"
    if (Test-Path $SourceRoot) { throw "Refusing to reuse checkout without explicit FLUE_SOURCE_ROOT: $SourceRoot" }
    & $GitExe clone https://github.com/withastro/flue.git $SourceRoot
    & $GitExe -C $SourceRoot checkout --detach $PinnedCommit
}
$SourceRoot = (Resolve-Path $SourceRoot).Path
if ($SourceRoot.StartsWith($CourseRoot + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) {
    throw "SourceRoot must be outside the extracted course package."
}
if ((& $GitExe -C $SourceRoot rev-parse HEAD).Trim() -ne $PinnedCommit) {
    throw "SourceRoot is not the required pinned commit."
}
Set-Location $CourseRoot
```

后续核心自查命令默认从 `$CourseRoot` 运行。实验副本使用课程包外的 `$LabRoot`；`$ExampleRoot` 始终指向当前要编辑的 example。L2 会明确区分 example-only 与 full-workspace 两种模式。

## 目录约定

`lab-files\` 中的脚本和 fixture 是公开学习材料。它们只检查结构、路径、字段和明显的安全边界；语义质量仍要靠你的解释和人工复查。标准答案和评分材料不在 learner-content 下，课程包不会把它们交给学习者。

核心实验中凡是要求修改 Flue 示例的步骤，都必须先从 `$SourceRoot` 复制到课程包外的一次性 `$LabRoot`。不要复用旧目录，也不要修改学习者自己的固定源码 checkout。

## 安全清理总则

只删除你自己创建且带 `.lab-owner.txt` 的 `$LabRoot` 或课程包内自己的答案文件。不要删除 `$SourceRoot`、父目录、`.env`、凭据库、SSH key、全局 pnpm/cache、编辑器配置或运行日志。

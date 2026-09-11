# L4 可选：激活 skill 并观察 supporting-file 变化

## 场景

你想在自己的授权环境中观察：当 imported skill 的 supporting file 被改变后，agent 行为是否受影响。本练习不是核心离线练习；它需要你自己的模型账号/API key，并可能产生成本。

## 目标

完成后你将能够：

1. 在一次性 Flue workspace 副本中运行固定版 imported-skill 示例命令。
2. 记录技能激活证据、supporting file 变更和负例观察。
3. 区分“固定源码说明了机制”和“我在自己的环境实际观察到结果”。

## 前置条件与版本

- 你自备模型账号与 API key；不要使用他人的 `.env`。
- 固定版 root `package.json` 要求 Node `>=22` 和 pnpm `>=11 <12`，项目声明 `pnpm@11.1.1`。
- 固定版 imported-skill README 给出的命令形态包含 `pnpm exec flue run ... --message ... --env ...` 与 `pnpm exec vite dev`。
- 只有你在自己的授权环境中运行后，才会得到真实 model/tool/event 日志。

## 准备

1. 先按手册入口设置 `$CourseRoot`、课程包外的 `$SourceRoot`、`$NodeExe` 和 `$CorepackExe`，再创建一次性完整 workspace 副本：

   ```powershell
   $RunId = Get-Date -Format "yyyyMMdd-HHmmss"
   $LabParent = Join-Path (Split-Path $CourseRoot -Parent) "learner-labs"
   $LabRoot = Join-Path $LabParent ("flue-live-skill-lab-" + $RunId)
   New-Item -ItemType Directory -Force $LabParent | Out-Null
   if (Test-Path $LabRoot) { throw "Refusing to reuse existing lab root: $LabRoot" }
   Copy-Item -Recurse -Force $SourceRoot $LabRoot
   Set-Content (Join-Path $LabRoot ".lab-owner.txt") "created=$(Get-Date -Format o)"
   $ExampleRoot = Join-Path $LabRoot "examples\imported-skill"
   ```

2. 在一次性副本中创建你自己的 env 文件，例如 `.\learner.env`。只放你授权使用的 key，不提交、不复制进 learner-content。
3. 复制预检模板：

   ```powershell
   Copy-Item (Join-Path $CourseRoot "lab-files\optional\lab-04\activation-observation.template.json") (Join-Path $LabRoot "activation-observation.json")
   ```

## 操作步骤

在一次性副本的 `examples\imported-skill` 中执行，依赖需已由你在授权环境准备好：

```powershell
Set-Location $LabRoot
& $CorepackExe pnpm --dir $ExampleRoot exec flue run .\src\agents\with-imported-skill.ts --message "Run the review skill demo." --env (Join-Path $LabRoot "learner.env")
```

然后修改一次性副本里的 `examples\imported-skill\src\skills\review\CHECKLIST.txt`，加入一个独特、无秘密的观察标记，例如：

```text
Include the phrase LAB04-RESOURCE-MARKER if this supporting file guided the answer.
```

再次运行同一命令，并在 `activation-observation.json` 记录：

- 命令、工作目录、env 文件名（不要记录 key 值）。
- 是否有 runtime transcript、tool/event log 或平台观测能显示 `activate_skill`/`read_skill_resource`。如果你的环境没有公开 trace，就写 `not_available_in_my_setup`。
- before/after 输出和负例：例如临时移走 `CHECKLIST.txt` 后是否出现资源读取失败、构建失败或行为变化。不要把“模型说我读了”单独当成充分证据。

## 期望看到的结果

理想证据包含两类：可复查的命令/产物，以及尽可能具体的 tool/event 证据。固定版文档说明 skills 会进入 `Available Skills`，并有 `activate_skill` 与 supporting file 的惰性读取机制；但本手册没有从固定 CLI 文档中确认一个稳定的 trace 导出命令，因此不能承诺所有环境都有同名日志。

## 自查

```powershell
& $NodeExe (Join-Path $CourseRoot "lab-files\optional\lab-04\self-check.mjs") (Join-Path $LabRoot "activation-observation.json")
```

自查只有在你已经拥有 learner-owned authorization、确认成本许可，并记录了 before/after 或 meaningful negative resource case 后才会通过。还没有 key 时，请把模板保留为未完成预检，不要把它当成通过记录。自查不证明 Flue runtime 成功，也不等同于真实 build/runtime 验证。

## 故障排除

| 现象 | 处理 |
| --- | --- |
| pnpm 版本不符合 | 使用 Corepack 根据项目 `packageManager` 解析 `pnpm@11.1.1`，不要全局升级课程环境。 |
| 缺少模型 key | 停止 live 步骤；只保留预检，不要借用他人的 `.env`。 |
| 没有 trace 输出 | 写清 `not_available_in_my_setup`，不要编造 `activate_skill` 日志。 |

## 安全清理

```powershell
if (-not (Test-Path (Join-Path $LabRoot ".lab-owner.txt"))) {
    throw "Refusing to delete unowned lab root: $LabRoot"
}
Remove-Item $LabRoot -Recurse -Force
```

只删除一次性副本。不要删除 `$SourceRoot`、课程 `.env`、你的全局凭据或 package cache。

## 思考与扩展

1. 哪些证据能证明 supporting file 改动影响了行为，哪些只是模型自述？
2. 如果 workspace skill 支持 mid-session edits，与你在 imported skill 副本中的观察有何不同？

## 参考

- `$SourceRoot\examples\imported-skill\README.md`
- `$SourceRoot\examples\imported-skill\src\agents\with-imported-skill.ts`
- `$SourceRoot\apps\docs\src\content\docs\guide\skills.md`
- `$SourceRoot\packages\runtime\src\agent.ts`

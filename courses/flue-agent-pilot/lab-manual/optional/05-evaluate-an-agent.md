# L5 可选：改造 vitest-evals 示例来评估 agent

## 场景

你想把固定版 `examples\vitest-evals` 中的 service status 评测改造成自己的 agent eval。这个练习需要你自己的模型账号、目标 agent URL 和授权 server；只有你在自己的授权环境中运行后，才会得到真实 server、模型请求和 eval 结果。

## 目标

完成后你将能够：

1. 从固定 manifest 和 eval 源码读出真实命令、URL 默认值和检查信号。
2. 写出 eval preflight note，区分静态依据与 live 结果。
3. 设计一个负例条件，检查 tool usage 或结构化 outcome，而不是固定模型措辞。

## 前置条件与版本

- 你自备模型账号/API key 与目标 agent 授权。
- 固定版 `examples\vitest-evals\package.json` scripts：
  - `dev`: `vite dev`
  - `evals`: `vitest run --config vitest.evals.config.ts`
  - `evals:info`: `VITEST_EVALS_REPORT_LEVEL=info vitest run --config vitest.evals.config.ts`
  - `evals:json`: `vitest run --config vitest.evals.config.ts --reporter=vitest-evals/reporter --reporter=json --outputFile.json=vitest-results.json`
- 固定版 README 的 workspace commands 是 `pnpm --filter example-vitest-evals dev` 与 `pnpm --filter example-vitest-evals evals`。
- `service-health.eval.ts` 默认 `FLUE_AGENT_URL` 为 `http://127.0.0.1:3583/agents/service-status`。

## 准备

先按手册入口设置 `$CourseRoot`、课程包外的 `$SourceRoot`、`$NodeExe` 和 `$CorepackExe`。复制一次性 workspace，并填写预检：

```powershell
$RunId = Get-Date -Format "yyyyMMdd-HHmmss"
$LabParent = Join-Path (Split-Path $CourseRoot -Parent) "learner-labs"
$LabRoot = Join-Path $LabParent ("flue-eval-lab-" + $RunId)
New-Item -ItemType Directory -Force $LabParent | Out-Null
if (Test-Path $LabRoot) { throw "Refusing to reuse existing lab root: $LabRoot" }
Copy-Item -Recurse -Force $SourceRoot $LabRoot
Set-Content (Join-Path $LabRoot ".lab-owner.txt") "created=$(Get-Date -Format o)"
$ExampleRoot = Join-Path $LabRoot "examples\vitest-evals"
Copy-Item (Join-Path $CourseRoot "lab-files\optional\lab-05\eval-preflight.template.json") (Join-Path $LabRoot "eval-preflight.json")
```

不要把真实 token 写进预检文件；只写凭据来源是 learner-owned。

## 操作步骤

在你已安装依赖且授权的副本根目录中，终端 1 启动本地 server：

```powershell
Set-Location $LabRoot
& $CorepackExe pnpm --filter example-vitest-evals dev
```

终端 2 执行 eval：

```powershell
Set-Location $LabRoot
& $CorepackExe pnpm --filter example-vitest-evals evals
```

需要更详细输出时，使用固定 package script：

```powershell
& $CorepackExe pnpm --filter example-vitest-evals evals:info
& $CorepackExe pnpm --filter example-vitest-evals evals:json
```

如果要评估部署后的 agent，把 `FLUE_AGENT_URL` 指向你有权访问的 agent mount URL。不要用他人的私有服务或凭据。

## 期望看到的结果

固定版 eval case 检查三类信号：输出包含 `operational`、tool calls 包含 `get_service_status`、usage token 数大于 0。你的改造应保留“结构化 outcome/tool usage”思路，并添加负例条件，例如：当问题不涉及服务健康时不应调用 `get_service_status`，或当 service 名称为空时应拒绝/报错。不要要求模型输出固定长句作为唯一通过条件。

## 自查

```powershell
& $NodeExe (Join-Path $CourseRoot "lab-files\optional\lab-05\self-check.mjs") (Join-Path $LabRoot "eval-preflight.json")
```

自查只有在你已确认 learner-owned credentials、目标 agent 授权和成本许可后才会通过；它适合 live-ready preflight，不适合冒充未授权通过记录。自查会确认 server/eval 命令、目标 URL、静态依据、负例条件和结果状态，但不执行 server/eval/model call。

## 故障排除

| 现象 | 处理 |
| --- | --- |
| eval 找不到 server | 确认终端 1 的 server URL 与 `FLUE_AGENT_URL` 一致。 |
| usage metadata 不存在 | 回看 `src\agents\service-status.ts` 与 `src\evals\harness.ts`；usage 来自 agent 通过 `useResponseFinish` 写入的 metadata 约定。 |
| 结果只检查固定措辞 | 加入 tool call、structured outcome 或 negative task condition。 |

## 安全清理

停止 server 终端后，仅删除一次性副本：

```powershell
if (-not (Test-Path (Join-Path $LabRoot ".lab-owner.txt"))) {
    throw "Refusing to delete unowned lab root: $LabRoot"
}
Remove-Item $LabRoot -Recurse -Force
```

不要删除 `$SourceRoot`、真实 `.env`、运行日志或全局凭据。

## 思考与扩展

1. usage metadata 缺失时，eval 应该失败、跳过还是降级？为什么？
2. 如何把负例从“文本不包含某词”改成 tool usage 或业务 outcome？

## 参考

- `$SourceRoot\examples\vitest-evals\README.md`
- `$SourceRoot\examples\vitest-evals\package.json`
- `$SourceRoot\examples\vitest-evals\vitest.evals.config.ts`
- `$SourceRoot\examples\vitest-evals\src\evals\harness.ts`
- `$SourceRoot\examples\vitest-evals\src\evals\service-health.eval.ts`
- `$SourceRoot\examples\vitest-evals\src\agents\service-status.ts`

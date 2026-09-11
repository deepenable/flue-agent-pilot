# L3：为三种场景选择 capability boundary

## 场景

你的团队要设计 agent 能力边界。三个需求分别要求真实本机进程、多租户隔离、以及可恢复的远程工作区。你要写一份小 ADR/config decision，明确选择 virtual、local 或 remote sandbox，并说明不选其他方案的理由。

## 目标

完成后你将能够：

1. 区分 local、virtual、remote sandbox 的能力边界。
2. 对每个场景写出 why/why not，而不是只给结论。
3. 明确 ownership、cancellation、isolation 中至少一个约束如何影响方案。

## 前置条件与版本

- 已读教材第 3 章。
- 本实验不创建 cloud adapter，不启动远程 provider，不运行真实命令。
- 自查只用 Node 标准库读取 JSON。

## 准备

复制答案模板：

```powershell
Set-Location $CourseRoot
Copy-Item .\lab-files\lab-03\boundary-decision.template.json .\lab-files\lab-03\my-decision.json
```

阅读 `lab-files\lab-03\scenarios.json`。三个场景分别是：

1. `trusted-native-build`：受信任专用工作区，需要真实 `pnpm test`/本机工具链。
2. `untrusted-text-transform`：多租户不可信文本处理，只需要临时文件和 allowlisted HTTP。
3. `durable-issue-workspace`：每个 issue 需要可恢复的远程 Linux 工作区。

## 操作步骤

1. 在 `my-decision.json` 的每个 `decisions[]` 中填写 `sandbox`：`local`、`virtual` 或 `remote`。
2. 填写 `rationale`，至少提到该场景的核心约束。
3. 填写 `why_not`，每个场景至少写一个不选方案和原因。
4. 填写 `risk_controls`，例如限制环境变量、禁用 local 处理不可信请求、定义 remote cleanup owner。
5. 运行自查。

## 期望看到的结果

你的 ADR/config decision 应当清楚表达：

- `local()` 绑定宿主真实文件系统和 shell，没有隔离；只适合受信任开发/CI/专用容器或 VM。
- `virtual` 是内存文件系统和 emulated bash，不启动真实原生进程；网络要显式选择。
- `remote` 连接 provider-managed sandbox，资源创建、复用、删除与取消策略由应用设计负责。

## 自查

```powershell
& $NodeExe .\lab-files\lab-03\self-check.mjs .\lab-files\lab-03\my-decision.json
```

这个检查验证三场景是否都被回答、明显不合适的边界是否被拒绝、是否包含 why-not 和 risk controls。它不会评价你的 ADR 文字是否足够有说服力；人工复查会关注理由链。

## 故障排除

| 现象 | 处理 |
| --- | --- |
| `unsafe boundary` | 不要给多租户不可信请求选择 `local`。 |
| `native process scenario should not be virtual` | 真实 native build 不能放进 virtual emulated shell。 |
| `remote ownership missing` | 给 remote 场景补上资源 owner、cleanup 和 cancellation 说明。 |

## 安全清理

```powershell
Remove-Item .\lab-files\lab-03\my-decision.json -Force
```

不要删除 `scenarios.json`、模板或评分材料。

## 思考与扩展

1. 如果 `trusted-native-build` 在共享开发机上执行，还能直接选择 local 吗？
2. 如果 `untrusted-text-transform` 后续需要真实编译，方案会怎样升级？
3. 为 `durable-issue-workspace` 增加成本/配额字段。

## 参考

- `apps\docs\src\content\docs\guide\sandboxes.md`
- `packages\runtime\src\hooks\use-sandbox.ts`
- `textbook\03-tools-and-sandboxes.md`

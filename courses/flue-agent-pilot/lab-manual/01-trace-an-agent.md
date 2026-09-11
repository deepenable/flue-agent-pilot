# L1：追踪一个 Flue agent 的技能与资源流

## 场景

你接手了一个 Flue 示例：agent 导入 `SKILL.md`、挂载 skill，并通过一个 model-callable tool 让模型使用这个 skill。你的任务不是运行模型，而是基于固定源码画出“从文件到模型可见能力”的流图，并标出 supporting file 与 sandbox/tool 权限边界。

## 目标

完成后你将能够：

1. 追踪 `SKILL.md` 从静态导入、`useSkill(...)` 挂载，到 `Available Skills` 与 `activate_skill` 的关系。
2. 说明 supporting file 为什么属于 skill 包，但不等于 workspace 文件或 shell 权限。
3. 用至少 3 条固定版路径支撑你的架构/流程答案。

## 前置条件与版本

- 已读教材第 1 章和第 2 章。
- 能阅读 TypeScript import、hook 调用和 Markdown frontmatter。
- 本实验不执行 Flue、不调用模型、不需要网络。

## 准备

按手册入口设置 `$CourseRoot` 和课程包外的 `$SourceRoot`，并在 `$CourseRoot` 中运行。本实验只编辑课程包中的个人答案文件：

```powershell
Set-Location $CourseRoot
Copy-Item .\lab-files\lab-01\answer-template.json .\lab-files\lab-01\my-answer.json
```

下列源码锚点都相对于 `$SourceRoot`；用 `Join-Path $SourceRoot "examples\..."` 打开：

- `examples\imported-skill\src\agents\with-imported-skill.ts`
- `examples\imported-skill\src\skills\review\SKILL.md`
- `examples\imported-skill\src\skills\review\CHECKLIST.txt`
- `apps\docs\src\content\docs\guide\skills.md`
- `packages\runtime\src\hooks\use-skill.ts`
- `packages\runtime\src\agent.ts`

## 操作步骤

1. 打开 `lab-files\lab-01\source-paths.json`，确认本实验允许使用的源码锚点。
   答案 JSON 的 `source_anchors` 使用清单规定的 `source/...` 逻辑锚点；这是便于评分的标识，不表示源码真的在课程包的 `source` 子目录。
2. 阅读 `with-imported-skill.ts`，标出 `import review from '../skills/review/SKILL.md'` 与 `useSkill(review)`。
3. 阅读 `SKILL.md` 与 `CHECKLIST.txt`，标出 `name: review`、description 和 supporting file 关系。
4. 阅读 skills guide 中关于 `Available Skills`、`activate_skill` 和 `read_skill_resource` 的说明。
5. 在 `my-answer.json` 中填写：
   - `flow_nodes`：至少包含 `static_import`、`use_skill_mount`、`available_skills`、`activate_skill`、`supporting_file`。
   - `source_anchors`：至少 3 条固定版相对路径。
   - `boundary_notes`：说明 skill 不授予 shell/file 权限；sandbox 才决定文件与命令环境。
   - `human_completion_criteria`：用自然语言写出人工复查标准。

## 期望看到的结果

你的答案应当是一份能让同伴复查的架构/流程说明。它可以后续转成图，但必须已经表达出：静态导入与挂载是源码事实，模型是否真的调用 `activate_skill` 属于 live runtime 行为，本实验未观察。

## 自查

运行：

```powershell
& $NodeExe .\lab-files\lab-01\self-check.mjs .\lab-files\lab-01\my-answer.json
```

这个检查验证 JSON 结构、关键节点、固定版路径锚点数量、supporting file 提及和边界禁语。它不会证明你的图示语义完全正确，也不会证明模型实际激活了 skill。人工完成标准：同伴能沿着你列出的源码路径复查每个节点，且看不出“有 skill 就有 shell 权限”的误解。

## 故障排除

| 现象 | 处理 |
| --- | --- |
| `Missing required flow node` | 回到 `answer-template.json`，补齐自查输出列出的节点类型。 |
| `Need at least 3 source anchors` | 从 `source-paths.json` 的 allowlist 选择真实路径，不要写课程设计记录 ID。 |
| 边界说明被拒绝 | 删除“skill grants shell/file access”之类过度声明，改为说明 sandbox 才提供文件和命令环境。 |

## 安全清理

如果不再需要答案：

```powershell
Remove-Item .\lab-files\lab-01\my-answer.json -Force
```

不要删除 `lab-files\lab-01\source-paths.json` 或固定源码目录。

## 思考与扩展

1. 为什么 `useSkill(review)` 出现在源码里，也不能证明模型已经读过 `CHECKLIST.txt`？
2. 如果 agent 没有 sandbox，你的流程图中还应该出现 shell/file 工具吗？
3. 扩展：把答案 JSON 转成 Mermaid 图，但保留源码锚点。

## 参考

- `examples\imported-skill\src\agents\with-imported-skill.ts`
- `examples\imported-skill\src\skills\review\SKILL.md`
- `examples\imported-skill\src\skills\review\CHECKLIST.txt`
- `apps\docs\src\content\docs\guide\skills.md`
- `packages\runtime\src\hooks\use-skill.ts`

# L2：修改并打包一个 imported Flue skill

## 场景

你要在一次性副本中修改 `review` skill：新增 supporting file 指令，故意制造一次目录名/frontmatter mismatch，再修复它。本实验分两层：核心静态练习可以只复制 `examples\imported-skill`；完整 build 验证必须复制整个 Flue workspace，不能在 example-only 副本中运行 root Turbo 命令。

## 目标

完成后你将能够：

1. 修改 `SKILL.md` 与 supporting file，同时保持 skill 目录自洽。
2. 解释 `name` 与目录名不匹配为什么会被 imported-skill 打包流程拦下。
3. 从固定版 manifest 读出真实 build 命令和 pnpm 版本要求，不猜 package selector。

## 前置条件与版本

- 固定版 root `package.json`：`node >=22`，`packageManager: pnpm@11.1.1`，`pnpm >=11 <12`。
- `examples\imported-skill\package.json`：package name 是 `imported-skill-example`，script `build` 是 `vite build`。
- 核心离线练习不运行 `pnpm install`、不运行完整 workspace build、不读取真实 `.env`。完整 runtime/build 验证需要授权环境和依赖准备。

## 准备一次性副本

先按手册入口设置 `$CourseRoot`、课程包外的 `$SourceRoot`、`$NodeExe` 与 `$CorepackExe`。如果只做核心静态练习，复制 `examples\imported-skill`；此模式下 `$LabRoot` 与 `$ExampleRoot` 指向同一 example 副本：

```powershell
$RunId = Get-Date -Format "yyyyMMdd-HHmmss"
$LabParent = Join-Path (Split-Path $CourseRoot -Parent) "learner-labs"
$LabRoot = Join-Path $LabParent ("flue-imported-skill-lab-" + $RunId)
New-Item -ItemType Directory -Force $LabParent | Out-Null
if (Test-Path $LabRoot) { throw "Refusing to reuse existing lab root: $LabRoot" }
Copy-Item -Recurse (Join-Path $SourceRoot "examples\imported-skill") $LabRoot
Set-Content (Join-Path $LabRoot ".lab-owner.txt") "created=$(Get-Date -Format o)"
$ExampleRoot = $LabRoot
```

如果要做完整 workspace build 验证，请重新开一个 PowerShell 会话并按入口重设变量，再复制整个 `$SourceRoot`。此模式下 `$LabRoot` 是 workspace root，而 `$ExampleRoot` 明确指向其中的 imported-skill：

```powershell
$RunId = Get-Date -Format "yyyyMMdd-HHmmss"
$LabParent = Join-Path (Split-Path $CourseRoot -Parent) "learner-labs"
$LabRoot = Join-Path $LabParent ("flue-workspace-build-lab-" + $RunId)
New-Item -ItemType Directory -Force $LabParent | Out-Null
if (Test-Path $LabRoot) { throw "Refusing to reuse existing lab root: $LabRoot" }
Copy-Item -Recurse -Force $SourceRoot $LabRoot
Set-Content (Join-Path $LabRoot ".lab-owner.txt") "created=$(Get-Date -Format o)"
$ExampleRoot = Join-Path $LabRoot "examples\imported-skill"
```

两种模式都必须每次创建新的 `$LabRoot`；如果碰到同名目录就直接停止。不要修改 `$SourceRoot`，也不要把源码或构建产物复制进 `$CourseRoot`。

## 操作步骤

1. 在副本中打开 `$ExampleRoot\src\skills\review\SKILL.md`。确认 frontmatter 是：

   ```markdown
   ---
   name: review
   description: Reviews an answer using packaged supporting guidance.
   ---
   ```

2. 在 `$ExampleRoot\src\skills\review\STYLE.txt` 新增 supporting file：

   ```text
   Prefer one concise paragraph, then one concrete improvement.
   ```

3. 修改 `SKILL.md` 正文，让它同时读取两个 supporting files：

   ```markdown
   Read `CHECKLIST.txt` and `STYLE.txt`, then answer using both files.
   ```

4. 故意制造负例：把 frontmatter `name: review` 改成 `name: review-helper`，但目录仍保持 `$ExampleRoot\src\skills\review`。
5. 在 example-only 副本中运行静态自查，确认它失败：

   ```powershell
   $SelfCheck = Join-Path $CourseRoot "lab-files\lab-02\self-check.mjs"
   & $NodeExe $SelfCheck (Join-Path $ExampleRoot "src\skills\review")
   ```

   不复制源码也可以直接从解压后的课程包运行公开负例：

   ```powershell
   Set-Location $CourseRoot
   & $NodeExe (Join-Path $CourseRoot "lab-files\lab-02\self-check.mjs") (Join-Path $CourseRoot "lab-files\lab-02\fixtures\bad-name-mismatch\src\skills\review")
   ```

6. 修复 frontmatter 为 `name: review`，保留 `STYLE.txt` 和正文引用，再运行静态自查，应当通过。

## 完整 workspace build 命令来源

配套文件 `lab-files\lab-02\build-plan.template.json` 是给你记录完整 workspace build 计划与证据边界的模板；它不是自动执行脚本。

从固定版 manifest 可得：

- workspace root 使用 `pnpm@11.1.1`
- root `package.json` 的 `build` script 是 `turbo build`
- root `turbo.jsonc` 的 `build` task 声明 `dependsOn: ["^build"]`
- imported skill 示例 package selector 是 `imported-skill-example`
- build script 是 `vite build`
- `examples\imported-skill` 依赖 workspace `@flue/runtime`，并通过 `vite.config.ts` 导入 workspace `@flue/vite`；这些包导出 `dist` 文件，干净源码副本里还没有这些 build 产物

只安装依赖不等于已经生成 workspace exports。要在干净 workspace 副本中做依赖感知 build，必须使用上面的 **完整 workspace build 副本**，从 Flue workspace root 运行 root Turbo build，并用 package filter 保留 `^build` 依赖链：

固定 manifest 对应的命令文本是 `corepack pnpm exec turbo run build --filter=imported-skill-example`；替换 fixture 后的强制重跑文本是 `corepack pnpm exec turbo run build --filter=imported-skill-example --force`。下面通过 `$CorepackExe` 调用同一程序，以兼容非默认安装路径。

```powershell
& $CorepackExe pnpm install --frozen-lockfile
& $CorepackExe pnpm exec turbo run build --filter=imported-skill-example
```

如果你在同一一次性副本里替换 fixture 后需要强制重跑，再用：

```powershell
& $CorepackExe pnpm exec turbo run build --filter=imported-skill-example --force
```

这里使用 Corepack 解析项目声明的 pnpm 版本，不要求你全局升级 pnpm。当前核心离线练习不会运行 install 或 build。不要把 `corepack pnpm --filter imported-skill-example build` 当成干净 workspace 的完整验证命令，因为它会绕过 root Turbo `^build` 依赖任务，也不要把字面量 `--` 插到 Turbo 的 `--filter` 前面。

### Windows shell requirement for the full workspace build

Windows 上，仅安装 Git 还不够：默认 `cmd.exe` 执行 package script 时没有 `mv`。已验证的完整 build 为当前进程指定 Git Bash，因为 `@flue/cli` 会运行 `tsdown && mv dist/flue.mjs dist/flue.js`。

先从 `$GitExe`、`$NodeExe` 推导实际安装目录；若 `Get-Command` 找不到它们，请手工填写对应 `.exe` 绝对路径。下面只修改当前 PowerShell 进程，不修改全局 npm、pnpm、Git 或系统 PATH：

```powershell
$GitCmdDir = Split-Path $GitExe -Parent
$GitRoot = Split-Path $GitCmdDir -Parent
$BashExe = Join-Path $GitRoot "bin\bash.exe"
$GitUsrBin = Join-Path $GitRoot "usr\bin"
$NodeDir = Split-Path $NodeExe -Parent
if (-not (Test-Path $BashExe)) { throw "Git Bash not found: $BashExe" }
$env:npm_config_script_shell = $BashExe
$env:PATH = "$NodeDir;$GitUsrBin;$env:PATH"
$env:COREPACK_ENABLE_DOWNLOAD_PROMPT = "0"
$env:TURBO_TELEMETRY_DISABLED = "1"

Set-Location $LabRoot
& $CorepackExe pnpm install --frozen-lockfile
& $CorepackExe pnpm exec turbo run build --filter=imported-skill-example
```

After replacing the good fixture with the mismatch or repaired fixture in the same owned workspace, force a fresh build so a cache hit cannot hide the changed skill:

```powershell
& $CorepackExe pnpm exec turbo run build --filter=imported-skill-example --force
```

## 期望看到的结果

静态自查对 mismatch 版本返回非零退出码，并报告 `name must match directory name`。修复后返回 `ok: true`，并列出 `SKILL.md`、`CHECKLIST.txt`、`STYLE.txt`。这只证明 skill 文件结构满足本实验静态规则；不证明 Flue build 或 model runtime 已通过。

## 自查

```powershell
Set-Location $CourseRoot
& $NodeExe .\lab-files\lab-02\self-check.mjs .\lab-files\lab-02\fixtures\good\src\skills\review
& $NodeExe .\lab-files\lab-02\self-check.mjs .\lab-files\lab-02\fixtures\bad-name-mismatch\src\skills\review
& $NodeExe .\lab-files\lab-02\self-check.mjs .\lab-files\lab-02\fixtures\missing-style\src\skills\review
& $NodeExe .\lab-files\lab-02\self-check.mjs .\lab-files\lab-02\fixtures\missing-style-reference\src\skills\review
& $NodeExe .\lab-files\lab-02\self-check.mjs .\lab-files\lab-02\fixtures\repaired\src\skills\review
```

第一条和最后一条应通过；中间三条应失败。自查不会执行 `vite build`，不会安装依赖，也不会触碰 `.env`。

## 故障排除

| 现象 | 处理 |
| --- | --- |
| `missing SKILL.md` | 确认传入的是 skill 目录 `...\src\skills\review`，不是 workspace root。 |
| `invalid skill name` | 使用小写 ASCII、数字、连字符；不要首尾连字符或连续连字符。 |
| `referenced supporting file missing` | 确认正文里的反引号文件名与同目录文件一致。 |

## 安全清理

只删除当前这次创建、且带有 owner marker 的一次性副本：

```powershell
if (-not (Test-Path (Join-Path $LabRoot ".lab-owner.txt"))) {
    throw "Refusing to delete unowned lab root: $LabRoot"
}
Remove-Item $LabRoot -Recurse -Force
```

不要删除 `$SourceRoot`、`.env`、pnpm 全局状态、旧运行目录或父目录。

## 思考与扩展

1. 为什么 supporting file 不需要写进 frontmatter？
2. 旧 README 提到的 wording 与 current guide/source 冲突时，你的 ADR 应该如何记录？
3. 扩展：在一次性副本里加入第二个 supporting file，再用完整 workspace build 流程验证。

## 参考

- `$SourceRoot\package.json`
- `$SourceRoot\examples\imported-skill\package.json`
- `$SourceRoot\examples\imported-skill\vite.config.ts`
- `$SourceRoot\examples\imported-skill\src\agents\with-imported-skill.ts`
- `$SourceRoot\examples\imported-skill\src\skills\review\SKILL.md`
- `$SourceRoot\apps\docs\src\content\docs\guide\skills.md`

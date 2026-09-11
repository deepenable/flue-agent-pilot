# Flue Agent 0.1.1：Lab 接入交付

本仓库交付课程内容，供接收方后续从 Lab 平台 ingest。GitHub 内容提交不代表平台已经导入、ready、发布或绑定班级。

## 导入参数

| 字段 | 值 |
| --- | --- |
| 仓库 | `https://github.com/deepenable/flue-agent-pilot` |
| 可见性 | Private；本次不授权公开 |
| 分支 | `main` |
| 课程根目录（相对于仓库） | `courses/flue-agent-pilot` |
| Manifest | `courses/flue-agent-pilot/course.json` |
| courseId | `flue-agent-pilot` |
| 内容版本 | `0.1.1`；不是 manifest 自定义字段，也不预设平台版本号 |
| 默认及交付语言 | `zh-CN` |
| 平台资源需求 | 所有实验 `requires: []` |
| 导航 | 8 个学习单元、16 个章节；包含四章教材、L1-L3 核心实验、L4-L5 可选实作 |
| 图片 | 无；`assets: []` |
| 交付联系人 | 本次提交账号 `haxudev`，通过接收方既有沟通渠道联系 |

高级导入设置应填写本次交接消息或独立交付回执里的 **40 位最终提交 SHA**，不要只选择会变化的 `main`。提交无法在自己的文件里嵌入自身 SHA，因此本文件不伪造自引用 SHA。`git rev-parse HEAD` 可读取当前检出的完整 SHA；接收方仍需确认它与交接回执一致。

## 原始材料与适配范围

原始课程包的 58 个文件保留在仓库根，对应固定提交 `23c1aa6fd33ba689815fdae69490263924808099`；源目录未修改。正文中的 Flue 上游依据仍固定在 `withastro/flue@cd80df610c39643cc43c06d1cf47132ffc604d55`。这两个 SHA 的作用不同，也都不是最终 Lab 适配提交。

`courses/flue-agent-pilot` 是独立平台阅读目录。清单声明 16 份 Markdown，不声明或执行 `lab-files` 脚本。适配保留四章教材、五个实验及参考资料的完整教学内容和原代码围栏；新增平台概览与完整许可章节，仅调整环境入口、附件路径、来源说明及导航。源 README、大纲、重复入口和 fixture 仍可从原始包获取，不作为重复的平台章节。

[文件指纹与逐章来源映射](delivery-files.json)记录所有原始文件、课程文件的 SHA-256、大小以及适配方式。该清单是来源保留记录，**不是平台校验器报告**。

平台不随 Markdown 导入脚本或安装包。学习者需用有权访问本私有仓库的 GitHub 账号下载[固定原始课程包](https://github.com/deepenable/flue-agent-pilot/archive/23c1aa6fd33ba689815fdae69490263924808099.zip)。解压根目录才是实验中的 `$CourseRoot`，不能把平台阅读目录当成实验工作目录。

## 校验状态与接收方责任

权威格式校验尚未完成：提供的 `D:\agi-project\lab-publish` 只有规范文档，没有可信的完整平台工程、`package.json` 和 `scripts/validate-course.ts`。本次使用 Node.js `22.22.2` 调用本地 skill 入口：

```powershell
node "D:\agi-project\lab-agent\.agent\skills\lab-publish-skill\scripts\validate-course.mjs" --platform "D:\agi-project\lab-publish" --course "D:\agi-project\lab-agent\flue-agent-pilot\courses\flue-agent-pilot"
```

返回退出码 `2`，`{"valid":false,"code":"VALIDATOR_PLATFORM"}`。这表示校验工程缺失，**既不表示课程格式通过，也不表示课程内容校验失败**。校验工程版本：未提供。未临时编写或替换平台校验器。

交付方进行了文件清单、源文件字节保留、代码围栏保留、许可正文、声明路径与导航的有限编辑复核；这些工作不代替接收方权威校验、平台页面预览或教学验收。

接收方应在匹配 v1 的可信平台工程和已准备依赖的环境中，对最终 SHA 的干净检出执行：

```powershell
node "<skill-dir>\scripts\validate-course.mjs" --platform "<trusted-platform-root>" --course "<checkout>\courses\flue-agent-pilot"
```

保存权威工程版本、实际命令、退出码、JSON 摘要和对应提交 SHA。校验与预览通过后，再决定是否发布；不要用旧 ready 快照代替本次版本。

## 环境、权限与演练边界

学习者使用 Windows PowerShell、Node.js 22 LTS；完整 build 另需 Corepack、项目声明的 pnpm `11.1.1` 与 Git Bash。L1/L3 和 L2 静态热身在取得源码和材料后可离线进行，下载源码和首次依赖安装可能联网。L4/L5 自备模型账户、API Key、目标环境授权及费用许可，不依赖平台分发凭据或 Copilot 席位。

本次适配交付未演练课程脚本、Flue build、技能激活或 agent eval，也未发起模型请求、安装课程依赖或创建云资源。源课程已有的 baseline 与公开文档检索说明作为来源记录保留，不当作本次重新执行的证据。讲师负责在声明教学环境中演练，按手册管理一次性副本、凭据、费用与清理。

私有仓库的读取权限仍须由接收方为 Lab 的 GitHub 集成和需要下载附件的学习者协调。本次只使用提交账号已有权限，未创建或输出令牌、修改组织权限或添加协作者。

## 许可与平台操作

原包的第三方来源说明和 Apache-2.0 许可保留；平台清单另外声明完整许可章节，确保只导入正文时也携带许可全文。许可与固定上游内容一致，仅原包采用 CRLF 换行。本次不为课程整体新增开源授权，也不将仓库设为公开。

没有调用 Lab 管理 API，没有执行 ingest、课程发布、班级绑定或学员变更。下一责任方为接收方平台维护者与讲师：协调只读权限、运行原校验器、按固定 SHA 导入、预览与抽验，再按需要发布。

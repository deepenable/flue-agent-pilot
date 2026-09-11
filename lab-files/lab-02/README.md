# L2 配套文件

- `fixtures\good`：结构正确的 `review` skill，包含 `CHECKLIST.txt`、`STYLE.txt` 和两个正文引用。
- `fixtures\bad-name-mismatch`：目录是 `review`，frontmatter name 是 `review-helper` 的负例。
- `fixtures\missing-style`：正文引用 `STYLE.txt` 但文件缺失的负例。
- `fixtures\missing-style-reference`：有 `STYLE.txt` 但 `SKILL.md` 未引用它的负例。
- `fixtures\repaired`：修复后的正例，包含新增 `STYLE.txt`。
- `build-plan.template.json`：记录从固定 manifest 推导出的依赖感知 build 计划。
- `self-check.mjs`：静态 frontmatter/supporting-file 检查；不运行 Flue build。

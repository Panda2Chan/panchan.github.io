# Resume Project Highlights Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace author-facing AI advice in every resume project card with one objective project-highlight sentence.

**Architecture:** Rename the project data field from the AI-specific array `aiRelevance` to the single-sentence string `projectHighlight`. Keep the existing web highlight block, update the Markdown export label, and synchronize the documented data contract.

**Tech Stack:** TypeScript, React 19, Next.js 15, ESLint, pnpm

---

## File Structure

- Modify `src/app/resume/_data/types.ts`: define the project-highlight field contract.
- Modify `src/app/resume/_data/resume.ts`: provide one objective highlight for each project.
- Modify `src/app/resume/page.tsx`: render the highlight string in the existing project card block.
- Modify `src/app/resume/_lib/buildResumeMarkdown.ts`: export the field as “项目亮点”.
- Modify `docs/resume-data-structure.md`: keep the documented schema and examples aligned with runtime data.

### Task 1: Rename the field and replace project advice copy

**Files:**
- Modify: `src/app/resume/_data/types.ts:84`
- Modify: `src/app/resume/_data/resume.ts:309-373`
- Modify: `src/app/resume/page.tsx:336-340`
- Modify: `src/app/resume/_lib/buildResumeMarkdown.ts:225-228`
- Modify: `docs/resume-data-structure.md:111-453`

- [ ] **Step 1: Run the semantic acceptance check and verify it fails**

Run:

```bash
if rg -n "aiRelevance|AI 相关|适合通过 AI|可使用 AI|适合体现 AI" \
  src/app/resume docs/resume-data-structure.md; then exit 1; fi
```

Expected: FAIL with matches for the old field, Markdown label, and advice copy.

- [ ] **Step 2: Change the project type contract**

Replace the old property in `ResumeProject` with:

```ts
projectHighlight?: string
```

- [ ] **Step 3: Replace all project highlight data**

Use these exact `projectHighlight` values in `resumeData.projects`:

```ts
projectHighlight: '构建覆盖跨平台搜索、智能筛选、线索管理和结果导出的 KOL 发现闭环。',
projectHighlight: '围绕钱包核心交易流程沉淀可复用组件体系，统一表单、弹窗与状态交互。',
projectHighlight: '形成兼顾多语言、SEO、社媒传播与首屏性能的海外游戏营销页面交付体系。',
projectHighlight: '建设覆盖配置、权限、用户、交易、客服与数据分析的一体化游戏运营后台。',
projectHighlight: '打通持续部署、监控告警与日志分析链路，提升发布效率和故障定位能力。',
```

- [ ] **Step 4: Update web and Markdown consumers**

Render the optional string directly in `page.tsx`:

```tsx
{project.projectHighlight ? (
  <div className="mt-3 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600 print:hidden">
    {project.projectHighlight}
  </div>
) : null}
```

Export the same string in `buildResumeMarkdown.ts`:

```ts
if (project.projectHighlight) {
  lines.push(
    `- **项目亮点**: ${emphasizeMarkdown(project.projectHighlight)}`,
  )
}
```

- [ ] **Step 5: Synchronize the data-structure documentation**

Change the documented interface to `projectHighlight?: string` and mirror the five exact values from Step 3 in the JSON examples.

- [ ] **Step 6: Verify the semantic check passes**

Run:

```bash
if rg -n "aiRelevance|AI 相关|适合通过 AI|可使用 AI|适合体现 AI" \
  src/app/resume docs/resume-data-structure.md; then exit 1; fi
```

Expected: PASS with no output.

- [ ] **Step 7: Run static and production verification**

Run:

```bash
pnpm lint
pnpm build
```

Expected: both commands exit successfully without TypeScript, ESLint, or build errors.

- [ ] **Step 8: Review the final diff and commit**

Run:

```bash
git diff --check
git diff -- src/app/resume docs/resume-data-structure.md
git add src/app/resume docs/resume-data-structure.md
git commit -m "fix: rewrite resume project highlights"
```

Expected: the diff contains only the approved field, copy, rendering, Markdown, and documentation changes; the commit succeeds.

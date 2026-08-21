# Formal Resume PDF Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a formal PDF-only resume header and plain-text labels while preserving all contact details and leaving the web resume unchanged.

**Architecture:** Keep the existing print-only `PrintResume` and Markdown rendering pipeline. Remove the print header image, render `profile.name`, and replace print Markdown emoji with explicit text labels; shared profile data and web rendering remain untouched.

**Tech Stack:** TypeScript, React 19, Next.js 15, React Markdown, pnpm, GitHub Pages

---

## File Structure

- Modify `src/app/resume/page.tsx`: simplify the print-only identity header.
- Modify `src/app/resume/_lib/buildResumeMarkdown.ts`: formalize print-only contact and section labels.
- Verify `src/app/resume/_data/resume.ts`: source of formal name and retained contact details; no modification expected.

### Task 1: Formalize the PDF-only resume

**Files:**
- Modify: `src/app/resume/page.tsx:157-178`
- Modify: `src/app/resume/_lib/buildResumeMarkdown.ts:107-255`

- [ ] **Step 1: Run the semantic acceptance check and verify it fails**

Run:

```bash
if rg -n "profile\.displayName|👋|📍|📅|💼|📞|📮|💻|🔗|📝|🛠|🤖|📂|🎓|🤔" \
  src/app/resume/_lib/buildResumeMarkdown.ts <(sed -n '157,180p' src/app/resume/page.tsx); then exit 1; fi
```

Expected: FAIL because the print-only header and Markdown contain the old nickname and emoji.

- [ ] **Step 2: Replace the print-only identity header**

Replace the avatar and nickname block with:

```tsx
<header className="mb-6 text-center">
  <h1 className="m-0 text-4xl font-bold text-slate-950">
    {resumeData.profile.name}
  </h1>
</header>
```

Keep the existing `Image` import because the web resume still renders the avatar.

- [ ] **Step 3: Replace contact emoji with text labels**

Generate these Markdown labels without removing values or links:

```ts
`- **所在地**: ${escapeMarkdownInline(profile.location)}`
`- **工作经验**: ${profile.yearsOfExperience} 年`
`- **当前公司**: ${escapeMarkdownInline(currentCompany)}`
`- **电话**: ${buildContactLink(contact)}`
`- **邮箱**: ${emails.map((contact) => buildContactLink(contact)).join(' | ')}`
`- **GitHub**: ${buildContactLink(contact, contact.href ?? contact.value)}`
`- **链接**: ${buildContactLink(contact)}`
```

- [ ] **Step 4: Remove decorative emoji from section titles**

Use the exact print-only section titles:

```text
个人简介
技能栈
AI / Spec 工程能力
工作经历
项目经验
教育经历
自我评价
```

Do not change section contents or shared resume data.

- [ ] **Step 5: Run the semantic acceptance check and verify it passes**

Run the Step 1 command again.

Expected: PASS with no output. Separately verify the web section still contains `profile.displayName` and the avatar `Image`.

- [ ] **Step 6: Run static verification**

Run:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
git diff --check
```

Expected: all commands exit successfully; existing non-target ESLint warnings may remain, but no errors are allowed.

- [ ] **Step 7: Inspect the local resume**

Start the production server from the verified build, open `/resume`, and verify:

- the web page still shows the avatar and `PanChan - 陈宣宏`;
- print mode uses “陈宣宏” without an avatar or decorative emoji;
- phone, both email addresses, and GitHub remain present and linked;
- A4 print layout has no blank first page, clipping, or incoherent wrapping.

### Task 2: Commit, push, and deploy GitHub Pages

**Files:**
- Add: `docs/superpowers/plans/2026-08-21-formal-resume-pdf.md`
- Modify: files from Task 1

- [ ] **Step 1: Review and commit only intended files**

Run:

```bash
git status --short
git diff -- src/app/resume/page.tsx src/app/resume/_lib/buildResumeMarkdown.ts
git add docs/superpowers/plans/2026-08-21-formal-resume-pdf.md \
  src/app/resume/page.tsx src/app/resume/_lib/buildResumeMarkdown.ts
git commit -m "fix: formalize exported resume pdf"
```

Do not stage the unrelated `.claude/` directory.

- [ ] **Step 2: Verify GitHub authentication and push the source branch**

Run:

```bash
gh --version
gh auth status
git push -u origin codex/restore-resume-markdown-export
```

Expected: authentication succeeds and the branch is updated on `origin`.

- [ ] **Step 3: Publish GitHub Pages**

Run:

```bash
pnpm deploy
```

Expected: the repository builds with `NEXT_PUBLIC_REPO=panchan.github.io` and `gh-pages` publishes `out/` successfully.

- [ ] **Step 4: Verify the deployed site**

Open `https://panda2chan.github.io/panchen.github.io/resume` and confirm the resume loads, its assets render, the web avatar/nickname remain, and the PDF export entry is present.

- [ ] **Step 5: Record deployment evidence**

Run:

```bash
git status --short
git log -5 --oneline
git ls-remote --heads origin codex/restore-resume-markdown-export gh-pages
```

Expected: only the pre-existing `.claude/` remains untracked, and both source and Pages branches resolve on GitHub.

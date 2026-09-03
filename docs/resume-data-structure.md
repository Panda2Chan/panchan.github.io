# Resume Page Data Structure

## Context

- Issue: `LUC-4` 更新个人简历。
- Project path: `/Users/chenxuanhong/code/panchen.github.io`.
- Current route: `src/app/resume/page.tsx`.
- Current implementation: the resume page renders a hard-coded Markdown string with `ReactMarkdown`.
- Target implementation: keep the existing route and visual style, but move content into a typed data model so the page, metadata, print layout, and PDF export all consume one source of truth.

This document only describes the data structure. It does not require changing routing, deployment, or PDF tooling.

## Recommended File Layout

```text
src/app/resume/page.tsx             # Render page from resumeData
src/app/resume/layout.tsx           # Metadata and page shell
src/app/resume/_data/resume.ts      # ResumeData constant
src/app/resume/_data/types.ts       # TypeScript model
src/app/resume/_components/*        # Optional client-only controls such as print/export PDF button
```

If the implementation stays Markdown-first for one iteration, `resumeData` can still generate Markdown before passing content to `ReactMarkdown`.

## TypeScript Model

```ts
export type ResumeLinkType =
  | 'github'
  | 'website'
  | 'email'
  | 'phone'
  | 'location'
  | 'print'
  | 'other'

export type ResumeLevel = 'primary' | 'secondary' | 'muted'

export interface ResumeLink {
  type: ResumeLinkType
  label: string
  value: string
  href?: string
  visible: boolean
}

export interface ResumeMetric {
  label: string
  value: string
  description?: string
}

export interface ResumeProfile {
  name: string
  displayName: string
  title: string
  location: string
  yearsOfExperience: number
  avatarSrc: string
  summary: string
  highlights: string[]
  contacts: ResumeLink[]
}

export interface ResumeSkillGroup {
  id: string
  title: string
  items: string[]
  level?: ResumeLevel
}

export interface ResumeAiCapability {
  id: string
  title: string
  summary: string
  keywords: string[]
  evidence: string[]
}

export interface ResumeExperience {
  id: string
  company: string
  location: string
  industry: string
  role: string
  roleScope: string
  period: string
  summary: string
  achievements: string[]
  metrics?: ResumeMetric[]
  technologies: string[]
}

export interface ResumeProject {
  id: string
  name: string
  category: string
  role: string
  period?: string
  technologies: string[]
  summary: string
  responsibilities: string[]
  achievements: string[]
  projectHighlight?: string
  links?: ResumeLink[]
}

export interface ResumeEducation {
  school: string
  degree: string
  major?: string
  period: string
}

export interface ResumeMeta {
  pageTitle: string
  description: string
  keywords: string[]
  canonicalPath: string
  lastUpdated: string
}

export interface ResumeData {
  meta: ResumeMeta
  profile: ResumeProfile
  skillGroups: ResumeSkillGroup[]
  aiCapabilities: ResumeAiCapability[]
  experiences: ResumeExperience[]
  projects: ResumeProject[]
  education: ResumeEducation
  selfEvaluation: string[]
  print: {
    format: 'A4'
    preferredSections: string[]
    maxPages: number
  }
}
```

## JSON Example

```json
{
  "meta": {
    "pageTitle": "陈宣宏 - AI 驱动的前端开发工程师",
    "description": "陈宣宏的在线简历，侧重前端工程、AI 工具协作、Spec 驱动开发与复杂后台系统交付经验。",
    "keywords": [
      "前端开发",
      "React",
      "Vue",
      "Next.js",
      "TypeScript",
      "AI Agent",
      "Spec Driven Development"
    ],
    "canonicalPath": "/resume",
    "lastUpdated": "2026-06-17"
  },
  "profile": {
    "name": "陈宣宏",
    "displayName": "PanChan - 陈宣宏",
    "title": "AI 驱动的前端 / 全栈协作工程师",
    "location": "成都, 中国",
    "yearsOfExperience": 6,
    "avatarSrc": "/user.png",
    "summary": "拥有 6 年 Web 前端与后台系统开发经验，熟悉 Vue、React、Next.js、TypeScript 与 Node.js。重度使用 Codex、Cursor 等 AI 工具，将需求分析、规格建模、代码实现、重构验证和交付发布串成可复用的工程工作流。",
    "highlights": [
      "擅长将模糊业务需求拆解为可实现的页面结构、数据结构、验收标准和任务清单。",
      "熟悉 Spec 驱动开发 / OpenSpec 工作方式，能够先沉淀能力边界、字段映射、兼容策略，再进入实现。",
      "长期参与游戏、支付、会员、活动、数据后台、运维中台等复杂业务系统建设。",
      "能使用 AI Agent 协作完成需求梳理、代码定位、冲突处理、兼容复核、页面检查和部署交付。"
    ],
    "contacts": [
      {
        "type": "phone",
        "label": "Phone",
        "value": "+86 13281260713",
        "href": "tel:+8613281260713",
        "visible": true
      },
      {
        "type": "email",
        "label": "Email",
        "value": "a13281260713@gmail.com",
        "href": "mailto:a13281260713@gmail.com",
        "visible": true
      },
      {
        "type": "email",
        "label": "Email",
        "value": "812783357@qq.com",
        "href": "mailto:812783357@qq.com",
        "visible": true
      },
      {
        "type": "github",
        "label": "GitHub",
        "value": "Panda2Chan",
        "href": "https://github.com/Panda2Chan",
        "visible": true
      }
    ]
  },
  "skillGroups": [
    {
      "id": "frontend",
      "title": "前端框架",
      "items": ["Vue2", "Vue3", "React", "Next.js", "React Native"],
      "level": "primary"
    },
    {
      "id": "language-tooling",
      "title": "语言与工程化",
      "items": ["TypeScript", "JavaScript", "HTML5", "CSS3", "Git", "pnpm", "Vite", "Webpack", "TurboRepo"],
      "level": "primary"
    },
    {
      "id": "ui-data-viz",
      "title": "UI 与可视化",
      "items": ["Tailwind CSS", "shadcn/ui", "Ant Design", "Element UI", "Arco Design", "VXE-Table", "ECharts", "D3.js", "Canvas", "Pixi.js"],
      "level": "primary"
    },
    {
      "id": "backend",
      "title": "后端与数据",
      "items": ["Node.js", "Golang", "MongoDB", "MySQL", "Redis", "REST API"],
      "level": "secondary"
    },
    {
      "id": "ai-tools",
      "title": "AI 工具链",
      "items": ["Codex", "Claude", "OpenSpec", "Superpowers", "Cursor", "ChatGPT", "v0", "Grok", "AI Agent 协作"],
      "level": "primary"
    }
  ],
  "aiCapabilities": [
    {
      "id": "codex-claude-collaboration",
      "title": "Codex / Claude 协作开发",
      "summary": "日常使用 Codex 与 Claude 辅助代码检索、方案对比和重复性编码，缩短人工定位、初稿整理与回归核对时间。",
      "keywords": ["Codex", "Claude", "代码检索", "方案对比", "影响检查"],
      "evidence": [
        "在游戏管理后台等跨模块改造中，使用 Codex 与 Claude 辅助建立模块、接口和字段关联，再人工确认业务规则与影响范围。",
        "面对 KOL Scout 的多平台 Provider、缓存、队列、鉴权和限流链路，使用 Codex 与 Claude 加快代码定位与实现比对，将精力集中在数据源降级和结果质量判断上。"
      ]
    },
    {
      "id": "openspec-driven-development",
      "title": "OpenSpec 规格驱动",
      "summary": "在复杂改造前使用 OpenSpec 明确功能范围、数据结构、兼容策略、异常分支和验收条件，再让 AI 参与实现。",
      "keywords": ["OpenSpec", "数据建模", "字段映射", "兼容策略", "异常分支"],
      "evidence": [
        "针对游戏后台的模板、条件、事件和事件类型等配置能力，使用 OpenSpec 梳理数据模型及前后端映射关系，再推进页面与接口协作。",
        "在 MTPay 登录、资产、订单和交易记录等核心路径中，借助 OpenSpec 约定组件职责与状态边界，避免 AI 修改表单或弹窗时破坏既有交互。"
      ]
    },
    {
      "id": "superpowers-engineering-workflow",
      "title": "Superpowers 工程工作流",
      "summary": "通过 Superpowers 将任务拆解、测试驱动、系统化调试、代码审查和完成前验证串成固定流程，使 AI 产出可持续复核。",
      "keywords": ["Superpowers", "TDD", "系统化调试", "代码审查", "完成前验证"],
      "evidence": [
        "处理 KOL Scout 的多数据源、缓存与队列改动时，使用 Superpowers 按失败检查、实现、审查和回归验证推进，避免多链路变更只依赖一次生成。",
        "遇到 SRE 构建或运行异常时，按 Superpowers 的系统化调试步骤读取 Jenkins、监控和日志证据，再定位代码问题。"
      ]
    },
    {
      "id": "ai-error-boundary-control",
      "title": "AI 错误边界控制",
      "summary": "不直接采纳 AI 结论，以源码、接口和真实数据流为依据，通过类型检查、自动化测试、构建结果与关键页面复核限定错误边界。",
      "keywords": ["源码核验", "数据流复核", "类型检查", "自动化测试", "人工决策"],
      "evidence": [
        "对跨模块改动逐项核对调用入口、字段来源和异常分支，涉及业务取舍、兼容策略和敏感操作时保留人工决策。",
        "对 AI 生成结果执行 TypeScript 检查、自动化测试和生产构建，并复核关键页面表现，发现偏差后回到源码修正。"
      ]
    }
  ],
  "experiences": [
    {
      "id": "xmj",
      "company": "成都星迈吉科技有限公司",
      "location": "成都",
      "industry": "海外游戏",
      "role": "Web 开发工程师",
      "roleScope": "全栈，偏前端",
      "period": "2024 - 至今",
      "summary": "负责多款海外游戏项目后台、推广页、钱包 App 与工程化体系建设。",
      "achievements": [
        "负责海外游戏项目后台开发与优化，支撑高频数据交互场景。",
        "主导 Next.js SSR 落地页优化，提升首屏加载表现和 SEO 可见性。",
        "参与 pnpm + TurboRepo 多包架构设计，统一组件库标准并减少重复代码。",
        "使用 React Native 构建钱包 App，抽象表单、弹窗、输入等通用组件。",
        "结合 AI 工具进行需求拆解、代码生成、问题定位和重构复核，提高交付效率。"
      ],
      "metrics": [
        {
          "label": "首屏优化",
          "value": "40%+",
          "description": "Next.js SSR 落地页加载速度提升"
        },
        {
          "label": "组件复用",
          "value": "30%+",
          "description": "React Native 通用组件封装提升开发效率"
        }
      ],
      "technologies": ["Next.js", "React", "React Native", "TypeScript", "Tailwind CSS", "pnpm", "TurboRepo"]
    },
    {
      "id": "leishou",
      "company": "成都雷兽互动科技有限公司",
      "location": "成都",
      "industry": "国内小游戏",
      "role": "服务器开发",
      "roleScope": "全栈，偏前端",
      "period": "2020 - 2024",
      "summary": "主导游戏管理后台、数据后台、OA、SDK 配置后台等系统开发维护。",
      "achievements": [
        "主导大数据管理后台、OA 管理后台、SDK 配置后台开发与维护。",
        "接入广告商 SDK，完成广告事件采集、归因上报和数据分析。",
        "基于 Vue3 + ECharts 构建数据可视化平台，支持漏斗、留存、投放转化等分析。",
        "使用 Golang 实现统计分析服务，支持百万级用户数据聚合和展示。",
        "沉淀后台权限、操作日志、查询配置化等通用能力，提升系统可维护性。"
      ],
      "metrics": [
        {
          "label": "广告数据",
          "value": "500w+ / day",
          "description": "日均处理广告事件与归因数据"
        },
        {
          "label": "接口优化",
          "value": "40%+",
          "description": "后台查询接口响应时间降低"
        }
      ],
      "technologies": ["Vue2", "Vue3", "Element UI", "Arco Design", "ECharts", "Golang", "MySQL", "Redis"]
    }
  ],
  "projects": [
    {
      "id": "kol-scout",
      "name": "KOL Scout",
      "category": "AI KOL 发现工具 / Chrome 插件",
      "role": "个人项目 / 全栈开发",
      "technologies": [
        "Chrome Extension MV3",
        "JavaScript",
        "Node.js",
        "Tailwind CSS",
        "OpenAI API",
        "Redis"
      ],
      "summary": "面向出海团队的 KOL 发现与运营 Chrome 插件，覆盖 TikTok、YouTube 和 X 的创作者召回、筛选、保存与导出。",
      "responsibilities": [
        "设计 Chrome Side Panel 交互，以及候选筛选、线索保存和 CSV 导出工作流。",
        "构建 TikTok、YouTube、X 多平台 Provider 与公开资料补全能力。",
        "接入 AI 搜索规划、候选清洗、质量过滤、语义评分和结果重排。"
      ],
      "achievements": [
        "持续迭代至 v1.3.1，完成多数据源降级、缓存、队列、鉴权和限流能力。",
        "建立自动化测试与扩展打包流程，覆盖核心发现和发布链路。"
      ],
      "projectHighlight": "构建覆盖跨平台搜索、智能筛选、线索管理和结果导出的 KOL 发现闭环。"
    },
    {
      "id": "mtpay-wallet",
      "name": "MTPay 钱包",
      "category": "移动端钱包",
      "role": "React Native 前端开发",
      "technologies": ["React Native", "TypeScript"],
      "summary": "移动端钱包应用，覆盖登录注册、资产管理、订单交易和记录查询等核心路径。",
      "responsibilities": [
        "封装 Input、Text、Form、Confirm、Modal 等基础和业务组件。",
        "优化表单状态、弹窗交互和交易记录页面体验。",
        "参与用户登录注册、资产管理、订单交易等业务页面开发。"
      ],
      "achievements": [
        "组件复用率提升 40%+。",
        "减少表单和交互状态异常。"
      ],
      "projectHighlight": "围绕钱包核心交易流程沉淀可复用组件体系，统一表单、弹窗与状态交互。"
    },
    {
      "id": "campaign-pages",
      "name": "游戏推广页 / 活动页",
      "category": "增长与投放",
      "role": "Next.js 前端开发",
      "technologies": ["Next.js", "React", "Tailwind CSS", "SEO", "i18n"],
      "summary": "面向海外游戏引流、品牌展示和活动宣传的多语言响应式页面。",
      "responsibilities": [
        "实现响应式布局、多语言、社媒爬虫优化和 SEO 配置。",
        "处理活动接口、缓存策略、埋点和分享链路。",
        "优化首屏性能与构建发布流程。"
      ],
      "achievements": [
        "提升页面加载速度和搜索/社媒展示质量。",
        "沉淀可复用的落地页实现模式。"
      ],
      "projectHighlight": "形成兼顾多语言、SEO、社媒传播与首屏性能的海外游戏营销页面交付体系。"
    },
    {
      "id": "game-admin-systems",
      "name": "游戏管理后台 / 数据后台 / 客服后台",
      "category": "复杂后台系统",
      "role": "前端主程 / 全栈协作",
      "technologies": ["Vue2", "Vue3", "Element UI", "Arco Design", "VXE-Table", "ECharts", "Golang"],
      "summary": "覆盖游戏参数、活动配置、用户数据、订单交易、客服工单和数据分析的后台体系。",
      "responsibilities": [
        "设计权限管理、操作日志、配置化查询和数据可视化模块。",
        "抽象模板、条件、事件、事件类型等配置能力，支持用户自定义查询。",
        "优化服务器查询速度和前端表格/图表展示性能。"
      ],
      "achievements": [
        "前端开发成本降低 40%。",
        "可视化分析维度扩展 3 倍。",
        "提升后台系统一致性、可维护性和问题排查效率。"
      ],
      "projectHighlight": "建设覆盖配置、权限、用户、交易、客服与数据分析的一体化游戏运营后台。"
    },
    {
      "id": "sre-platform",
      "name": "SRE 运维中台",
      "category": "工程平台",
      "role": "前端开发",
      "technologies": ["Vue3", "Element Plus", "Jenkins", "CI/CD"],
      "summary": "提供项目构建部署、监控告警、日志分析等运维能力。",
      "responsibilities": [
        "集成 Jenkins CI/CD 流程。",
        "完善监控告警与日志分析页面。",
        "优化部署过程中的状态展示和异常排查体验。"
      ],
      "achievements": [
        "部署效率提升 60%+。",
        "提升异常发现和问题定位效率。"
      ],
      "projectHighlight": "打通持续部署、监控告警与日志分析链路，提升发布效率和故障定位能力。"
    }
  ],
  "education": {
    "school": "成都师范学院",
    "degree": "统招本科",
    "major": "",
    "period": "2015.09 - 2019.07"
  },
  "selfEvaluation": [
    "关注工程效率和交付确定性，习惯先明确需求、数据结构和验收标准再进入实现。",
    "乐于尝试 AI 工具与 Agent 协作方式，能把新工具转化为稳定的开发流程。",
    "熟悉复杂后台业务，能在前端、接口、数据和部署之间快速建立问题闭环。",
    "保持持续学习，关注 GitHub、前端工程化、AI 编程工具和产品化交付实践。"
  ],
  "print": {
    "format": "A4",
    "preferredSections": [
      "profile",
      "skillGroups",
      "aiCapabilities",
      "experiences",
      "projects",
      "education"
    ],
    "maxPages": 2
  }
}
```

## Rendering Mapping

| Data path | Resume UI section | Notes |
| --- | --- | --- |
| `profile` | Header + personal summary | Keep phone/email/GitHub visible. Avoid exposing local Codex paths. |
| `skillGroups` | Skill stack | Render as grouped tags or compact lists. Keep `ai-tools` prominent. |
| `aiCapabilities` | AI engineering capability highlights | Use cards or subsections. Each item should include evidence, not only slogans. |
| `experiences` | Work experience | Render in reverse chronological order. Show metrics close to achievements. |
| `projects` | Project experience | Prioritize projects that support AI/spec-driven positioning. |
| `education` | Education | Compact one-line section. |
| `selfEvaluation` | Self evaluation | Keep concise; avoid informal or overly personal claims in the PDF version. |
| `print` | PDF export constraints | Used by print CSS or PDF script to choose section order and page budget. |

## Field Rules

- `id` values must be stable kebab-case strings for React keys and anchors.
- `contacts[].visible=false` allows keeping a field in data while hiding it from public page/PDF.
- `href` should only be present when it is safe to expose publicly.
- `aiCapabilities[].evidence` must describe real work patterns, but must not include secrets, private repo names, tokens, client-sensitive details, or local filesystem paths.
- `metrics[].value` should be human-readable strings because resume metrics often include units like `40%+` or `500w+ / day`.
- `print.maxPages` should default to `2` for a delivery-friendly browser print layout.
- Dates may stay as display strings (`period`) because the resume is presentation-oriented and does not currently need date arithmetic.

## Implementation Notes

1. Introduce `src/app/resume/_data/types.ts` with the TypeScript model above.
2. Introduce `src/app/resume/_data/resume.ts` exporting `resumeData: ResumeData`.
3. Update `src/app/resume/layout.tsx` metadata from `resumeData.meta`.
4. Update `src/app/resume/page.tsx` to render structured sections from `resumeData`.
5. Add a print-only resume document and print CSS in `src/app/globals.css` or route-level CSS:
   - A4 page size.
   - Avoid breaking inside experience/project blocks.
   - Hide navigation-only elements such as back-home buttons in print.
   - Hide the rich web layout in print and render a classic vertical resume layout for HR-friendly PDF export.
   - Keep font sizes readable and avoid emoji-heavy PDF output if the renderer has font issues.
6. Provide a web-page export control that triggers the browser print dialog from the final rendered `/resume` page; users can choose "Save as PDF" locally.

## Acceptance Checklist For Frontend Development

- `resumeData` contains profile, contacts, skills, AI capabilities, work experience, project experience, education, self evaluation, and print settings.
- The resume page clearly emphasizes AI tools, AI Agent collaboration, and Spec-driven development.
- The page no longer requires editing a large Markdown string for content changes.
- Desktop and mobile layouts remain readable.
- Browser print output uses the dedicated vertical resume layout, is A4-friendly, and does not cut through major sections.
- Public content avoids sensitive Codex history details, tokens, private customer details, and local machine paths.

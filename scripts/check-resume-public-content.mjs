import { readFileSync } from 'node:fs'

const publicContentFiles = [
  'out/resume.html',
  'out/resume.txt',
  'docs/resume-data-structure.md',
]

const forbiddenRules = [
  ['简历制作元文案', /抽象简历素材|招聘投递材料/u],
  ['隐私处理元文案', /隐私路径|客户敏感信息/u],
  ['实现核验指令', /核验项目目录|页面入口[和、]现有约束/u],
  ['改造过程指令', /隐藏调用点|字段流向和提交路径|生成实现方案、维护兼容路径/u],
  [
    '交付验收元文案',
    /避免只完成代码而未完成交付|最终交付(?:应)?包含.{0,40}(?:GitHub 提交|验收结果)/u,
  ],
  [
    'Agent 工作流模板',
    /Spec \/ Agent 工作流|读取 issue、产品文档|需求摘要.{0,12}约束清单.{0,12}信息缺口|页面映射规则|构建结果.{0,12}线上地址.{0,12}交付验证/u,
  ],
]

const requiredRules = [
  ['Codex / Claude 协作开发', /Codex \/ Claude 协作开发/u],
  ['OpenSpec 规格驱动', /OpenSpec 规格驱动/u],
  ['Superpowers 工程工作流', /Superpowers 工程工作流/u],
  ['AI 错误边界控制', /AI 错误边界控制/u],
]

const normalize = (content) => content.normalize('NFKC').replace(/\s+/gu, ' ')

const failures = []

for (const file of publicContentFiles) {
  let content

  try {
    content = normalize(readFileSync(file, 'utf8'))
  } catch (error) {
    failures.push(`${file}: 无法读取公开内容 (${error.message})`)
    continue
  }

  for (const [ruleName, pattern] of forbiddenRules) {
    const match = content.match(pattern)

    if (!match || match.index === undefined) {
      continue
    }

    const start = Math.max(0, match.index - 30)
    const end = Math.min(content.length, match.index + match[0].length + 30)
    failures.push(`${file}: ${ruleName}: ...${content.slice(start, end)}...`)
  }

  for (const [ruleName, pattern] of requiredRules) {
    if (!pattern.test(content)) {
      failures.push(`${file}: 缺少必要内容: ${ruleName}`)
    }
  }
}

if (failures.length > 0) {
  console.error('简历公开内容检查失败：')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exit(1)
}

console.log('简历公开内容检查通过。')

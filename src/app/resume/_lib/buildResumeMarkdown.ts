import type { ResumeData, ResumeLink } from '../_data/types'

const emphasisTerms = [
  'AI Agent',
  'AI 工具',
  'Codex',
  'Cursor',
  'Golang',
  'Jenkins CI/CD',
  'Next.js',
  'Node.js',
  'OpenSpec',
  'React Native',
  'React',
  'Spec 驱动开发',
  'TypeScript',
  'Vue3 + ECharts',
  'Vue',
  'pnpm + TurboRepo',
  '6 年',
  '40%+',
  '30%+',
  '500w+ / day',
  '百万级用户',
  '前端开发成本降低 40%',
  '可视化分析维度扩展 3 倍',
  '部署效率提升 60%+',
  '需求分析',
  '规格建模',
  '代码实现',
  '重构验证',
  '交付发布',
  '工程效率',
  '交付确定性',
  '数据结构',
  '验收标准',
  '稳定的开发流程',
  '复杂后台业务',
  '问题闭环',
  '前端工程化',
  '产品化交付',
] as const

const sortedEmphasisTerms = [...emphasisTerms].sort(
  (first, second) => second.length - first.length,
)
const emphasisTermSet = new Set<string>(sortedEmphasisTerms)
const emphasisPattern = new RegExp(
  `(${sortedEmphasisTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g',
)

const normalizeInlineText = (value: string) => value.replace(/\s+/g, ' ').trim()

const escapeMarkdownFragment = (value: string) =>
  value.replace(/([\\`*_[\]{}()#+.!|<>~>-])/g, '\\$1')

const escapeMarkdownInline = (value: string) =>
  escapeMarkdownFragment(normalizeInlineText(value))

const emphasizeMarkdown = (value: string) =>
  normalizeInlineText(value)
    .split(emphasisPattern)
    .map((part) => {
      const escapedPart = escapeMarkdownFragment(part)

      return emphasisTermSet.has(part) ? `**${escapedPart}**` : escapedPart
    })
    .join('')

const safeContactHref = (href?: string) => {
  if (!href || !/^(?:https?:|mailto:|tel:)/i.test(href)) {
    return null
  }

  return encodeURI(href).replace(/[<>]/g, (character) =>
    character === '<' ? '%3C' : '%3E',
  )
}

const buildContactLink = (contact: ResumeLink, text = contact.value) => {
  const href = safeContactHref(contact.href)
  const escapedText = escapeMarkdownInline(text)

  return href ? `[${escapedText}](<${href}>)` : escapedText
}

const joinDetails = (
  items: Array<string | undefined>,
  separator = ' | ',
) =>
  items
    .map((item) => item?.trim())
    .filter((item): item is string => Boolean(item))
    .map(escapeMarkdownInline)
    .join(separator)

const pushSection = (lines: string[], title: string) => {
  lines.push('---', '', `## ${title}`, '')
}

const pushList = (lines: string[], items: string[], indent = '') => {
  items.forEach((item) => lines.push(`${indent}- ${emphasizeMarkdown(item)}`))
  lines.push('')
}

export function buildResumeMarkdown(data: ResumeData): string {
  const { profile } = data
  const contacts = profile.contacts.filter(
    (contact) => contact.visible && contact.type !== 'print',
  )
  const phones = contacts.filter((contact) => contact.type === 'phone')
  const emails = contacts.filter((contact) => contact.type === 'email')
  const githubLinks = contacts.filter((contact) => contact.type === 'github')
  const otherLinks = contacts.filter(
    (contact) => !['phone', 'email', 'github', 'location'].includes(contact.type),
  )
  const currentCompany = data.experiences[0]?.company
  const lines: string[] = ['---', '']

  lines.push(
    `- **所在地**: ${escapeMarkdownInline(profile.location)}`,
    `- **工作经验**: ${profile.yearsOfExperience}年`,
  )

  if (currentCompany) {
    lines.push(`- **当前公司**: ${escapeMarkdownInline(currentCompany)}`)
  }

  phones.forEach((contact) => {
    lines.push(`- **电话**: ${buildContactLink(contact)}`)
  })

  if (emails.length > 0) {
    lines.push(
      `- **邮箱**: ${emails.map((contact) => buildContactLink(contact)).join(' | ')}`,
    )
  }

  githubLinks.forEach((contact) => {
    lines.push(
      `- **GitHub**: ${buildContactLink(contact, contact.href ?? contact.value)}`,
    )
  })

  otherLinks.forEach((contact) => {
    lines.push(`- **链接**: ${buildContactLink(contact)}`)
  })
  lines.push('')

  pushSection(lines, '个人简介')
  pushList(lines, [profile.summary, ...profile.highlights])

  pushSection(lines, '技能栈')
  data.skillGroups.forEach((group) => {
    lines.push(
      `- **${escapeMarkdownInline(group.title)}**: ${escapeMarkdownInline(group.items.join(', '))}`,
    )
  })
  lines.push('')

  pushSection(lines, 'AI / Spec 工程能力')
  data.aiCapabilities.forEach((capability) => {
    lines.push(
      `### ${escapeMarkdownInline(capability.title)}`,
      '',
      `- ${emphasizeMarkdown(capability.summary)}`,
      `- **关键词**: ${escapeMarkdownInline(capability.keywords.join(', '))}`,
      '- **实践**:',
    )
    pushList(lines, capability.evidence, '  ')
  })

  pushSection(lines, '工作经历')
  data.experiences.forEach((experience) => {
    lines.push(
      `### ${joinDetails([experience.company, experience.location, experience.industry])}`,
      '',
      `**${joinDetails([
        experience.role,
        experience.roleScope,
        experience.period,
      ])}**`,
      '',
      `- ${emphasizeMarkdown(experience.summary)}`,
    )

    experience.metrics?.forEach((metric) => {
      const description = metric.description
        ? `: ${emphasizeMarkdown(metric.description)}`
        : ''
      lines.push(
        `- **${escapeMarkdownInline(`${metric.label} ${metric.value}`)}**${description}`,
      )
    })
    experience.achievements.forEach((achievement) => {
      lines.push(`- ${emphasizeMarkdown(achievement)}`)
    })
    lines.push(
      `- **技术栈**: ${escapeMarkdownInline(experience.technologies.join(', '))}`,
      '',
    )
  })

  pushSection(lines, '项目经验')
  data.projects.forEach((project) => {
    lines.push(
      `### ${escapeMarkdownInline(project.name)}`,
      '',
      `- **类型**: ${escapeMarkdownInline(project.category)}`,
      `- **角色**: ${escapeMarkdownInline(project.role)}`,
      `- **技术栈**: ${escapeMarkdownInline(project.technologies.join(', '))}`,
      `- **功能**: ${emphasizeMarkdown(project.summary)}`,
      '- **贡献**:',
    )
    pushList(lines, [...project.responsibilities, ...project.achievements], '  ')

    if (project.projectHighlight) {
      lines.push(`- **项目亮点**: ${escapeMarkdownInline(project.projectHighlight)}`)
    }

    const visibleProjectLinks = project.links?.filter((link) => link.visible) ?? []

    if (visibleProjectLinks.length > 0) {
      lines.push(
        `- **链接**: ${visibleProjectLinks.map((link) => buildContactLink(link)).join(' | ')}`,
        '',
      )
    }
  })

  pushSection(lines, '教育经历')
  lines.push(
    `- ${joinDetails([
      data.education.degree,
      data.education.school,
      data.education.major,
      data.education.period,
    ])}`,
    '',
  )

  pushSection(lines, '自我评价')
  pushList(lines, data.selfEvaluation)

  return `${lines.join('\n').trim()}\n`
}

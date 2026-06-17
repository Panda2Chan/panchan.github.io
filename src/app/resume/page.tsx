import Image from 'next/image'
import {
  Bot,
  BriefcaseBusiness,
  Code2,
  Download,
  GraduationCap,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Workflow,
} from 'lucide-react'
import BackHome from '@/components/page/backHome'
import { resumeData } from './_data/resume'
import type { ResumeLink, ResumeLevel } from './_data/types'

const visibleContacts = resumeData.profile.contacts.filter((contact) => contact.visible)

const contactIcon = (type: ResumeLink['type']) => {
  switch (type) {
    case 'phone':
      return <Phone aria-hidden="true" className="size-4" />
    case 'email':
      return <Mail aria-hidden="true" className="size-4" />
    case 'location':
      return <MapPin aria-hidden="true" className="size-4" />
    case 'pdf':
      return <Download aria-hidden="true" className="size-4" />
    default:
      return <LinkIcon aria-hidden="true" className="size-4" />
  }
}

const tagTone: Record<ResumeLevel, string> = {
  primary: 'border-slate-300 bg-slate-950 text-white',
  secondary: 'border-slate-200 bg-slate-100 text-slate-700',
  muted: 'border-slate-200 bg-white text-slate-600',
}

function ContactLink({ contact }: { contact: ResumeLink }) {
  const content = (
    <>
      {contactIcon(contact.type)}
      <span>{contact.value}</span>
    </>
  )

  const className =
    'inline-flex min-h-9 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950 print:min-h-0 print:border-0 print:bg-transparent print:px-0 print:py-0 print:text-[10px]'

  if (!contact.href) {
    return <span className={className}>{content}</span>
  }

  return (
    <a className={className} href={contact.href}>
      {content}
    </a>
  )
}

function Section({
  eyebrow,
  title,
  children,
  icon,
  className = '',
}: {
  eyebrow?: string
  title: string
  children: React.ReactNode
  icon: React.ReactNode
  className?: string
}) {
  return (
    <section className={`resume-section ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4 print:mb-2">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 print:text-[9px]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-2xl font-semibold text-slate-950 print:text-base">{title}</h2>
        </div>
        <div className="grid size-10 shrink-0 place-items-center rounded-md border border-slate-200 bg-slate-50 text-slate-700 print:hidden">
          {icon}
        </div>
      </div>
      {children}
    </section>
  )
}

function TagList({
  items,
  level = 'muted',
  printLimit,
}: {
  items: string[]
  level?: ResumeLevel
  printLimit?: number
}) {
  return (
    <div className="flex flex-wrap gap-2 print:gap-1">
      {items.map((item, index) => (
        <span
          className={`rounded-md border px-2.5 py-1 text-xs font-medium ${tagTone[level]} print:border-slate-300 print:bg-transparent print:px-1.5 print:py-0.5 print:text-[9px] print:text-slate-700 ${printLimit && index >= printLimit ? 'print:hidden' : ''}`}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function CompactList({
  items,
  printLimit,
}: {
  items: string[]
  printLimit?: number
}) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-slate-700 print:space-y-0.5 print:text-[10px] print:leading-4">
      {items.map((item, index) => (
        <li className={`flex gap-2 ${printLimit && index >= printLimit ? 'print:hidden' : ''}`} key={item}>
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-slate-400 print:mt-1.5 print:size-1" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Resume() {
  return (
    <main className="resume-page mx-auto max-w-5xl rounded-lg border border-slate-200 bg-white shadow-sm print:border-0 print:shadow-none">
      <header className="resume-section border-b border-slate-200 bg-slate-50/80 p-6 sm:p-8 print:border-b print:bg-white print:p-0 print:pb-3">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between print:flex-row print:gap-4">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center print:flex-row print:gap-3">
            <Image
              alt={resumeData.profile.displayName}
              className="size-24 rounded-full border border-slate-200 object-cover print:size-16"
              height={96}
              priority
              src={resumeData.profile.avatarSrc}
              width={96}
            />
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 print:mb-1 print:text-[9px]">
                Resume
              </p>
              <h1 className="text-4xl font-bold tracking-normal text-slate-950 print:text-2xl">
                {resumeData.profile.displayName}
              </h1>
              <p className="mt-2 text-lg font-medium text-slate-700 print:mt-1 print:text-xs">
                {resumeData.profile.title}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 print:mt-1 print:text-[10px]">
                <MapPin aria-hidden="true" className="size-4 print:size-3" />
                {resumeData.profile.location} · {resumeData.profile.yearsOfExperience} 年经验
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:max-w-xs sm:justify-end print:max-w-none print:gap-x-3 print:gap-y-1">
            {visibleContacts.map((contact) => (
              <ContactLink contact={contact} key={`${contact.type}-${contact.value}`} />
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-4xl text-base leading-8 text-slate-700 print:mt-3 print:text-[10.5px] print:leading-4">
          {resumeData.profile.summary}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 print:mt-3 print:grid-cols-2 print:gap-1.5">
          {resumeData.profile.highlights.map((highlight, index) => (
            <div
              className={`rounded-md border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700 print:p-1.5 print:text-[9.5px] print:leading-4 ${index > 1 ? 'print:hidden' : ''}`}
              key={highlight}
            >
              {highlight}
            </div>
          ))}
        </div>
      </header>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px] print:grid-cols-[minmax(0,1fr)_250px]">
        <div className="space-y-0">
          <Section
            eyebrow="AI Engineering"
            icon={<Bot aria-hidden="true" className="size-5" />}
            title="AI 工程能力"
          >
            <div className="grid gap-3 sm:grid-cols-2 print:grid-cols-2 print:gap-2">
              {resumeData.aiCapabilities.map((capability) => (
                <article className="resume-card" key={capability.id}>
                  <h3 className="text-base font-semibold text-slate-950 print:text-xs">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 print:mt-1 print:text-[9.5px] print:leading-4">
                    {capability.summary}
                  </p>
                  <TagList items={capability.keywords} printLimit={3} />
                  <CompactList items={capability.evidence} printLimit={1} />
                </article>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Experience"
            icon={<BriefcaseBusiness aria-hidden="true" className="size-5" />}
            title="工作经历"
          >
            <div className="space-y-5 print:space-y-3">
              {resumeData.experiences.map((experience) => (
                <article className="resume-block" key={experience.id}>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between print:flex-row print:gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-950 print:text-sm">{experience.company}</h3>
                      <p className="mt-1 text-sm text-slate-600 print:mt-0 print:text-[10px]">
                        {experience.role} · {experience.roleScope} · {experience.industry}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-slate-500 print:text-[10px]">
                      {experience.period} · {experience.location}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700 print:mt-1.5 print:text-[10px] print:leading-4">
                    {experience.summary}
                  </p>
                  {experience.metrics?.length ? (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 print:mt-2 print:grid-cols-2 print:gap-1.5">
                      {experience.metrics.map((metric) => (
                        <div className="rounded-md bg-slate-50 p-3 print:bg-white print:p-1" key={metric.label}>
                          <p className="text-lg font-bold text-slate-950 print:text-xs">{metric.value}</p>
                          <p className="text-xs font-semibold text-slate-500 print:text-[9px]">{metric.label}</p>
                          {metric.description ? (
                            <p className="mt-1 text-xs text-slate-600 print:mt-0 print:text-[9px]">
                              {metric.description}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-3 print:mt-1.5">
                    <CompactList items={experience.achievements} printLimit={3} />
                  </div>
                  <div className="mt-3 print:mt-1.5">
                    <TagList items={experience.technologies} printLimit={6} />
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            eyebrow="Projects"
            icon={<Code2 aria-hidden="true" className="size-5" />}
            title="项目经历"
          >
            <div className="grid gap-4 sm:grid-cols-2 print:grid-cols-2 print:gap-2">
              {resumeData.projects.map((project, index) => (
                <article className={`resume-card ${index > 2 ? 'print:hidden' : ''}`} key={project.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950 print:text-xs">{project.name}</h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 print:text-[8px]">
                        {project.category}
                      </p>
                    </div>
                    <p className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 print:bg-white print:p-0 print:text-[8px]">
                      {project.role}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700 print:mt-1 print:text-[9.5px] print:leading-4">
                    {project.summary}
                  </p>
                  <CompactList items={[...project.responsibilities, ...project.achievements]} printLimit={3} />
                  {project.aiRelevance?.length ? (
                    <div className="mt-3 rounded-md bg-slate-50 p-3 text-xs leading-5 text-slate-600 print:hidden">
                      {project.aiRelevance.join(' ')}
                    </div>
                  ) : null}
                  <TagList items={project.technologies} printLimit={5} />
                </article>
              ))}
            </div>
          </Section>
        </div>

        <aside className="border-t border-slate-200 lg:border-l lg:border-t-0 print:border-l print:border-t-0">
          <Section
            className="lg:border-t-0 print:border-t-0"
            eyebrow="Skills"
            icon={<Sparkles aria-hidden="true" className="size-5" />}
            title="技术栈"
          >
            <div className="space-y-4 print:space-y-2">
              {resumeData.skillGroups.map((group) => (
                <div className="resume-block" key={group.id}>
                  <h3 className="mb-2 text-sm font-semibold text-slate-950 print:mb-1 print:text-[10px]">
                    {group.title}
                  </h3>
                  <TagList items={group.items} level={group.level} printLimit={6} />
                </div>
              ))}
            </div>
          </Section>

          <Section
            className="print:hidden"
            eyebrow="Workflow"
            icon={<Workflow aria-hidden="true" className="size-5" />}
            title="Spec / Agent 工作流"
          >
            <ol className="space-y-3 print:space-y-1.5">
              {resumeData.aiWorkflow.map((step, index) => (
                <li className="resume-block" key={step.id}>
                  <div className="flex gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-md bg-slate-950 text-xs font-bold text-white print:size-5 print:text-[9px]">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-950 print:text-[10px]">{step.title}</h3>
                      <p className="mt-1 text-xs leading-5 text-slate-600 print:mt-0 print:text-[9px] print:leading-4">
                        {step.description}
                      </p>
                      <p className="mt-2 text-xs text-slate-500 print:mt-0.5 print:text-[8.5px]">
                        {step.outputs.join(' / ')}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section
            eyebrow="Education"
            icon={<GraduationCap aria-hidden="true" className="size-5" />}
            title="教育经历"
          >
            <div className="resume-block">
              <h3 className="text-base font-semibold text-slate-950 print:text-xs">{resumeData.education.school}</h3>
              <p className="mt-1 text-sm text-slate-600 print:text-[10px]">
                {resumeData.education.degree}
                {resumeData.education.major ? ` · ${resumeData.education.major}` : ''}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500 print:text-[10px]">
                {resumeData.education.period}
              </p>
            </div>
          </Section>

          <Section
            className="print:hidden"
            eyebrow="Self Review"
            icon={<Sparkles aria-hidden="true" className="size-5" />}
            title="自我评价"
          >
            <CompactList items={resumeData.selfEvaluation} />
          </Section>
        </aside>
      </div>

      <div className="resume-actions p-6 sm:p-8 print:hidden">
        <BackHome />
      </div>
    </main>
  )
}

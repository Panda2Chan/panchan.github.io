export type ResumeLinkType =
  | 'github'
  | 'website'
  | 'email'
  | 'phone'
  | 'location'
  | 'pdf'
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

export interface ResumeWorkflowStep {
  id: string
  title: string
  description: string
  outputs: string[]
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
  aiRelevance?: string[]
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
  pdfFileName: string
  lastUpdated: string
}

export interface ResumeData {
  meta: ResumeMeta
  profile: ResumeProfile
  skillGroups: ResumeSkillGroup[]
  aiCapabilities: ResumeAiCapability[]
  aiWorkflow: ResumeWorkflowStep[]
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

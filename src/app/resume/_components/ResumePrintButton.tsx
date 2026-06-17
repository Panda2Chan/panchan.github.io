'use client'

import { Download } from 'lucide-react'

interface ResumePrintButtonProps {
  className?: string
  label: string
}

export default function ResumePrintButton({ className, label }: ResumePrintButtonProps) {
  return (
    <button
      aria-label={label}
      className={`${className ?? ''} print:hidden`}
      onClick={() => window.print()}
      type="button"
    >
      <Download aria-hidden="true" className="size-4" />
      <span>{label}</span>
    </button>
  )
}

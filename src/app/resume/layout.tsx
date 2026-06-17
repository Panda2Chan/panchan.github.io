import type { Metadata } from "next";
import { resumeData } from "./_data/resume";


export const metadata: Metadata = {
  title: resumeData.meta.pageTitle,
  description: resumeData.meta.description,
  keywords: resumeData.meta.keywords,
  alternates: {
    canonical: resumeData.meta.canonicalPath,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="resume-shell mx-auto min-h-screen max-w-5xl bg-white px-4 py-6 text-slate-900 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
      {children}
    </div>
  );
}

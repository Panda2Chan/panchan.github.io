import { div } from "motion/react-client";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "PanChan - 诗",
  description: "PanChan - 诗",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-amber-100 text-gray-800">
      <div className="max-w-3xl prose rounded-md  mx-auto pb-6 ">
        {children}
      </div>
    </div>

  );
}

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "PanChan - 近日随笔",
  description: "PanChan - 近日随笔",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-3xl prose my-10 rounded-md  mx-auto p-6 bg-white">
      {children}
    </div>
  );
}

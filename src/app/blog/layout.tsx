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
    <>
      {children}
    </>
  );
}

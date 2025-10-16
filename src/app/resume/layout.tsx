import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "陈宣宏 - 前端开发",
  description: "陈宣宏 - 前端开发 - 13281260713",
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

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
    <div className="max-w-3xl prose my-10 rounded-md  mx-auto p-6 bg-white">
      {children}
    </div>
  );
}

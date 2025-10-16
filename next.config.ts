import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // 开启静态导出，用于 SSG 构建
  output: 'export',
};

export default nextConfig;

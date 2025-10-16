/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repo = process.env.NEXT_PUBLIC_REPO;

module.exports = {
  // 使 Next.js 输出静态 HTML
  output: 'export',  

  // 如果部署在 GitHub Pages 子路径，需要设置 basePath 和 assetPrefix
  basePath: isProd  && repo? `/${repo}` : '',
  assetPrefix: isProd && repo ? `/${repo}/` : '',

  // 如果你用了 next/image，禁用默认图片优化（因为静态导出时服务端优化不可用）
  images: {
    unoptimized: true,
  },
};

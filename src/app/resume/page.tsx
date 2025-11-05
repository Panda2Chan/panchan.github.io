'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import UserAvatar from '../user.png'
import Image from 'next/image'
import BackHome from '@/components/page/backHome'

const markdown = `

--- 
### Web 前端开发工程师
- 📍 成都, 中国
- 📅 工作时长：5年
- 💼 成都星迈吉科技有限公司
- 📞 +86 13281260713
- 📮 [a13281260713@gmail.com](mailto:a13281260713@gmail.com) | [812783357@qq.com](mailto:812783357@qq.com)
- 💻: [https://github.com/Panda2Chan](https://github.com/Panda2Chan)  
---

## 📝 个人简介
- 拥有多年**Web 前端开发经验**，精通 Vue2 / Vue3 / React，擅长后台管理系统开发与维护，熟悉前端项目架构设计及性能优化。熟练使用 TypeScript、Next.js、Vue、React 等技术栈，能够独立完成前后端联调和项目交付
- 深耕**游戏行业**，熟悉海内外游戏相关业务
- 有多年炒币经验及BSC社区建设经验

---

## 🛠 技能栈

- **前端框架**: Vue2, Vue3, React, Next.js, React Native
- **UI & 样式**: Tailwind CSS, shadcn/ui, Ant Design, Element UI, Arco Design, VXE-Table  
- **语言 & 工具**: TypeScript, JavaScript(ES6+), HTML5, CSS3, Git, npm/pnpm, Webpack/Vite  
- **后端 & 数据库**: Node.js, Golang, NextJS, MongoDB, MySQL, Redis, REST API  
- **可视化**: ECharts, D3.js, Canvas, Pixi.js  
- **效率提升**: Cursor, Warp, Grok, v0, ChatGpt
- **其他**: Selenium, Postman, Jenkins

---

## 💼 工作经历

### 成都星迈吉科技有限公司 | 成都 | 海外游戏
**Web 前端工程师 | 2024 – 至今**

- 负责后台管理系统开发与优化  
- 完成前后端接口联调与性能优化  
- 使用 Nextjs 完成落地页的模块开发及 SSR 性能优化 
- 使用 React Native 完成钱包项目的前端开发，负责用户界面设计与功能实现  
- 参与 pnpm + TurboRepo 架构设计及组件库搭建
- 项目重难点问题排查和方案设计（**缓存击穿**、**追加上传 Append Object**）

### 成都雷兽互动科技有限公司 | 成都 | 国内小游戏
**服务器开发 - Web | 2020 – 2024**

- 负责后台管理系统开发与优化
- 完成前后端接口联调与性能优化
- 接入国内广告商sdk，采集用户广告数据
- 使用 Golang 完成统计模块数据处理与分析
- 使用 Vue3 + ECharts 实现大数据可视化模块  

---

## 📂 项目经验

### MTPay 钱包
- **技术栈**: React Native
- **功能**: 移动端钱包应用，支持用户资产管理、交易记录查询等功能
- **贡献**: 
  - 原子级组件封装（ Input 、 Text 等），确保页面展示一致性
  - Form、Confirm、Modal 等高级组件的设计与实现  
  - 业务页面的开发，包括用户登录注册、资产管理、订单交易、记录查询等核心功能  

### 推广页
- **技术栈**: NextJS + Tailwind CSS  
- **功能**: 品牌形象推广，游戏引流，活动宣传
- **贡献**: 
  - 响应式布局设计
  - 完成复杂接口逻辑和交互
  - 多语言、**缓存策略优化**、SEO优化，社媒爬虫优化

### 游戏管理后台、数据后台、客服后台
- **技术栈**: Vue2 + Element UI
- **功能**: 提供游戏参数管理（如游戏参数、游戏规则、游戏活动等）、数据查询（如用户数据、订单数据、交易数据等）、客服管理（如客服工单、客服聊天等）等功能
- **贡献**: 
  - 系统技术、功能方面的整体迭代 
  - 主导设计**权限管理系统**，确保数据安全
  - 服务器查询速度优化、用户分析、邮件管理等核心功能优化
  - 完善功能操作日志记录，方便问题排查和系统维护

### 大数据后台
- **技术栈**: Vue3 + Arco Design
- **功能**: 提供游戏数据可视化分析，包括广告数据、用户分布、用户反馈等  
- **贡献**: 
  - 系统技术、功能方面的整体迭代 
  - 服务器查询速度优化和**广告投放买量**、ASO 市场分析、漏斗分析、用户分析 等核心功能优化
  - 主要模块以及其相对应的模板、条件、事件、事件类型等配置进行抽象封装，允许用户自定义查询，提升产品灵活性，确保页面数据展示一致性，显著提升工程质量

### SRE运维中台
- **技术栈**: Vue3 + Element Plus
- **功能**: 运维中台，提供项目构建部署、监控、告警、日志分析等功能  

### 撮合交易后台
- **技术栈**: React + Ant Design
- **功能**: 撮合交易后台，提供订单撮合、交易记录查询等功能  

### Binance Alpha Dog
- **技术栈**: NextJS + Tailwind CSS 
- **功能**: 基于 Binance API 实现的币安 Alpha 活动积分计算器，提供用户积分计算、交易记录查询、活动规则等功能



---

## 🎓 教育经历
- 统招本科 – 成都师范学院 ｜ 2015.09 – 2019.07

---

## 🤔 自我评价
- 年轻、热忱、执着、思维较活跃、爱创新，喜欢逛 GitHub、V2ex，看掘金、写写油猴脚本
- 热爱生活，喜欢游戏和桌游，有较强的意志力和执行力
- ENFJ 类型，喜欢与他人合作，有较强的沟通能力和团队合作精神
- 曾获得过 Gate.io Offer



`

export default function Resume() {
  return (
    <div className="max-w-3xl prose my-10 rounded-md  mx-auto p-6 bg-white">
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image className='w-24 h-24 rounded-full mx-auto my-4' src={UserAvatar} alt="" />
        <span className='text-4xl font-bold'>
          👋 PanChan - 陈宣宏
        </span>
      </div>

      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>

      <BackHome />
    </div>
  )
}

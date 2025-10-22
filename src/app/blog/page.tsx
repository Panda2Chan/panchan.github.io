'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import UserAvatar from '../user.png'
import Image from 'next/image'
const markdown = `

十月的成都，天光渐短，风有了凉意。  
坐在屏幕前敲代码的时候，窗外的云一层层飘过去，  
像被注释掉的念头。  

最近常常在思考：  
代码之外，什么才算“结构合理”的生活？  

缓存、异步、复用、依赖注入，  
这些词在脑子里转个不停，  
仿佛也能拿来描述日常。  
生活的状态和项目一样，  
有时候要重构，有时候只需要热重载。  

前端写久了，人会变得敏感。  
对边距像素的误差、对逻辑分支的冗余、  
对节奏的卡顿——甚至对自己的一点疲惫。  
偶尔也会有报错，  
某种程度上，这些报错也像生活里突然蹦出来的小插曲：  
不致命，却提醒你别太快。  

生活和代码，总有交叉的部分。  
比如装修时画施工图，才发现现实世界的“布局”比 CSS 难多了；  
又比如构思小程序时，界面与逻辑的关系，  
像人与人之间的沟通——看似简单，其实全靠细节。  

慢慢地，我喜欢上这种状态：  
在理性和感性之间切换。  
白天拆逻辑、写函数，  
晚上收拾思绪、写一点文字。  
代码让我理解秩序，文字让我容纳混乱。  

十月的风从窗缝吹进来，  
桌面上散着纸笔和键盘的光。  
生活没有被完全编译成功，  
但一切都在运行中。
`

export default function Resume() {
  return (
    <div className="max-w-3xl prose my-10 rounded-md  mx-auto p-6 bg-white">
      <div className='flex flex-col items-center justify-center gap-5'>
        <span className='text-4xl font-bold'>
          十月的代码与风
        </span>
        <div className='flex gap-5 text-sm font-bold text-gray-500'>
          <span >
            🗓️ 2023-10-22
          </span>
          <span >
            📍 成都 新川
          </span>
        </div>
      </div>

      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

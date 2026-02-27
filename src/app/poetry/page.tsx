'use client'

import React from 'react'
import BackHome from '@/components/page/backHome'

export interface IPoetry {
  name: string,
  content: string[]
  time?: string
}

export default function Resume() {
  const poetries: IPoetry[] = [
    {
      name: '未逢春',
      content: [
        '坠羽南归雁，溺影池底鱼。',
        '风回云自起，水阔待春归。',
      ],
      time: '2026-02-26 丙午马年暮春'
    },
    {
      name: '蝶恋花 又春',
      content: [
        '绮席华筵朝暮布，玉案珍馐，望儿归家路。燕返东风花又吐，门前芳草年年故。',
        '白发倚门相对语，灯影摇红，叹流年难驻。三千里路如过隙，何待临行方密补。',
      ],
      time: '2026-02-27 丙午马年暮春'
    },
  ]
  return (
    <div >
      {/* 唐诗风格诗集页面 */}
      <div className="max-w-3xl mx-auto  py-12">
        {/* 标题 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">拾叶集</h1>
          <p className="text-amber-700">自题拙作，聊寄幽怀</p>
        </header>

        {/* 诗卷 */}
        <section className="space-y-10">
          {/* 第一首 */}
          {poetries.map((poetry, index) => (
            <article key={index} className="bg-white/60 backdrop-blur rounded-xl shadow-md p-8 border border-amber-200">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">{poetry.name}</h2>
              <div className="text-lg leading-loose text-gray-700">
                {poetry.content.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
              {
                poetry.time &&
                <footer className="text-right text-sm text-amber-600 mt-4">{poetry.time}</footer>
              }
            </article>
          ))}



        </section>

        {/* 页脚 */}
        <footer className="text-center mt-16 text-amber-700 text-sm">
          <p>纸短情长，伏惟珍重</p>
        </footer>

        {/* 返回首页 */}
        <BackHome divider={false} />
      </div>

    </div>
  )
}

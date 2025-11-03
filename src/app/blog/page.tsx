'use client'

import React from 'react'
import BackHome from '@/components/page/backHome'
import { blogs } from "./_data"
import Link from 'next/link'

export default function Resume() {
  return (
    <div >
      {
        blogs.map((blog, blogIndex) => (
          <div key={blogIndex} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/detail?blogIndex=${blogIndex}`} className="text-blue-500 hover:underline">
                {blog.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-2">{blog.date}</p>
            <p className="text-gray-800 line-clamp-2 overflow-hidden">{blog.markdown}</p>
          </div>
        ))
      }
      <BackHome divider={false} />
    </div>
  )
}

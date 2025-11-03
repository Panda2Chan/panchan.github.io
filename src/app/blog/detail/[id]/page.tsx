
import BackHome from '@/components/page/backHome'
import Blog from '@/components/page/blog'
import { blogs } from '../../_data'
import { notFound } from 'next/navigation'


interface IBlogDetailParams {
  id: string
}

// 强制静态生成所有 id 路由
export function generateStaticParams() {
  return blogs.map((_, index) => ({
    id: String(index),
  }))
}


export default function BlogDetail({ params }: { params: IBlogDetailParams }) {
  const { id: blogIndex } = params
  const blog = blogs[Number(blogIndex)]
  if (!blog) {
    return (
      notFound()
    )
  }
  return (
    <div>
      <Blog data={blog} />
      <BackHome />
    </div>
  )
}
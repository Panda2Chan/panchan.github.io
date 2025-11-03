
import BackHome from '@/components/page/backHome'
import Blog from '@/components/page/blog'
import { blogs } from '../_data'
import { notFound } from 'next/navigation'


interface IBlogDetailSearchParams {
  blogIndex: string
}
export default function BlogDetail({ searchParams }: { searchParams: IBlogDetailSearchParams }) {
  console.log('----------【blogIndex】', searchParams);
  const { blogIndex } = searchParams
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
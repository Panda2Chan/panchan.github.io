import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'
import { FC } from 'react';

export interface IBlog {
  title: string;
  date: string;
  location: string;
  markdown: string;
}

const Blog: FC<{ data: IBlog }> = ({ data }) => {
  const { title, date, location, markdown } = data;
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-5'>
        <span className='text-4xl font-bold'>
          {title}
        </span>
        <div className='flex gap-5 text-sm font-bold text-gray-500'>
          <span >
            🗓️ {date}
          </span>
          <span >
            📍 {location}
          </span>
        </div>
      </div>

      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default Blog
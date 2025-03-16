import { MDXRemote } from 'next-mdx-remote/rsc'
import MdxComponents from '@/app/components/MdxComponents'

export default function MDX({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      components={MdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      }}
    />
  )
}

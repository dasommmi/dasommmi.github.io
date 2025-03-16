import { MDXRemote } from 'next-mdx-remote/rsc'

export default function MDX({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
        },
      }}
    />
  )
}

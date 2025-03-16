import MDX from './Mdx'

export default function PostBody({ content }: { content: string }) {
  return (
    <article className="flex w-full flex-wrap">
      <MDX content={content} />
    </article>
  )
}

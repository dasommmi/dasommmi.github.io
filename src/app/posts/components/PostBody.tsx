import MDX from '@/app/components/Mdx'

export default function PostBody({ content }: { content: string }) {
  return (
    <article className="prose flex w-full flex-wrap text-gray-800">
      <MDX content={content} />
    </article>
  )
}

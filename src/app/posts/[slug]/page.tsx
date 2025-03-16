import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Post } from '@/types/types'
import { getPostsByCategory, serializeMDXContent } from '@/utils/mdx'
import NotFound from '@/app/components/NotFound'
import PostHeader from '@/app/posts/components/PostHeader'
import PostBody from '@/app/posts/components/PostBody'

export const generateStaticParams = async (): Promise<{ params: { slug: string } }[]> => {
  const posts: Post[] = await getPostsByCategory()
  return posts.map(({ slug }: Post) => ({ params: { slug } }))
}

export default async function PostDetail({ params }: { params: { slug: string } }) {
  const { slug } = params
  const posts: Post[] = await getPostsByCategory()
  const post: Post | undefined = posts.find((post: Post) => slug === post.slug)

  if (!post) return <NotFound />

  const mdxSource: MDXRemoteSerializeResult = await serializeMDXContent(post.content)

  return (
    <section>
      <PostHeader metadata={post.metadata} />
      <PostBody mdxSource={mdxSource} />
    </section>
  )
}

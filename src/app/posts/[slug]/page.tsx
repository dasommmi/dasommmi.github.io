import { Post } from '@/types/types'
import { getPostsByCategory } from '@/utils/mdx'
import NotFound from '@/app/components/NotFound'
import PostHeader from '@/app/posts/components/PostHeader'
import PostBody from '../components/PostBody'

export async function generateStaticParams() {
  const posts: Post[] = await getPostsByCategory()
  return posts.map(({ slug }: Post) => ({ slug }))
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts: Post[] = await getPostsByCategory()
  const post = posts.find((post: Post) => slug === post.slug)

  if (!post) return <NotFound />

  return (
    <section className="flex h-full w-full flex-wrap rounded-lg bg-gray-200 p-5">
      <PostHeader metadata={post.metadata} />
      <PostBody content={post.content} />
    </section>
  )
}

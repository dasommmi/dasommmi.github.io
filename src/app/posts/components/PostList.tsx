import { Post } from '@/types/types'
import { getSortedListByDate } from '@/utils/mdx'
import PostListElement from '@/app/posts/components/PostListElement'

export default async function PostList() {
  const posts: Post[] = await getSortedListByDate()

  return (
    <ul className="flex flex-wrap justify-start gap-6">
      {posts.map((post: Post) => (
        <PostListElement key={post.slug} post={post} />
      ))}
    </ul>
  )
}

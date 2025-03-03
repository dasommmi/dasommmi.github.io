import Link from 'next/link'
import { Post, PostMetadata } from '@/types/types'
import { formattedDate } from '@/utils/date'

export default function PostListElement({ post }: { post: Post }) {
  const metadata: PostMetadata = post.metadata

  return (
    <Link href={`/posts/${post.slug}`}>
      <li className="flex w-full flex-wrap gap-6 rounded-lg bg-gray-200 px-5 py-4 shadow-md transition duration-300 hover:shadow-lg">
        <div className="flex flex-1 flex-wrap gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{metadata.title}</h3>
          <p className="text-sm text-gray-600">{metadata.description}</p>
          <div className="flex gap-2">
            {metadata.tags.map((tag: string) => (
              <div key={tag} className="rounded-full bg-green-100 px-2 py-1 text-xs text-gray-900">
                {tag}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-800">{formattedDate(metadata.date)}</p>
        </div>
        <div className="m-auto">
          <img src={metadata.thumbnailUrl} alt={metadata.title} className="h-20 w-20 object-cover" />
        </div>
      </li>
    </Link>
  )
}

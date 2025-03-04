import { PostMetadata } from '@/types/types'
import { formattedDate } from '@/utils/date'

export default function PostHeader({ metadata }: { metadata: PostMetadata }) {
  return (
    <article className="flex w-full flex-wrap">
      <div className="flex flex-1 flex-wrap gap-2">
        <h3 className="w-full text-lg font-semibold text-gray-800">{metadata.title}</h3>
        <p className="w-full text-sm text-gray-600">{metadata.description}</p>
        <div className="flex w-full gap-2">
          {metadata.tags.map((tag: string) => (
            <div key={tag} className="rounded-full bg-green-100 px-2 py-1 text-xs text-gray-900">
              {tag}
            </div>
          ))}
        </div>
        <p className="w-full text-sm text-gray-800">{formattedDate(metadata.date)}</p>
      </div>
      <div className="m-auto">
        <img src={metadata.thumbnailUrl} alt={metadata.title} className="h-20 w-20 object-cover" />
      </div>
    </article>
  )
}

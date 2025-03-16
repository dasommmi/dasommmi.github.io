import { PostMetadata } from '@/types/types'
import { formattedDate } from '@/utils/date'

export default function PostHeader({ metadata }: { metadata: PostMetadata }) {
  return (
    <article className="flex w-full flex-wrap pb-5">
      <div className="flex flex-1 flex-wrap gap-2">
        <h3 className="text-lg font-semibold text-gray-800">{metadata.title}</h3>
        <p className="ml-auto text-sm text-gray-800">{formattedDate(metadata.date)}</p>
      </div>
    </article>
  )
}

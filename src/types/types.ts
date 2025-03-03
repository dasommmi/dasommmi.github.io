export interface PostMetadata {
  title: string
  description: string
  thumbnailUrl: string
  tags: string[]
  date: string
}

export interface Post {
  slug: string
  metadata: PostMetadata
  content: string
}

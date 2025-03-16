import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BASE_PATH } from '@/constants/config'
import { Post, PostMetadata } from '@/types/types'

export const getPostsByCategory = async (category: string = 'posts'): Promise<Post[]> => {
  const categoryPath: string = path.join(process.cwd(), BASE_PATH, category)
  const mdxFiles: string[] = await fs.promises.readdir(categoryPath)

  return await Promise.all(
    mdxFiles.filter((file: string) => file.endsWith('.mdx')).map((file: string) => generatePost(file, categoryPath)),
  )
}

const generatePost = async (file: string, categoryPath: string): Promise<Post> => {
  const source: Buffer = await fs.promises.readFile(path.join(categoryPath, file))
  const { data, content } = matter(source)

  return { slug: file.replace('.mdx', ''), metadata: data as PostMetadata, content }
}

export const getSortedListByDate = async (): Promise<Post[]> => {
  const posts: Post[] = await getPostsByCategory()
  return posts.sort((a: Post, b: Post) => (a.metadata.date > b.metadata.date ? -1 : 1))
}

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { CATEGORY_PATH } from '@/utils/path'
import { Post, PostMetadata } from '@/types/types'

export const getPostsByCategory = (category: string = 'posts'): Post[] => {
  const MDX_POSTS_PATH: string[] = fs.readdirSync(CATEGORY_PATH(category)).filter(path => /\.mdx?$/.test(path))
  return MDX_POSTS_PATH.map((filePath: string) => {
    const source: Buffer<ArrayBufferLike> = fs.readFileSync(path.join(CATEGORY_PATH(category), filePath))
    const { data, content } = matter(source)
    return { slug: filePath.replace('.mdx', ''), metadata: data as PostMetadata, content }
  })
}

export const getSortedListByDate = (): Post[] => {
  return getPostsByCategory().sort((a, b) => (a.metadata.date > b.metadata.date ? 1 : -1))
}

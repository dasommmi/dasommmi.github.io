'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import MdxComponents from './MdxComponents'

export default function PostBody({ mdxSource }: { mdxSource: MDXRemoteSerializeResult }) {
  return (
    <article className="flex w-full flex-wrap">
      <MDXRemote {...mdxSource} components={MdxComponents} />
    </article>
  )
}

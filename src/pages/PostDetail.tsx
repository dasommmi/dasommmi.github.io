import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePostBySlug } from '@/hooks/useContentLoader'
import Giscus from '@/components/comments/Giscus'

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { Component, meta, loading } = usePostBySlug(slug)

  if (loading) {
    return (
      <div className="post-detail">
        <p className="post-detail__loading">포스트를 로드 중입니다...</p>
      </div>
    )
  }

  return (
    <div className="post-detail">
      <Link to="/posts" className="post-detail__back">← 포스트 목록</Link>
      <header className="post-detail__header">
        <span className="post-detail__date">{meta.date}</span>
        {meta.category && (
          <span className="post-detail__category">{meta.category}</span>
        )}
        <h1 className="post-detail__title">{meta.title}</h1>
        <div className="post-detail__tags">
          {meta.tags.map((t) => (
            <span key={t} className="badge">{t}</span>
          ))}
        </div>
      </header>
      <hr />
      <article className="post-detail__body md-content">
        <Component />
      </article>
      <Giscus
        repo="dasommmi/dasommmi.github.io"
        repoId="R_kgDORGCFHQ"
        category="General"
        categoryId="DIC_kwDORGCFHc4C2CTN"
      />
    </div>
  )
}

export default PostDetail

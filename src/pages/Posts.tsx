import React from "react";
import { Link } from "react-router-dom";
import { useContentLoader } from "@/hooks/useContentLoader";

const Posts: React.FC = () => {
  const { posts } = useContentLoader();

  return (
    <div className="posts">
      <h1 className="page-title">📝 Posts</h1>
      {posts.length === 0 ? (
        <p className="posts__empty">아직 포스트가 없습니다.</p>
      ) : (
        <ul className="posts__list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`} className="posts__item card">
                <div className="posts__meta">
                  <span className="posts__date">{post.date}</span>
                  {post.category && (
                    <span className="posts__category">{post.category}</span>
                  )}
                  <div className="posts__tags">
                    {post.tags.map((t) => (
                      <span key={t} className="badge">{t}</span>
                    ))}
                  </div>
                </div>
                <h2 className="posts__title">{post.title}</h2>
                {post.summary && (
                  <p className="posts__preview">{post.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;

import React from "react";
import { Link } from "react-router-dom";
import { useContentLoader } from "@/hooks/useContentLoader";

const Home: React.FC = () => {
  const { posts, activities, retros } = useContentLoader();

  return (
    <div className="home">
      <section className="home__hero">
        <h1 className="home__hero-title">
          Aim <span className="home__hero-accent">Higher</span>
        </h1>
        <p className="home__hero-sub">
          개발과 학습의 기록 — dasommmi의 블로그
        </p>
      </section>
      <section className="home__section">
        <h2 className="home__section-title">
          📝 최근 포스트
          <Link to="/posts" className="home__section-more">전체 →</Link>
        </h2>
        <div className="home__grid">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} to={`/posts/${post.slug}`} className="home__card card">
              <span className="home__card-date">{post.date}</span>
              <h3 className="home__card-title">{post.title}</h3>
              <div className="home__card-tags">
                {post.tags.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              {post.summary && (
                <p className="home__card-summary">{post.summary}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
      <div className="home__row">
        <section className="home__section home__section--half">
          <h2 className="home__section-title">
            ⚡ Activity
            <Link to="/activity" className="home__section-more">전체 →</Link>
          </h2>
          <div className="home__list">
            {activities.map((a) => (
              <div key={a.slug} className="home__list-item card">
                <span className="home__card-date">{a.date}</span>
                <h4 className="home__list-title">{a.title}</h4>
              </div>
            ))}
          </div>
        </section>
        <section className="home__section home__section--half">
          <h2 className="home__section-title">
            🔄 Retro
            <Link to="/retro" className="home__section-more">전체 →</Link>
          </h2>
          <div className="home__list">
            {retros.map((r) => (
              <div key={r.slug} className="home__list-item card">
                <span className="home__card-date">{r.date}</span>
                <h4 className="home__list-title">{r.title}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

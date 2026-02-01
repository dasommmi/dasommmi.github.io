import React from "react";
import { useContentLoader } from "@/hooks/useContentLoader";

const Retro: React.FC = () => {
  const { retros } = useContentLoader();

  return (
    <div className="retro">
      <h1 className="page-title">🔄 Retro</h1>
      {retros.length === 0 ? (
        <p className="retro__empty">아직 회고 기록이 없습니다.</p>
      ) : (
        <div className="retro__list">
          {retros.map((item) => (
            <article key={item.slug} className="retro__card card">
              <header className="retro__header">
                <h2 className="retro__title">{item.title}</h2>
                <span className="retro__date">{item.date}</span>
              </header>
              <div className="retro__tags">
                {item.tags.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              {item.summary && (
                <p className="retro__preview">{item.summary}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Retro;

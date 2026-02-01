import React from "react";
import { useContentLoader } from "@/hooks/useContentLoader";

const Activity: React.FC = () => {
  const { activities } = useContentLoader();

  return (
    <div className="activity">
      <h1 className="page-title">⚡ Activity</h1>
      {activities.length === 0 ? (
        <p className="activity__empty">아직 활동 기록이 없습니다.</p>
      ) : (
        <div className="activity__list">
          {activities.map((item) => (
            <article key={item.slug} className="activity__card card">
              <header className="activity__header">
                <h2 className="activity__title">{item.title}</h2>
                <span className="activity__date">{item.date}</span>
              </header>
              <div className="activity__tags">
                {item.tags.map((t) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
              {item.summary && (
                <p className="activity__preview">{item.summary}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activity;

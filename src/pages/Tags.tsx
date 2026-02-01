import React from "react";
import { Link } from "react-router-dom";
import { useContentLoader } from "@/hooks/useContentLoader";

const Tags: React.FC = () => {
  const { posts, activities, retros } = useContentLoader();

  const tagMap = new Map<string, number>();
  [...posts, ...activities, ...retros].forEach((item) => {
    item.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const allTags = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const filtered = selectedTag
    ? [
        ...posts.filter((p) => p.tags.includes(selectedTag)).map((p) => ({ ...p, type: "post" as const })),
        ...activities.filter((a) => a.tags.includes(selectedTag)).map((a) => ({ ...a, type: "activity" as const })),
        ...retros.filter((r) => r.tags.includes(selectedTag)).map((r) => ({ ...r, type: "retro" as const })),
      ]
    : [];

  return (
    <div className="tags-page">
      <h1 className="page-title">🏷️ Tags</h1>
      <div className="tags-page__cloud">
        {allTags.map(({ tag, count }) => (
          <button
            key={tag}
            className={
              "tags-page__tag" +
              (selectedTag === tag ? " tags-page__tag--active" : "")
            }
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
          >
            {tag}
            <span className="tags-page__count">{count}</span>
          </button>
        ))}
      </div>
      {selectedTag && (
        <section className="tags-page__results">
          <h2 className="tags-page__result-title">
            <span className="badge">{selectedTag}</span> 관련 콘텐츠
          </h2>
          <ul className="tags-page__list">
            {filtered.map((item) => (
              <li key={`${item.type}-${item.slug}`} className="tags-page__item card">
                <span className="tags-page__item-type">
                  {item.type === "post" ? "📝 Post" : item.type === "activity" ? "⚡ Activity" : "🔄 Retro"}
                </span>
                {item.type === "post" ? (
                  <Link to={`/posts/${item.slug}`} className="tags-page__item-title">{item.title}</Link>
                ) : (
                  <span className="tags-page__item-title">{item.title}</span>
                )}
                <span className="tags-page__item-date">{item.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Tags;

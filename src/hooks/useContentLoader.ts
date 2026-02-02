import React, { useEffect, useState } from "react";

export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  summary: string;
  filePath: string;
}

// ── glob 수집 (빌드 타임에 정적으로 결정됨) ──────────────
const postModules = import.meta.glob<{
  default: React.ComponentType;
  frontmatter?: ContentMeta;
}>("/src/data/posts/**/*.mdx", { eager: false });

const activityModules = import.meta.glob<{
  default: React.ComponentType;
  frontmatter?: ContentMeta;
}>("/src/data/activity/**/*.mdx", { eager: false });

const retroModules = import.meta.glob<{
  default: React.ComponentType;
  frontmatter?: ContentMeta;
}>("/src/data/retro/**/*.mdx", { eager: false });

function pathToSlug(filePath: string): string {
  const parts = filePath.replace(/^\/src\/data\/(posts|activity|retro)\//, "").split("/");
  if (parts.length >= 2) {
    return parts[0];
  }
  return parts[0].replace(/\.mdx$/, "");
}

const eagerPostMeta = import.meta.glob<{ frontmatter?: ContentMeta }>(
  "/src/data/posts/**/*.mdx",
  { eager: true }
);
const eagerActivityMeta = import.meta.glob<{ frontmatter?: ContentMeta }>(
  "/src/data/activity/**/*.mdx",
  { eager: true }
);
const eagerRetroMeta = import.meta.glob<{ frontmatter?: ContentMeta }>(
  "/src/data/retro/**/*.mdx",
  { eager: true }
);

function extractMeta(
  eagerMap: Record<string, { frontmatter?: ContentMeta }>
): ContentMeta[] {
  return Object.entries(eagerMap)
    .map(([filePath, mod]) => {
      const fm = mod.frontmatter || ({} as any);
      const slug = pathToSlug(filePath);
      
      return {
        slug:     slug,
        title:    fm.title    || "제목 없음",
        date:     fm.date     || "",
        tags:     Array.isArray(fm.tags) ? fm.tags : [],
        category: fm.category || "",
        summary:  fm.summary  || "",
        filePath,
      } as ContentMeta;
    })
    .sort((a, b) => {
      if (b.date > a.date) return 1;
      if (b.date < a.date) return -1;
      return 0;
    });
}

export function useContentLoader() {
  const posts      = extractMeta(eagerPostMeta);
  const activities = extractMeta(eagerActivityMeta);
  const retros     = extractMeta(eagerRetroMeta);

  async function loadPostComponent(filePath: string) {
    const loader = postModules[filePath];
    if (!loader) throw new Error(`Post not found: ${filePath}`);
    const mod = await loader();
    return mod.default;
  }

  async function loadActivityComponent(filePath: string) {
    const loader = activityModules[filePath];
    if (!loader) throw new Error(`Activity not found: ${filePath}`);
    const mod = await loader();
    return mod.default;
  }

  async function loadRetroComponent(filePath: string) {
    const loader = retroModules[filePath];
    if (!loader) throw new Error(`Retro not found: ${filePath}`);
    const mod = await loader();
    return mod.default;
  }

  return {
    posts,
    activities,
    retros,
    loadPostComponent,
    loadActivityComponent,
    loadRetroComponent,
  };
}

// ── PostDetail용: slug로 해당 포스트를 찾아서 컴포넌트 로드 ──
export function usePostBySlug(slug: string | undefined) {
  const { posts, loadPostComponent } = useContentLoader();
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [meta, setMeta] = useState<ContentMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const found = posts.find((p) => p.slug === slug);
    if (!found) {
      setError("포스트를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    setMeta(found);
    loadPostComponent(found.filePath)
      .then((Comp) => {
        setComponent(() => Comp);
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
      });
  }, [slug, posts]);

  return { Component, meta, loading, error };
}

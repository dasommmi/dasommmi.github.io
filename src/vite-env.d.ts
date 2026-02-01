/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentType } from "react";
  
  interface MDXModule {
    default: ComponentType;
    frontmatter?: {
      slug?: string;
      title?: string;
      date?: string;
      tags?: string[];
      category?: string;
      summary?: string;
      filePath?: string;
    };
  }
  
  const component: MDXModule["default"];
  export const frontmatter: MDXModule["frontmatter"];
  export default component;
}

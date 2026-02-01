declare module "*.mdx" {
  import { MDXProps } from "@mdxjs/react";

  const MDXComponent: (props: MDXProps) => JSX.Element;
  export default MDXComponent;

  export const frontmatter: {
    title: string;
    date: string;
    tags?: string[];
    category?: string;
    summary?: string;
    [key: string]: unknown;
  };
}

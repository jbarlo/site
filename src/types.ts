import type { MarkdownInstance } from "astro";

export interface ProjectIndexFrontmatter {
  "entry-num": "index";
  "last-updated": string;
}
export interface ProjectEntryFrontmatter {
  "entry-num": number;
  title: string;
  created: string;
  "last-updated": string;
}
export type ProjectFrontmatter =
  | ProjectIndexFrontmatter
  | ProjectEntryFrontmatter;

export const isProjectEntryFrontmatter = (
  post: ProjectFrontmatter,
): post is ProjectEntryFrontmatter => post["entry-num"] !== "index";

export const isProjectEntryFile = (
  file: MarkdownInstance<ProjectFrontmatter>,
): file is MarkdownInstance<ProjectEntryFrontmatter> =>
  isProjectEntryFrontmatter(file.frontmatter);

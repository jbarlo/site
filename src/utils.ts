import type { MarkdownInstance } from "astro";
import type { ProjectEntryFrontmatter } from "./types";

export const getPostHeadingId = (
  post: MarkdownInstance<ProjectEntryFrontmatter>,
) =>
  `${post.frontmatter["entry-num"]}-${post.frontmatter.title
    .toLowerCase()
    .replace(/ /g, "-")}`;

export const getPostTitle = (post: MarkdownInstance<ProjectEntryFrontmatter>) =>
  `${post.frontmatter["entry-num"]} - ${post.frontmatter.title}`;

import type { CollectionEntry } from "astro:content";

export const getPostHeadingId = (post: CollectionEntry<"projects">) =>
  post.data.isIndex
    ? ""
    : `${post.data["entry-num"]}-${post.data.title
        .toLowerCase()
        .replace(/ /g, "-")}`;

export const getPostTitle = (post: CollectionEntry<"projects">) =>
  post.data.isIndex
    ? post.data.label
    : `${post.data["entry-num"]}. ${post.data.title}`;

export const getProjectSlugFromSlug = (slug: string): string | undefined =>
  slug.split("/")[0];

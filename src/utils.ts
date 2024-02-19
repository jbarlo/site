import { getCollection, type CollectionEntry } from "astro:content";
import { isNil } from "lodash-es";

export const getPublishedProjects = (
  predicate?: Parameters<typeof getCollection<"projects">>[1],
) =>
  getCollection(
    "projects",
    (post) => post.data.publish && (isNil(predicate) || predicate(post)),
  );

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

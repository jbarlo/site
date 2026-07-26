import { getCollection, type CollectionEntry } from "astro:content";
import { flatMap, orderBy, uniq } from "lodash-es";

export type StaticRoute = "/" | "/about" | "/blog";
export const route = (to: StaticRoute) => to;

export const getPublishedPosts = () =>
  getCollection("posts", (post) => post.data.publish);

export const sortPostsByCreatedDesc = (posts: CollectionEntry<"posts">[]) =>
  orderBy(
    posts,
    [(post) => post.data.created.getTime(), "id"],
    ["desc", "asc"],
  );

export const getAllTags = (posts: CollectionEntry<"posts">[]) =>
  uniq(flatMap(posts, (post) => post.data.tags)).sort();

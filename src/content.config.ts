import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { postSchema } from "./schemas";

const postCollection = defineCollection({
  loader: glob({ pattern: ["**/*.md", "!**/*.draft.md"], base: "./content/posts" }),
  schema: postSchema,
});

export const collections = {
  posts: postCollection,
};

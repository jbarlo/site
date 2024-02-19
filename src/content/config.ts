import { defineCollection } from "astro:content";
import { projectSchema } from "../schemas";
const projectCollection = defineCollection({
  type: "content",
  schema: projectSchema,
});
export const collections = {
  projects: projectCollection,
};

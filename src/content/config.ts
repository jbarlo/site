import { defineCollection, z } from "astro:content";
const projectCollection = defineCollection({
  type: "content",
  schema: z.discriminatedUnion("isIndex", [
    z.object({
      isIndex: z.undefined(),
      "entry-num": z.number(),
      title: z.string(),
      created: z.date(),
      "last-updated": z.date(),
    }),
    z.object({
      isIndex: z.literal(true),
      label: z.string(),
      description: z.string().optional(),
      imgUrl: z.string(),
      imgAlt: z.string(),
      github: z.string().optional(),
      created: z.date(),
      "last-updated": z.date(),
    }),
  ]),
});
export const collections = {
  projects: projectCollection,
};

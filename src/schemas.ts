import { z } from "astro/zod";

export const postSchema = z
  .object({
    publish: z.boolean().default(true),
    title: z.string(),
    created: z.date(),
    "last-updated": z.date().optional(),
    tags: z.array(z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)).default([]),
    slug: z.string().optional(),
  })
  .transform((obj) => ({
    "last-updated": obj.created,
    ...obj,
  }));

import { z } from "astro/zod";

export const projectEntrySchema = z.object({
  isIndex: z.undefined(),
  "entry-num": z.number(),
  title: z.string(),
  created: z.date(),
  "last-updated": z.date(),
});

export const projectIndexSchema = z.object({
  isIndex: z.literal(true),
  label: z.string(),
  description: z.string().optional(),
  imgUrl: z.string(),
  imgAlt: z.string(),
  github: z.string().optional(),
  created: z.date(),
  "last-updated": z.date(),
});

export const projectSchema = z.discriminatedUnion("isIndex", [
  projectEntrySchema,
  projectIndexSchema,
]);

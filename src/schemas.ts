import { z } from "astro/zod";

export const projectEntrySchema = z.object({
  publish: z.boolean().default(true),
  isIndex: z.literal(false).optional(),
  "entry-num": z.number(),
  title: z.string(),
  created: z.date(),
  "last-updated": z.date(),
});

export const projectIndexSchema = z.object({
  publish: z.boolean().default(true),
  isIndex: z.literal(true),
  label: z.string(),
  description: z.string().optional(),
  imgUrl: z.string(),
  imgAlt: z.string(),
  github: z.string().optional(),
  created: z.date(),
  "last-updated": z.date(),
});

export const projectSchema = z.union([
  projectIndexSchema,
  projectEntrySchema,
]);

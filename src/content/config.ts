import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine((img) => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      /** Language of the post body. Interface labels stay English on purpose. */
      lang: z.enum(["en", "vi"]).default("en"),
      /** Multi-part posts. Parts sharing a `name` are linked in order of `part`. */
      series: z
        .object({ name: z.string(), part: z.number().int().min(1) })
        .optional(),
      canonicalURL: z.string().optional(),
    }),
});

export const collections = { blog };

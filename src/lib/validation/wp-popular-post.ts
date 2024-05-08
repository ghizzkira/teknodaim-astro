import { LANGUAGE_TYPE } from "./language"
import { z } from "zod"

import { LANGUAGE_TYPE } from "./language"
import { z } from "zod"

export const wpPopularPostInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1),
  language: z.enum(LANGUAGE_TYPE, {
    required_error: "Language is required",
    invalid_type_error: "only id and en are accepted",
  }),
  slug: z.string({
    required_error: "Slug is required",
    invalid_type_error: "Slug must be a string",
  }),
  excerpt: z.string({
    required_error: "Excerpt is required",
    invalid_type_error: "Excerpt must be a string",
  }),
  publishedTime: z.string({
    required_error: "Published Time is required",
    invalid_type_error: "Published Time must be a string",
  }),
  thumbnail: z.string({
    required_error: "Thumbnail is required",
    invalid_type_error: "Thumbnail must be a number",
  }),
  primaryCategory: z.string({
    required_error: "Primary Category is required",
    invalid_type_error: "Primary Category must be a string",
  }),
  primaryCategorySlug: z.string({
    required_error: "Primary Category Slug is required",
    invalid_type_error: "Primary Category Slug must be a string",
  }),
  authorName: z.string({
    required_error: "Author Name is required",
    invalid_type_error: "Author Name must be a string",
  }),
  authorSlug: z.string({
    required_error: "Author Slug is required",
    invalid_type_error: "Author Slug must be a string",
  }),
  authorImage: z.string({
    required_error: "Author Image is required",
    invalid_type_error: "Author Image must be a string",
  }),
}

export const upsertWpPopularPostSchema = z.object({
  ...wpPopularPostInput,
})

export type UpsertWpPopularPost = z.infer<typeof upsertWpPopularPostSchema>

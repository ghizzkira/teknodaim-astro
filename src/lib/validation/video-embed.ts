import { STATUS_TYPE } from "./status"
import { z } from "zod"

import { STATUS_TYPE } from "./status"
import { z } from "zod"

export const VIDEO_EMBED_TYPE = ["youtube", "youtube_short", "tiktok"] as const

export const videoEmbedType = z.enum(VIDEO_EMBED_TYPE)

const videoEmbedInput = {
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(2),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .min(10),
  embedLink: z.string({
    required_error: "Embed Link is required",
    invalid_type_error: "Embed Link must be a string",
  }),
  metaTitle: z
    .string({
      invalid_type_error: "Meta Title must be a string",
    })
    .optional(),
  metaDescription: z
    .string({
      invalid_type_error: "Meta Description must be a string",
    })
    .optional(),
  type: z
    .enum(VIDEO_EMBED_TYPE, {
      invalid_type_error:
        "only youtube, youtube_short, and tiktok are accepted",
    })
    .optional(),
  status: z
    .enum(STATUS_TYPE, {
      invalid_type_error:
        "only published, draft, rejected and in_review are accepted",
    })
    .optional(),
  featuredImageUrl: z
    .string({
      invalid_type_error: "Featured Image Url must be a string",
    })
    .optional(),
  featuredImageId: z
    .string({
      invalid_type_error: "Featured Image must be a string",
    })
    .optional(),
  topics: z
    .string({
      required_error: "Topic Id is required",
      invalid_type_error: "Topic Id must be a string",
    })
    .array(),
  authors: z
    .string({
      required_error: "Author Id is required",
      invalid_type_error: "Author Id must be a string",
    })
    .array(),
}

const updateVideoEmbedInput = {
  ...videoEmbedInput,
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string",
  }),
  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .regex(new RegExp(/^[a-zA-Z0-9_-]*$/), {
      message: "Slug should be character a-z, A-Z, number, - and _",
    }),
}

export const createVideoEmbedSchema = z.object({
  ...videoEmbedInput,
})

export const updateVideoEmbedSchema = z.object({
  ...updateVideoEmbedInput,
})

export type VideoEmbedType = z.infer<typeof videoEmbedType>
export type CreateVideoEmbed = z.infer<typeof createVideoEmbedSchema>
export type UpdateVideoEmbed = z.infer<typeof updateVideoEmbedSchema>

import { z } from "zod"

const wpCommentInput = {
  wpPostSlug: z.string({
    required_error: "WP Post Slug is required",
    invalid_type_error: "WP Post Slug must be a string",
  }),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1),
  replyToId: z
    .string({
      invalid_type_error: "Wp Comment Id must be a string",
    })
    .optional()
    .nullish(),
}

const wpCommentUpdateInput = {
  content: z.string({
    required_error: "Content is required",
    invalid_type_error: "Content must be a string",
  }),
}

export const createWpCommentSchema = z.object({
  ...wpCommentInput,
})

export const updateWpCommentSchema = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string",
  }),
  ...wpCommentUpdateInput,
})

export type CreateWpComment = z.infer<typeof createWpCommentSchema>
export type UpdateWpComment = z.infer<typeof updateWpCommentSchema>

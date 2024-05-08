import { z } from "zod"

const videoEmebedCommentInput = {
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1)
    .max(600),
  videoEmbedId: z.string({
    required_error: "Video Embed Id is required",
    invalid_type_error: "Video Embed Id must be a string",
  }),
  replyToId: z
    .string({
      invalid_type_error: "Video Embed Comment Id must be a string",
    })
    .optional()
    .nullish(),
}

const updateVideoEmbedCommentInput = {
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id must be a string",
  }),
  content: z
    .string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    })
    .min(1)
    .max(600),
}

export const createVideoEmbedCommentSchema = z.object({
  ...videoEmebedCommentInput,
})

export const updateVideoEmbedCommentSchema = z.object({
  ...updateVideoEmbedCommentInput,
})

export type CreateVideoEmbedComment = z.infer<
  typeof createVideoEmbedCommentSchema
>
export type UpdateVideoEmbedComment = z.infer<
  typeof updateVideoEmbedCommentSchema
>

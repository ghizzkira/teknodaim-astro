import { and, count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { videoEmbeds } from "@/lib/db/schema/video-embed"
import { videoEmbedComments } from "@/lib/db/schema/video-embed-comment"
import { cuid } from "@/lib/utils/id"
import type {
  CreateVideoEmbedComment,
  UpdateVideoEmbedComment,
} from "@/lib/validation/video-embed-comment"

export const getVideoEmbedCommentsDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.videoEmbedComments.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (videoEmbedComments, { desc }) => [
      desc(videoEmbedComments.createdAt),
    ],
    with: {
      videoEmbed: true,
    },
  })
  return data
}

export const getVideoEmbedCommentsByVideoEmbedId = async (
  DB: D1Database,
  input: {
    videoEmbedId: string
    page: number
    perPage: number
  },
) => {
  const { videoEmbedId, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.videoEmbedComments.findMany({
    where: (videoEmbedComments, { eq }) =>
      eq(videoEmbedComments.videoEmbedId, videoEmbedId),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (videoEmbedComments, { desc }) => [
      desc(videoEmbedComments.createdAt),
    ],
    with: {
      author: true,
      replies: {
        with: {
          author: true,
        },
      },
    },
  })
  return data
}

export const getVideoEmbedCommentsByVideoEmbedIdInfinite = async (
  DB: D1Database,
  input: {
    videoEmbedId: string
    limit?: number
    cursor?: string
  },
) => {
  const { videoEmbedId, limit = 10, cursor } = input

  const db = initializeDB(DB)

  const data = await db.query.videoEmbedComments.findMany({
    where: (videoEmbedComments, { eq, and, lt }) =>
      and(
        eq(videoEmbedComments.videoEmbedId, videoEmbedId),
        eq(videoEmbedComments.replyToId, ""),
        cursor ? lt(videoEmbedComments.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      author: true,
      replies: {
        with: {
          author: true,
        },
      },
    },
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.createdAt) {
      nextCursor = nextItem.createdAt
    }
  }

  return {
    videoEmbedComments: data,
    nextCursor,
  }
}

export const getVideoEmbedCommentById = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db.query.videoEmbedComments.findFirst({
    where: (videoEmbedComments, { eq }) => eq(videoEmbedComments.id, input),
    with: {
      author: true,
      replies: {
        with: {
          author: true,
        },
      },
    },
  })
  return data
}

export const getVideoEmbedCommentsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(videoEmbedComments)
  return data[0].value
}

export const getVideoEmbedCommentsCountByVideoEmbedId = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(videoEmbedComments)
    .where(and(eq(videoEmbeds.id, input), eq(videoEmbedComments.replyToId, "")))
  return data[0].value
}

export const createVideoEmbedComment = async (
  DB: D1Database,
  input: CreateVideoEmbedComment & { authorId: string },
) => {
  const db = initializeDB(DB)
  const data = await db.insert(videoEmbedComments).values({
    id: cuid(),
    videoEmbedId: input.videoEmbedId,
    content: input.content,
    replyToId: input.replyToId ?? "",
    authorId: input.authorId,
  })
  return data
}

export const updateVideoEmbedComment = async (
  DB: D1Database,
  input: UpdateVideoEmbedComment,
) => {
  const db = initializeDB(DB)
  const data = await db
    .update(videoEmbedComments)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(videoEmbedComments.id, input.id))

  return data
}

export const deleteVideoEmbedComment = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db
    .delete(videoEmbedComments)
    .where(eq(videoEmbedComments.id, input))
  return data
}

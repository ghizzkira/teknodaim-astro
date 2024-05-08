import { and, count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { wpComments } from "@/lib/db/schema/wp-comment"
import { cuid } from "@/lib/utils/id"
import type {
  CreateWpComment,
  UpdateWpComment,
} from "@/lib/validation/wp-comment"

export const getWpCommentsDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.wpComments.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpComments, { desc }) => [desc(wpComments.createdAt)],
    with: {
      author: true,
    },
  })
  return data
}

export const getWpCommentsByWpPostSlug = async (
  DB: D1Database,
  input: {
    wpPostSlug: string
    page: number
    perPage: number
  },
) => {
  const { wpPostSlug, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.wpComments.findMany({
    where: (wpComments, { eq }) => eq(wpComments.wpPostSlug, wpPostSlug),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpComments, { desc }) => [desc(wpComments.createdAt)],
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

export const getWpCommentsByWpPostSlugInfinite = async (
  DB: D1Database,
  input: {
    wpPostSlug: string
    limit?: number
    cursor?: string
  },
) => {
  const { wpPostSlug, limit = 10, cursor } = input

  const db = initializeDB(DB)

  const data = await db.query.wpComments.findMany({
    where: (wpComments, { eq, and, lt }) =>
      and(
        eq(wpComments.wpPostSlug, wpPostSlug),
        eq(wpComments.replyToId, ""),
        cursor ? lt(wpComments.createdAt, cursor) : undefined,
      ),
    limit: limit + 1,
    orderBy: (wpComments, { desc }) => [desc(wpComments.createdAt)],
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
    const nextItem = data[data.length - 2]
    if (nextItem?.createdAt) {
      nextCursor = nextItem.createdAt
      data.pop()
    }
  }

  return {
    wpComments: data,
    nextCursor,
  }
}

export const getWpCommentById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.wpComments.findFirst({
    where: (wpComments, { eq }) => eq(wpComments.id, input),
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

export const getWpCommentsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(wpComments)
  return data[0].value
}

export const getWpCommentsCountByWpPostSlug = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(wpComments)
    .where(and(eq(wpComments.wpPostSlug, input), eq(wpComments.replyToId, "")))
  return data[0].value
}

export const createWpComment = async (
  DB: D1Database,
  input: CreateWpComment & { authorId: string },
) => {
  const db = initializeDB(DB)
  const data = await db.insert(wpComments).values({
    id: cuid(),
    wpPostSlug: input.wpPostSlug,
    content: input.content,
    replyToId: input.replyToId ?? "",
    authorId: input.authorId,
  })
  return data
}

export const updateWpComment = async (
  DB: D1Database,
  input: UpdateWpComment,
) => {
  const db = initializeDB(DB)

  const data = await db
    .update(wpComments)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(wpComments.id, input.id))

  return data
}

export const deleteWpComment = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(wpComments).where(eq(wpComments.id, input))
  return data
}

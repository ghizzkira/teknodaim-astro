import { and, count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { wpComments } from "@/lib/db/schema/wp-comment"
import { cuid } from "@/lib/utils/id"
import type {
  CreateWpComment,
  UpdateWpComment,
} from "@/lib/validation/wp-comment"

export const getWpCommentsDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
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

export const getWpCommentsByWpPostSlug = async ({
  wpPostSlug,
  page,
  perPage,
}: {
  wpPostSlug: string
  page: number
  perPage: number
}) => {
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

export const getWpCommentsByWpPostSlugInfinite = async ({
  wpPostSlug,
  limit = 50,
  cursor,
}: {
  wpPostSlug: string
  limit?: number
  cursor?: string
}) => {
  const data = await db.query.wpComments.findMany({
    where: (wpComments, { eq, and, lt }) =>
      and(
        eq(wpComments.wpPostSlug, wpPostSlug),
        eq(wpComments.replyToId, ""),
        cursor ? lt(wpComments.updatedAt, cursor) : undefined,
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
    wpComments: data,
    nextCursor,
  }
}

export const getWpCommentById = async (id: string) => {
  const data = await db.query.wpComments.findMany({
    where: (wpComments, { eq }) => eq(wpComments.id, id),
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

export const getWpCommentsCount = async () => {
  const data = await db.select({ value: count() }).from(wpComments)
  return data[0].value
}

export const getWpCommentsCountByWpPostSlug = async (wpPostSlug: string) => {
  const data = await db
    .select({ value: count() })
    .from(wpComments)
    .where(
      and(eq(wpComments.wpPostSlug, wpPostSlug), eq(wpComments.replyToId, "")),
    )
  return data[0].value
}

export const createWpComment = async (
  input: CreateWpComment & { authorId: string },
) => {
  const data = await db.insert(wpComments).values({
    id: cuid(),
    wpPostSlug: input.wpPostSlug,
    content: input.content,
    replyToId: input.replyToId ?? "",
    authorId: input.authorId,
  })
  return data
}

export const updateWpComment = async (input: UpdateWpComment) => {
  const data = await db
    .update(wpComments)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(wpComments.id, input.id))

  return data
}

export const deleteWpComment = async (id: string) => {
  const data = await db.delete(wpComments).where(eq(wpComments.id, id))
  return data
}

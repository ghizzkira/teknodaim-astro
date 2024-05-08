import { and, count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { articles } from "@/lib/db/schema/article"
import { articleComments } from "@/lib/db/schema/article-comment"
import { cuid } from "@/lib/utils/id"
import type {
  CreateArticleComment,
  UpdateArticleComment,
} from "@/lib/validation/article-comment"

export const getArticleCommentsDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.articleComments.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articleComments, { desc }) => [desc(articleComments.createdAt)],
    with: {
      article: true,
    },
  })

  return data
}

export const getArticleCommentsByArticleId = async (
  DB: D1Database,
  input: {
    articleId: string
    page: number
    perPage: number
  },
) => {
  const { articleId, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.articleComments.findMany({
    where: (articleComments, { eq }) =>
      eq(articleComments.articleId, articleId),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (articleComments, { desc }) => [desc(articleComments.createdAt)],
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

export const getArticleCommentsByArticleIdInfinite = async (
  DB: D1Database,
  input: {
    articleId: string
    limit?: number
    cursor?: string
  },
) => {
  const { articleId, limit = 10, cursor } = input

  const db = initializeDB(DB)

  const data = await db.query.articleComments.findMany({
    where: (articleComments, { eq, and, lt }) =>
      and(
        eq(articleComments.articleId, articleId),
        eq(articleComments.replyToId, ""),
        cursor ? lt(articleComments.updatedAt, cursor) : undefined,
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
    articleComments: data,
    nextCursor,
  }
}

export const getArticleCommentById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.articleComments.findFirst({
    where: (articleComments, { eq }) => eq(articleComments.id, input),
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

export const getArticleCommentsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(articleComments)
  return data[0].value
}

export const getArticleCommentsCountByArticleId = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(articleComments)
    .where(and(eq(articles.id, input), eq(articleComments.replyToId, "")))
  return data[0].value
}

export const createArticleComment = async (
  DB: D1Database,
  input: CreateArticleComment & { authorId: string },
) => {
  const db = initializeDB(DB)
  const data = await db.insert(articleComments).values({
    id: cuid(),
    articleId: input.articleId,
    content: input.content,
    replyToId: input.replyToId ?? "",
    authorId: input.authorId,
  })
  return data
}

export const updateArticleComment = async (
  DB: D1Database,
  input: UpdateArticleComment,
) => {
  const db = initializeDB(DB)
  const data = await db
    .update(articleComments)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(articleComments.id, input.id))
  return data
}

export const deleteArticleComment = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db
    .delete(articleComments)
    .where(eq(articleComments.id, input))
  return data
}

import { and, count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { articles } from "@/lib/db/schema/article"
import { articleComments } from "@/lib/db/schema/article-comment"
import { cuid } from "@/lib/utils/id"
import type {
  CreateArticleComment,
  UpdateArticleComment,
} from "@/lib/validation/article-comment"

export const getArticleCommentsDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
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

export const getArticleCommentsByArticleId = async ({
  articleId,
  page,
  perPage,
}: {
  articleId: string
  page: number
  perPage: number
}) => {
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

export const getArticleCommentsByArticleIdInfinite = async ({
  articleId,
  limit = 50,
  cursor,
}: {
  articleId: string
  limit?: number
  cursor?: string
}) => {
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

export const getArticleCommentById = async (id: string) => {
  const data = await db.query.articleComments.findMany({
    where: (articleComments, { eq }) => eq(articleComments.id, id),
    with: {
      replies: {
        with: {
          author: true,
        },
      },
    },
  })
  return data
}

export const getArticleCommentsCount = async () => {
  const data = await db.select({ value: count() }).from(articleComments)
  return data[0].value
}

export const getArticleCommentsCountByArticleId = async (articleId: string) => {
  const data = await db
    .select({ value: count() })
    .from(articleComments)
    .where(and(eq(articles.id, articleId), eq(articleComments.replyToId, "")))
  return data[0].value
}

export const createArticleComment = async (
  input: CreateArticleComment & { authorId: string },
) => {
  const data = await db.insert(articleComments).values({
    id: cuid(),
    articleId: input.articleId,
    content: input.content,
    replyToId: input.replyToId ?? "",
    authorId: input.authorId,
  })
  return data
}

export const updateArticleComment = async (input: UpdateArticleComment) => {
  const data = await db
    .update(articleComments)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(articleComments.id, input.id))

  return data
}

export const deleteArticleComment = async (id: string) => {
  const data = await db
    .delete(articleComments)
    .where(eq(articleComments.id, id))
  return data
}

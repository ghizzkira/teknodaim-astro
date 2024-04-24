import { and, count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { downloads } from "@/lib/db/schema/download"
import { downloadComments } from "@/lib/db/schema/download-comment"
import { cuid } from "@/lib/utils/id"
import type {
  CreateDownloadComment,
  UpdateDownloadComment,
} from "@/lib/validation/download-comment"

export const getDownloadCommentsDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.downloadComments.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloadComments, { desc }) => [desc(downloadComments.createdAt)],
    with: {
      download: true,
    },
  })
  return data
}

export const getDownloadCommentsByDownloadId = async ({
  downloadId,
  page,
  perPage,
}: {
  downloadId: string
  page: number
  perPage: number
}) => {
  const data = await db.query.downloadComments.findMany({
    where: (downloadComments, { eq }) =>
      eq(downloadComments.downloadId, downloadId),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloadComments, { desc }) => [desc(downloadComments.createdAt)],
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

export const getDownloadCommentsByDownloadIdInfinite = async ({
  downloadId,
  limit = 50,
  cursor,
}: {
  downloadId: string
  limit?: number
  cursor?: string
}) => {
  const data = await db.query.downloadComments.findMany({
    where: (downloadComments, { eq, and, lt }) =>
      and(
        eq(downloadComments.downloadId, downloadId),
        eq(downloadComments.replyToId, ""),
        cursor ? lt(downloadComments.updatedAt, cursor) : undefined,
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
    downloadComments: data,
    nextCursor,
  }
}

export const getDownloadCommentById = async (id: string) => {
  const data = await db.query.downloadComments.findFirst({
    where: (downloadComments, { eq }) => eq(downloadComments.id, id),
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

export const getDownloadCommentsCount = async () => {
  const data = await db.select({ value: count() }).from(downloadComments)
  return data[0].value
}

export const getDownloadCommentsCountByDownloadId = async (
  downloadId: string,
) => {
  const data = await db
    .select({ value: count() })
    .from(downloadComments)
    .where(
      and(eq(downloads.id, downloadId), eq(downloadComments.replyToId, "")),
    )
  return data[0].value
}

export const createDownloadComment = async (
  input: CreateDownloadComment & { authorId: string },
) => {
  const data = await db.insert(downloadComments).values({
    id: cuid(),
    downloadId: input.downloadId,
    content: input.content,
    replyToId: input.replyToId ?? "",
    authorId: input.authorId,
  })
  return data
}

export const updateDownloadComment = async (input: UpdateDownloadComment) => {
  const data = await db
    .update(downloadComments)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(downloadComments.id, input.id))

  return data
}

export const deleteDownloadComment = async (id: string) => {
  const data = await db
    .delete(downloadComments)
    .where(eq(downloadComments.id, id))
  return data
}

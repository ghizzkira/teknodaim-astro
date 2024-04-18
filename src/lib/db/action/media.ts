import { count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { cuid } from "@/lib/utils/id"
import type { UpdateMedia, UploadMedia } from "@/lib/validation/media"
import { medias } from "../schema/media"

export const getMediasDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.medias.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (medias, { desc }) => [desc(medias.createdAt)],
  })
  return data
}

export const getMediasDashboardInfinite = async ({
  limit = 50,
  cursor,
}: {
  limit?: number
  cursor?: string
  direction?: "forward" | "backward"
}) => {
  const data = await db.query.medias.findMany({
    where: (medias, { lt }) =>
      cursor ? lt(medias.updatedAt, cursor!) : undefined,
    limit: limit + 1,
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    medias: data,
    nextCursor,
  }
}

export const getMediaById = async (id: string) => {
  const data = await db.query.medias.findFirst({
    where: (medias, { eq }) => eq(medias.id, id),
  })
  return data
}

export const getMediaByName = async (name: string) => {
  const data = await db.query.medias.findFirst({
    where: (medias, { eq }) => eq(medias.name, name),
  })
  return data
}

export const getMediasByAuthorId = async ({
  authorId,
  page,
  perPage,
}: {
  authorId: string
  page: number
  perPage: number
}) => {
  const data = await db.query.medias.findMany({
    where: (medias, { eq }) => eq(medias.authorId, authorId),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (medias, { desc }) => [desc(medias.createdAt)],
  })
  return data
}

export const searchMedias = async (searchQuery: string) => {
  const data = await db.query.medias.findMany({
    where: (medias, { like }) => like(medias.name, `%${searchQuery}%`),
    limit: 10,
  })
  return data
}

export const getMediasCount = async () => {
  const data = await db.select({ value: count() }).from(medias)
  return data[0].value
}

export const createMedia = async (
  input: UploadMedia & { authorId: string },
) => {
  const data = await db.insert(medias).values({
    id: cuid(),
    name: input.name,
    type: input.type,
    url: input.url,
    authorId: input.authorId,
  })
  return data
}

export const updateMedia = async (input: UpdateMedia) => {
  const data = await db
    .update(medias)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(medias.id, input.id))
  return data
}

export const deleteMediaById = async (id: string) => {
  const data = await db.delete(medias).where(eq(medias.id, id))
  return data
}

export const deleteMediaByName = async (name: string) => {
  const data = await db.delete(medias).where(eq(medias.name, name))
  return data
}

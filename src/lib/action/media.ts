import { initializeDB } from "@/lib/db"
import { medias } from "@/lib/db/schema/media"
import { cuid } from "@/lib/utils/id"
import type { UpdateMedia, UploadMedia } from "@/lib/validation/media"
import { count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { medias } from "@/lib/db/schema/media"
import { cuid } from "@/lib/utils/id"
import type { UpdateMedia, UploadMedia } from "@/lib/validation/media"
import { count, eq, sql } from "drizzle-orm"

export const getMediasDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.medias.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (medias, { desc }) => [desc(medias.createdAt)],
  })
  return data
}

export const getMediasDashboardInfinite = async (
  DB: D1Database,
  input: {
    limit?: number
    cursor?: string
  },
) => {
  const { limit = 10, cursor } = input

  const db = initializeDB(DB)

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

export const getMediaById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.medias.findFirst({
    where: (medias, { eq }) => eq(medias.id, input),
  })
  return data
}

export const getMediaByName = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.medias.findFirst({
    where: (medias, { eq }) => eq(medias.name, input),
  })
  return data
}

export const getMediasByAuthorId = async (
  DB: D1Database,
  input: {
    authorId: string
    page: number
    perPage: number
  },
) => {
  const { authorId, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.medias.findMany({
    where: (medias, { eq }) => eq(medias.authorId, authorId),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (medias, { desc }) => [desc(medias.createdAt)],
  })
  return data
}

export const searchMedias = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.medias.findMany({
    where: (medias, { like }) => like(medias.name, `%${input}%`),
    limit: 10,
  })
  return data
}

export const getMediasCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(medias)
  return data[0].value
}

export const createMedia = async (
  DB: D1Database,
  input: UploadMedia & { authorId: string },
) => {
  const db = initializeDB(DB)
  const data = await db.insert(medias).values({
    id: cuid(),
    name: input.name,
    type: input.type,
    url: input.url,
    authorId: input.authorId,
  })
  return data
}

export const updateMedia = async (DB: D1Database, input: UpdateMedia) => {
  const db = initializeDB(DB)
  const data = await db
    .update(medias)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(medias.id, input.id))
  return data
}

export const deleteMediaById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(medias).where(eq(medias.id, input))
  return data
}

export const deleteMediaByName = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(medias).where(eq(medias.name, input))
  return data
}

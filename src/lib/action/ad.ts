import { count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { ads } from "@/lib/db/schema/ad"
import { cuid } from "@/lib/utils/id"
import type { AdPosition, CreateAd, UpdateAd } from "@/lib/validation/ad"

export const getAdsDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.ads.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (ads, { desc }) => [desc(ads.createdAt)],
  })

  return data
}

export const getAdById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.query.ads.findFirst({
    where: (ads, { eq }) => eq(ads.id, input),
  })

  return data
}

export const getAdsByPosition = async (DB: D1Database, input: AdPosition) => {
  const db = initializeDB(DB)

  const data = await db.query.ads.findMany({
    where: (ads, { eq }) => eq(ads.position, input),
  })

  return data
}

export const getAdsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)

  const data = await db.select({ value: count() }).from(ads)

  return data[0].value
}

export const createAd = async (DB: D1Database, input: CreateAd) => {
  const db = initializeDB(DB)

  const data = await db.insert(ads).values({
    id: cuid(),
    ...input,
  })

  return data
}

export const updateAd = async (DB: D1Database, input: UpdateAd) => {
  const db = initializeDB(DB)

  const data = await db
    .update(ads)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(ads.id, input.id))

  return data
}

export const deleteAd = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.delete(ads).where(eq(ads.id, input))

  return data
}

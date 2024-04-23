import { count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { ads } from "@/lib/db/schema/ad"
import { cuid } from "@/lib/utils/id"
import type { AdPosition, CreateAd, UpdateAd } from "@/lib/validation/ad"

export const getAdsDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.ads.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (ads, { desc }) => [desc(ads.createdAt)],
  })
  return data
}

export const getAdById = async (id: string) => {
  const data = await db.query.ads.findFirst({
    where: (ads, { eq }) => eq(ads.id, id),
  })
  return data
}

export const getAdsByPosition = async (position: AdPosition) => {
  const data = await db.query.ads.findMany({
    where: (ads, { eq }) => eq(ads.position, position),
  })
  return data
}

export const getAdsCount = async () => {
  const data = await db.select({ value: count() }).from(ads)
  return data[0].value
}

export const createAd = async (input: CreateAd) => {
  const data = await db.insert(ads).values({
    id: cuid(),
    ...input,
  })
  return data
}

export const updateAd = async (input: UpdateAd) => {
  const data = await db
    .update(ads)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(ads.id, input.id))
  return data
}

export const deleteAd = async (id: string) => {
  const data = await db.delete(ads).where(eq(ads.id, id))
  return data
}

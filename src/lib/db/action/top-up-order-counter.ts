import { sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { topUpOrderCounters } from "@/lib/db/schema/top-up-order-counter"
import { cuid } from "@/lib/utils/id"
import type { UpsertTopUpOrderCounter } from "@/lib/validation/top-up-order-counter"

export const getTopUpOrderCounters = async () => {
  const data = await db.query.topUpOrderCounters.findMany({
    orderBy: (topUpOrderCounters, { asc }) => asc(topUpOrderCounters.createdAt),
  })
  return data
}

export const getTopUpOrderCounterByBrand = async (brand: string) => {
  const data = await db.query.topUpOrderCounters.findFirst({
    where: (topUpOrderCounter, { eq }) => eq(topUpOrderCounter.brand, brand),
  })
  return data
}

export const upsertTopUpOrderCounter = async (
  input: UpsertTopUpOrderCounter,
) => {
  const topUpOrderCounter = await db
    .insert(topUpOrderCounters)
    .values({
      ...input,
      id: cuid(),
    })
    .onConflictDoUpdate({
      target: topUpOrderCounters.brand,
      set: {
        brand: input.brand,
        orders: sql`${topUpOrderCounters.orders} + 1`,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      },
    })

  return topUpOrderCounter
}

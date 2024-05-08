import { initializeDB } from "@/lib/db"
import { topUpOrders } from "@/lib/db/schema/top-up-order"
import { cuid } from "@/lib/utils/id"
import type {
  CreateTopUpOrder,
  UpdateTopUpOrder,
  UpdateTopUpOrderStatus,
} from "@/lib/validation/top-up-order"
import { count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { topUpOrders } from "@/lib/db/schema/top-up-order"
import { cuid } from "@/lib/utils/id"
import type {
  CreateTopUpOrder,
  UpdateTopUpOrder,
  UpdateTopUpOrderStatus,
} from "@/lib/validation/top-up-order"
import { count, eq, sql } from "drizzle-orm"

export const getTopUpOrders = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.topUpOrders.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
  })
  return data
}

export const getTopUpOrdersDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.topUpOrders.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
  })
  return data
}

export const getTopUpOrderByInvoiceId = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db.query.topUpOrders.findFirst({
    where: (topUpOrder, { eq }) => eq(topUpOrder.invoiceId, input),
  })
  return data
}

export const getTopUpOrdersCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(topUpOrders)
  return data[0].value
}

export const getTopUpOrdersDashboardCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(topUpOrders)
  return data[0].value
}

export const createTopUpOrder = async (
  DB: D1Database,
  input: CreateTopUpOrder,
) => {
  const db = initializeDB(DB)
  const topUpOrder = await db
    .insert(topUpOrders)
    .values({
      id: cuid(),
      ...input,
    })
    .returning()
  return topUpOrder[0]
}

export const updateTopUpOrder = async (
  DB: D1Database,
  input: UpdateTopUpOrder,
) => {
  const db = initializeDB(DB)
  const data = await db
    .update(topUpOrders)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(topUpOrders.invoiceId, input.invoiceId))
  return data
}

export const updateTopUpOrderStatus = async (
  DB: D1Database,
  input: UpdateTopUpOrderStatus,
) => {
  const db = initializeDB(DB)
  const data = await db
    .update(topUpOrders)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(topUpOrders.status, input.status))
  return data
}

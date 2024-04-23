import { count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { cuid } from "@/lib/utils/id"
import type {
  CreateTopUpOrder,
  UpdateTopUpOrder,
  UpdateTopUpOrderStatus,
} from "@/lib/validation/top-up-order"
import { topUpOrders } from "../schema/top-up-order"

export const getTopUpOrders = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.topUpOrders.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
  })
  return data
}

export const getTopUpOrdersDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.topUpOrders.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
  })
  return data
}

export const getTopUpOrderByInvoiceId = async (invoiceId: string) => {
  const data = await db.query.topUpOrders.findFirst({
    where: (topUpOrder, { eq }) => eq(topUpOrder.invoiceId, invoiceId),
  })
  return data
}

export const getTopUpOrdersCount = async () => {
  const data = await db.select({ value: count() }).from(topUpOrders)
  return data[0].value
}

export const getTopUpOrdersDashboardCount = async () => {
  const data = await db.select({ value: count() }).from(topUpOrders)
  return data[0].value
}

export const createTopUpOrder = async (input: CreateTopUpOrder) => {
  const topUpOrder = await db
    .insert(topUpOrders)
    .values({
      id: cuid(),
      ...input,
    })
    .returning()
  return topUpOrder[0]
}

export const updateTopUpOrder = async (input: UpdateTopUpOrder) => {
  const data = await db
    .update(topUpOrders)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(topUpOrders.invoiceId, input.invoiceId))
  return data
}

export const updateTopUpOrderStatus = async (input: UpdateTopUpOrderStatus) => {
  const data = await db
    .update(topUpOrders)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(topUpOrders.status, input.status))
  return data
}

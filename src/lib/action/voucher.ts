import { initializeDB } from "@/lib/db"
import { vouchers } from "@/lib/db/schema/voucher"
import { cuid } from "@/lib/utils/id"
import type { CreateVoucher, UpdateVoucher } from "@/lib/validation/voucher"
import { count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { vouchers } from "@/lib/db/schema/voucher"
import { cuid } from "@/lib/utils/id"
import type { CreateVoucher, UpdateVoucher } from "@/lib/validation/voucher"
import { count, eq, sql } from "drizzle-orm"

export const getVouchersDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.vouchers.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (vouchers, { desc }) => [desc(vouchers.createdAt)],
  })
  return data
}

export const getVoucherById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.vouchers.findFirst({
    where: (vouchers, { eq }) => eq(vouchers.id, input),
  })
  return data
}

export const getVoucherByCode = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.vouchers.findMany({
    where: (vouchers, { eq }) => eq(vouchers.voucherCode, input),
  })
  return data
}

export const getVouchersCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(vouchers)
  return data[0].value
}

export const createVoucher = async (DB: D1Database, input: CreateVoucher) => {
  const db = initializeDB(DB)
  const data = await db.insert(vouchers).values({
    id: cuid(),
    ...input,
  })
  return data
}

export const updateVoucher = async (DB: D1Database, input: UpdateVoucher) => {
  const db = initializeDB(DB)
  const data = await db
    .update(vouchers)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(vouchers.id, input.id))
  return data
}

export const deleteVoucher = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(vouchers).where(eq(vouchers.id, input))
  return data
}

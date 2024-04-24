import { count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { vouchers } from "@/lib/db/schema/voucher"
import { cuid } from "@/lib/utils/id"
import type { CreateVoucher, UpdateVoucher } from "@/lib/validation/voucher"

export const getVouchersDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.vouchers.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (vouchers, { desc }) => [desc(vouchers.createdAt)],
  })
  return data
}

export const getVoucherById = async (id: string) => {
  const data = await db.query.vouchers.findFirst({
    where: (vouchers, { eq }) => eq(vouchers.id, id),
  })
  return data
}

export const getVoucherByCode = async (voucherCode: string) => {
  const data = await db.query.vouchers.findMany({
    where: (vouchers, { eq }) => eq(vouchers.voucherCode, voucherCode),
  })
  return data
}

export const getVouchersCount = async () => {
  const data = await db.select({ value: count() }).from(vouchers)
  return data[0].value
}

export const createVoucher = async (input: CreateVoucher) => {
  const data = await db.insert(vouchers).values({
    id: cuid(),
    ...input,
  })
  return data
}

export const updateVoucher = async (input: UpdateVoucher) => {
  const data = await db
    .update(vouchers)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(vouchers.id, input.id))
  return data
}

export const deleteVoucher = async (id: string) => {
  const data = await db.delete(vouchers).where(eq(vouchers.id, id))
  return data
}

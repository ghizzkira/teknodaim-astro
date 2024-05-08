import { initializeDB } from "@/lib/db"
import { menus } from "@/lib/db/schema/menu"
import { cuid } from "@/lib/utils/id"
import type {
  CreateMenu,
  MenuPosition,
  UpdateMenu,
} from "@/lib/validation/menu"
import { count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { menus } from "@/lib/db/schema/menu"
import { cuid } from "@/lib/utils/id"
import type {
  CreateMenu,
  MenuPosition,
  UpdateMenu,
} from "@/lib/validation/menu"
import { count, eq, sql } from "drizzle-orm"

export const getMenus = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.menus.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (menus, { desc }) => [desc(menus.createdAt)],
  })
  return data
}

export const getMenuById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.menus.findFirst({
    where: (menus, { eq }) => eq(menus.id, input),
  })
  return data
}

export const getMenuByPosition = async (
  DB: D1Database,
  input: MenuPosition,
) => {
  const db = initializeDB(DB)
  const data = await db.query.menus.findFirst({
    where: (menus, { eq }) => eq(menus.position, input),
  })
  return data
}

export const getMenusCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(menus)
  return data[0].value
}

export const createMenu = async (DB: D1Database, input: CreateMenu) => {
  const db = initializeDB(DB)
  const data = await db.insert(menus).values({
    id: cuid(),
    ...input,
  })
  return data
}

export const updateMenu = async (DB: D1Database, input: UpdateMenu) => {
  const db = initializeDB(DB)
  const data = await db
    .update(menus)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(menus.id, input.id))
  return data
}

export const deleteMenu = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(menus).where(eq(menus.id, input))
  return data
}

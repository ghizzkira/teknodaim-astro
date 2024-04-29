import { sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { settings } from "@/lib/db/schema/setting"
import { cuid } from "@/lib/utils/id"
import type { UpsertSetting } from "@/lib/validation/setting"

export const getSettings = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.query.settings.findMany({
    orderBy: (settings, { asc }) => asc(settings.createdAt),
  })
  return data
}

export const getSettingByKey = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.settings.findFirst({
    where: (setting, { eq }) => eq(setting.key, input),
  })
  return data
}

export const upsertSetting = async (DB: D1Database, input: UpsertSetting) => {
  const db = initializeDB(DB)

  const setting = await db
    .insert(settings)
    .values({
      ...input,
      id: cuid(),
    })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: input.value, updatedAt: sql`CURRENT_TIMESTAMP` },
    })

  return setting
}

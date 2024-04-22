import { db } from "@/lib/db"
import { settings } from "@/lib/db/schema/setting"
import { cuid } from "@/lib/utils/id"
import type { UpsertSetting } from "@/lib/validation/setting"

export const getSettings = async () => {
  const data = await db.query.settings.findMany({
    orderBy: (settings, { asc }) => asc(settings.createdAt),
  })
  return data
}

export const getSettingByKey = async (key: string) => {
  const data = await db.query.settings.findFirst({
    where: (setting, { eq }) => eq(setting.key, key),
  })
  return data
}

export const upsertSetting = async (input: UpsertSetting) => {
  const setting = await db
    .insert(settings)
    .values({
      ...input,
      id: cuid(),
    })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: input.value },
    })

  return setting
}

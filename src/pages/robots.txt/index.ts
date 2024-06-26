import type { APIContext } from "astro"

import { getSettingByKey } from "@/lib/action/setting"

export async function GET(context: APIContext) {
  const DB = context.locals.runtime.env.DB

  const settings = await getSettingByKey(DB, "robots_txt")

  let settingsValue

  if (settings) {
    const parsedData = JSON.parse(settings.value)
    settingsValue = { ...parsedData }
  }
  const value: string =
    settingsValue && typeof settingsValue?.robots_txt === "string"
      ? settingsValue?.robots_txt
      : `User-Agent: *
Disallow: /`

  return new Response(value, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "Content-Type": "text/plain",
    },
  })
}

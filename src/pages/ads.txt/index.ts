import type { APIContext } from "astro"

import { getSettingByKey } from "@/lib/action/setting"

export async function GET(context: APIContext) {
  const DB = context.locals.runtime.env.DB
  const settings = await getSettingByKey(DB, "ads_txt")

  let settingsValue

  if (settings) {
    const parsedData = JSON.parse(settings.value)
    settingsValue = { ...parsedData }
  }
  const value: string =
    settingsValue && typeof settingsValue?.ads_txt === "string"
      ? settingsValue?.ads_txt
      : `google.com, pub-3155057614541401, DIRECT, f08c47fec0942fa0
google.com, pub-1431832394500017, DIRECT, f08c47fec0942fa0
google.com, pub-3201363236145957, DIRECT, f08c47fec0942fa0`

  return new Response(value, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "Content-Type": "text/plain",
    },
  })
}

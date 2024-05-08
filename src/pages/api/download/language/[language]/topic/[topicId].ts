import type { APIRoute } from "astro"

import { getDownloadsByTopicId } from "@/lib/action/download"
import { languageType } from "@/lib/validation/language"
import { z } from "zod"

import { getDownloadsByTopicId } from "@/lib/action/download"
import { languageType } from "@/lib/validation/language"
import { z } from "zod"

const inputSchema = z.object({
  language: languageType,
  topicId: z.string(),
  page: z.number(),
  perPage: z.number(),
})

export const GET: APIRoute = async ({ locals, params, request }) => {
  try {
    const DB = locals.runtime.env.DB
    const language = params.language
    const topicId = params.topicId

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const page = parseInt(queryParams.get("page") ?? "1")
    const perPage = parseInt(queryParams.get("perPage") ?? "10")

    const parsedInput = inputSchema.parse({
      language,
      topicId,
      page,
      perPage,
    })

    const data = await getDownloadsByTopicId(DB, parsedInput)

    if (!data) {
      return new Response(null, {
        status: 404,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 500 })
  }
}

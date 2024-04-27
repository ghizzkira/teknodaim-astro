import type { APIRoute } from "astro"
import { z } from "zod"

import { searchTopicsByType } from "@/lib/action/topic"
import { languageType } from "@/lib/validation/language"
import { topicType } from "@/lib/validation/topic"

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const language = params.language
    const type = params.type

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const searchQuery = queryParams.get("query")

    const parsedInput = z
      .object({
        language: languageType,
        type: topicType,
        searchQuery: z.string(),
      })
      .parse({ language: language, type, searchQuery })

    const data = await searchTopicsByType(parsedInput)

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
      return new Response(error.errors[1].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 501 })
  }
}

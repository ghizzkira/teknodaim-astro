import type { APIRoute } from "astro"
import { z } from "zod"

import { searchArticlesDashboard } from "@/lib/action/article"
import { languageType } from "@/lib/validation/language"

export const GET: APIRoute = async ({ locals, params, request }) => {
  try {
    const DB = locals.runtime.env.DB

    const language = params.language

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const searchQuery = queryParams.get("query")

    const parsedInput = z
      .object({ language: languageType, searchQuery: z.string() })
      .parse({ language, searchQuery })

    const data = await searchArticlesDashboard(DB, parsedInput)

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

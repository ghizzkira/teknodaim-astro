import type { APIRoute } from "astro"
import { z } from "zod"

import { searchTopics } from "@/lib/action/topic"
import { languageType } from "@/lib/validation/language"

export const GET: APIRoute = async ({ params }) => {
  try {
    const language = params.language
    const searchQuery = params.searchQuery

    const parsedInput = z
      .object({ language: languageType, searchQuery: z.string() })
      .parse({ language, searchQuery })

    const data = await searchTopics(parsedInput)

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

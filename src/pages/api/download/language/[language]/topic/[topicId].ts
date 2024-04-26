import type { APIRoute } from "astro"
import { z } from "zod"

import { getDownloadsByTopicId } from "@/lib/action/download"
import { languageType } from "@/lib/validation/language"

const inputSchema = z.object({
  language: languageType,
  topicId: z.string(),
  page: z.number(),
  perPage: z.number(),
})

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const language = params.language
    const topicId = params.topicId
    const parsedInput = inputSchema.parse({
      language,
      topicId,
      ...request.body,
    })
    const data = await getDownloadsByTopicId(parsedInput)

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

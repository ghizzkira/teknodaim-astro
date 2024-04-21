import type { APIRoute } from "astro"
import { z } from "zod"

import { getWpPopularPostsLast1Day } from "@/lib/db/action/wp-popular-post"
import { languageType } from "@/lib/validation/language"

const inputSchema = z.object({
  language: languageType,
  page: z.number(),
  perPage: z.number(),
})

export const GET: APIRoute = async ({ request }) => {
  try {
    const parsedInput = inputSchema.parse(request.body)
    const data = await getWpPopularPostsLast1Day(parsedInput)
    return new Response(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 500 })
  }
}

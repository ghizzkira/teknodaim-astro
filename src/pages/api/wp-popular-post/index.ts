import type { APIRoute } from "astro"
import { z } from "zod"

import { upsertWpPopularPost } from "@/lib/db/action/wp-popular-post"
import { upsertWpPopularPostSchema } from "@/lib/validation/wp-popular-post"

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const parsedInput = upsertWpPopularPostSchema.parse(body)
    const data = await upsertWpPopularPost(parsedInput)
    return new Response(JSON.stringify(data))
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 500 })
  }
}

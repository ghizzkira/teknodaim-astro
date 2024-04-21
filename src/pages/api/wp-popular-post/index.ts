import type { APIRoute } from "astro"

import { upsertWpPopularPost } from "@/lib/db/action/wp-popular-post"
import { upsertWpPopularPostSchema } from "@/lib/validation/wp-popular-post"

export const POST: APIRoute = async ({ request }) => {
  const parsedInput = upsertWpPopularPostSchema.parse(request.body)

  const data = await upsertWpPopularPost(parsedInput)

  return new Response(JSON.stringify(data))
}

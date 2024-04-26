import type { APIRoute } from "astro"
import { z } from "zod"

import { getVideoEmbedsByTopicIdInfinite } from "@/lib/action/video-embed"

const inputSchema = z.object({
  topicId: z.string(),
  limit: z.number().optional(),
  cursor: z.string().optional(),
})

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const topicId = params.topicId
    const parsedInput = inputSchema.parse({
      topicId,
      ...request.body,
    })
    const data = await getVideoEmbedsByTopicIdInfinite(parsedInput)

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

import type { APIRoute } from "astro"
import { z } from "zod"

import { getVideoEmbedCommentsByVideoEmbedId } from "@/lib/action/video-embed-comment"

const inputSchema = z.object({
  videoEmbedId: z.string(),
  page: z.number(),
  perPage: z.number(),
})

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const videoEmbedId = params.videoEmbedId
    const parsedInput = inputSchema.parse({
      videoEmbedId,
      ...request.body,
    })

    const data = await getVideoEmbedCommentsByVideoEmbedId(parsedInput)

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
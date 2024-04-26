import type { APIRoute } from "astro"
import { z } from "zod"

import { getVideoEmbedsByTypeInfinite } from "@/lib/action/video-embed"
import { videoEmbedType } from "@/lib/validation/video-embed"

const inputSchema = z.object({
  type: videoEmbedType,
  limit: z.number().optional(),
  cursor: z.string().optional(),
})

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const type = params.type
    const parsedInput = inputSchema.parse({ type, ...request.body })
    const data = await getVideoEmbedsByTypeInfinite(parsedInput)

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

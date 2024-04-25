import type { APIRoute } from "astro"
import { z } from "zod"

import { getDownloadCommentsByDownloadIdInfinite } from "@/lib/action/download-comment"

const inputSchema = z.object({
  downloadId: z.string(),
  limit: z.number().optional(),
  cursor: z.string().optional(),
})

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const downloadId = params.downloadId
    const parsedInput = inputSchema.parse({
      downloadId,
      ...request.body,
    })
    const data = await getDownloadCommentsByDownloadIdInfinite(parsedInput)

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

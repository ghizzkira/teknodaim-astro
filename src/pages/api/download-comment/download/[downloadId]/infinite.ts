import type { APIRoute } from "astro"
import { z } from "zod"

import { getDownloadCommentsByDownloadIdInfinite } from "@/lib/action/download-comment"

const inputSchema = z.object({
  downloadId: z.string(),
  limit: z.number().optional(),
  cursor: z.string().optional(),
})

export const GET: APIRoute = async ({ locals, params, request }) => {
  try {
    const downloadId = params.downloadId

    const DB = locals.runtime.env.DB

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const limit = parseInt(queryParams.get("limit") ?? "50")
    const cursor = queryParams.get("cursor")

    const parsedInput = inputSchema.parse({
      downloadId,
      limit,
      cursor,
    })
    const data = await getDownloadCommentsByDownloadIdInfinite(DB, parsedInput)

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

import type { APIRoute } from "astro"
import { z } from "zod"

import { getDownloadCommentsByDownloadId } from "@/lib/action/download-comment"

const inputSchema = z.object({
  downloadId: z.string(),
  page: z.number(),
  perPage: z.number(),
})

export const GET: APIRoute = async ({ locals, params, request }) => {
  try {
    const downloadId = params.downloadId

    const DB = locals.runtime.env.DB

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const page = parseInt(queryParams.get("page") ?? "1")
    const perPage = parseInt(queryParams.get("perPage") ?? "10")

    const parsedInput = inputSchema.parse({
      downloadId,
      page,
      perPage,
    })

    const data = await getDownloadCommentsByDownloadId(DB, parsedInput)

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

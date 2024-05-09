import type { APIRoute } from "astro"
import { z } from "zod"

import { searchVideoEmbedsDashboard } from "@/lib/action/video-embed"

export const GET: APIRoute = async ({ locals, request }) => {
  try {
    //@ts-ignore
    const DB = locals.runtime.env.DB

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const searchQuery = queryParams.get("query")

    const parsedInput = z.string().parse(searchQuery)

    const data = await searchVideoEmbedsDashboard(DB, parsedInput)

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
      return new Response(error.errors[1].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 501 })
  }
}

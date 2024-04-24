import type { APIRoute } from "astro"
import { z } from "zod"

import { searchMedias } from "@/lib/action/media"

export const GET: APIRoute = async ({ params }) => {
  try {
    const searchQuery = params.searchQuery

    const parsedInput = z.string().parse(searchQuery)

    const data = await searchMedias(parsedInput)

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

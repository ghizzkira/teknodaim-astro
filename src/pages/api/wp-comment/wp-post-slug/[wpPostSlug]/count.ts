import type { APIRoute } from "astro"
import { z } from "zod"

import { getWpCommentsCountByWpPostSlug } from "@/lib/action/wp-comment"

export const GET: APIRoute = async ({ params }) => {
  try {
    const wpPostSlug = params.wpPostSlug
    const parsedInput = z.string().parse(wpPostSlug)

    const data = await getWpCommentsCountByWpPostSlug(parsedInput)

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

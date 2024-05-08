import type { APIRoute } from "astro"
import { z } from "zod"

import { getWpPopularPostBySlug } from "@/lib/action/wp-popular-post"

export const GET: APIRoute = async ({ locals, params }) => {
  try {
    const DB = locals.runtime.env.DB
    const slug = params.slug
    const parsedInput = z.string().parse(slug)
    const data = await getWpPopularPostBySlug(DB, parsedInput)

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

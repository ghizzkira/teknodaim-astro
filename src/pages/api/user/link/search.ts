import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { searchUserLinks } from "@/lib/action/user-link"

export const GET: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    //@ts-ignore
    const DB = context.locals.runtime.env.DB

    if (!user) {
      return new Response(null, {
        status: 401,
      })
    }

    const userId = user.id

    const url = new URL(context.request.url)
    const queryParams = new URLSearchParams(url.search)
    const searchQuery = queryParams.get("query")

    const parsedInput = z.string().parse(searchQuery)

    const data = await searchUserLinks(DB, {
      userId: userId!,
      searchQuery: parsedInput,
    })

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

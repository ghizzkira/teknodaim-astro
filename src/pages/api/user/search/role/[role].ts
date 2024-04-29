import type { APIRoute } from "astro"
import { z } from "zod"

import { searchUsersByRole } from "@/lib/action/user"
import { userRole } from "@/lib/validation/user"

export const GET: APIRoute = async ({ locals, params, request }) => {
  try {
    const DB = locals.runtime.env.DB
    const role = params.role

    const url = new URL(request.url)
    const queryParams = new URLSearchParams(url.search)
    const searchQuery = queryParams.get("query")

    const parsedInput = z
      .object({ role: userRole, searchQuery: z.string() })
      .parse({ role, searchQuery })

    const data = await searchUsersByRole(DB, parsedInput)

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

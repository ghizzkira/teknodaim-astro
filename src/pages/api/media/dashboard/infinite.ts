import type { APIRoute } from "astro"
import { z } from "zod"

import { getMediasDashboardInfinite } from "@/lib/action/media"

const inputSchema = z.object({
  limit: z.number().optional(),
  cursor: z.string().optional(),
})

export const GET: APIRoute = async ({ locals, request }) => {
  try {
    const user = locals.user

    if (!user?.role.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }
    const parsedInput = inputSchema.parse(request.body)
    const data = await getMediasDashboardInfinite(parsedInput)

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

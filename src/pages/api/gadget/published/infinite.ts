import type { APIRoute } from "astro"
import { z } from "zod"

import { getGadgetsPublishedInfinite } from "@/lib/action/gadget"

const inputSchema = z.object({
  limit: z.number().optional(),
  cursor: z.string().optional(),
})

export const GET: APIRoute = async ({ request }) => {
  try {
    const parsedInput = inputSchema.parse(request.body)
    const data = await getGadgetsPublishedInfinite(parsedInput)

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

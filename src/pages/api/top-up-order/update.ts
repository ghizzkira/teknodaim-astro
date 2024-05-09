import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { updateTopUpOrder } from "@/lib/action/top-up-order"
import { updateTopUpOrderSchema } from "@/lib/validation/top-up-order"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    //@ts-ignore
    const DB = context.locals.runtime.env.DB

    if (!user?.role?.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = updateTopUpOrderSchema.parse(body)
    const data = await updateTopUpOrder(DB, parsedInput)

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

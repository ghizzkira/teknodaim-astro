import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { createGadget } from "@/lib/action/gadget"
import { createGadgetSchema } from "@/lib/validation/gadget"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user

    if (!user?.role?.includes("admin" || "author")) {
      return new Response(null, {
        status: 401,
      })
    }

    const DB = context.locals.runtime.env.DB
    const body = await context.request.json()
    const parsedInput = createGadgetSchema.parse(body)
    const data = await createGadget(DB, parsedInput)

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

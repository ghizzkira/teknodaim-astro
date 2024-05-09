import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { updateTopic } from "@/lib/action/topic"
import { updateTopicSchema } from "@/lib/validation/topic"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    //@ts-ignore
    const DB = context.locals.runtime.env.DB

    if (!user?.role?.includes("admin" || "author")) {
      return new Response(null, {
        status: 402,
      })
    }

    const body = await context.request.json()
    const parsedInput = updateTopicSchema.parse(body)
    const data = await updateTopic(DB, parsedInput)

    if (!data) {
      return new Response(null, {
        status: 405,
      })
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return new Response(error.errors[2].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 502 })
  }
}

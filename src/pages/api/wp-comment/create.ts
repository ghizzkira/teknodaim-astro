import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { createWpComment } from "@/lib/action/wp-comment"
import { createWpCommentSchema } from "@/lib/validation/wp-comment"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const DB = context.locals.runtime.env.DB
    const user = context.locals.user

    const body = await context.request.json()
    const parsedInput = createWpCommentSchema.parse(body)
    const data = await createWpComment(DB, {
      authorId: user?.id!,
      ...parsedInput,
    })

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

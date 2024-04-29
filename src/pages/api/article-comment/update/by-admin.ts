import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { updateArticleComment } from "@/lib/action/article-comment"
import { updateArticleCommentSchema } from "@/lib/validation/article-comment"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const DB = context.locals.runtime.env.DB
    const body = await context.request.json()
    const parsedInput = updateArticleCommentSchema.parse(body)

    const user = context.locals.user

    if (user?.role !== "admin") {
      return new Response(null, {
        status: 401,
      })
    }

    const data = await updateArticleComment(DB, parsedInput)

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

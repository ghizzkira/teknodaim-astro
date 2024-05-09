import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { createArticleComment } from "@/lib/action/article-comment"
import { createArticleCommentSchema } from "@/lib/validation/article-comment"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    //@ts-ignore
    const DB = context.locals.runtime.env.DB

    const body = await context.request.json()
    const parsedInput = createArticleCommentSchema.parse(body)
    const data = await createArticleComment(DB, {
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

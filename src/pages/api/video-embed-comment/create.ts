import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { createVideoEmbedComment } from "@/lib/action/video-embed-comment"
import { createVideoEmbedCommentSchema } from "@/lib/validation/video-embed-comment"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const DB = context.locals.runtime.env.DB
    const user = context.locals.user

    const body = await context.request.json()
    const parsedInput = createVideoEmbedCommentSchema.parse(body)
    const data = await createVideoEmbedComment(DB, {
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

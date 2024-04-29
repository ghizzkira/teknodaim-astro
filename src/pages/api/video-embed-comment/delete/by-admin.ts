import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import {
  deleteVideoEmbedComment,
  getVideoEmbedCommentById,
} from "@/lib/action/video-embed-comment"

export const DELETE: APIRoute = async (context: APIContext) => {
  try {
    const body = await context.request.json()
    const parsedInput = z.string().parse(body)

    const DB = context.locals.runtime.env.DB
    const user = context.locals.user

    const videoEmbedComment = await getVideoEmbedCommentById(DB, parsedInput)

    if (!user) {
      return new Response(null, {
        status: 401,
      })
    }

    if (user?.id !== videoEmbedComment?.authorId) {
      return new Response("You can only delete your comment", {
        status: 401,
      })
    }

    const data = await deleteVideoEmbedComment(DB, parsedInput)

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

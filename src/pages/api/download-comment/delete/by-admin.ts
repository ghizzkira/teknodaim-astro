import type { APIContext, APIRoute } from "astro"

import {
  deleteDownloadComment,
  getDownloadCommentById,
} from "@/lib/action/download-comment"
import { z } from "zod"

import {
  deleteDownloadComment,
  getDownloadCommentById,
} from "@/lib/action/download-comment"
import { z } from "zod"

export const DELETE: APIRoute = async (context: APIContext) => {
  try {
    const body = await context.request.json()
    const parsedInput = z.string().parse(body)

    const user = context.locals.user
    const DB = context.locals.runtime.env.DB

    const downloadComment = await getDownloadCommentById(DB, parsedInput)

    if (!user) {
      return new Response(null, {
        status: 401,
      })
    }

    if (user?.id !== downloadComment?.authorId) {
      return new Response("You can only delete your comment", {
        status: 401,
      })
    }

    const data = await deleteDownloadComment(DB, parsedInput)

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

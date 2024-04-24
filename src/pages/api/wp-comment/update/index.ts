import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { getWpCommentById, updateWpComment } from "@/lib/action/wp-comment"
import { updateWpCommentSchema } from "@/lib/validation/wp-comment"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const body = await context.request.json()
    const parsedInput = updateWpCommentSchema.parse(body)

    const user = context.locals.user

    const wpComment = await getWpCommentById(parsedInput.id)

    if (!user) {
      return new Response(null, {
        status: 401,
      })
    }

    if (user?.id !== wpComment?.authorId) {
      return new Response("You can only update your comment", {
        status: 401,
      })
    }

    const data = await updateWpComment(parsedInput)

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

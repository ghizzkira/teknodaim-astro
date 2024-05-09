import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { updateDownloadComment } from "@/lib/action/download-comment"
import { updateDownloadCommentSchema } from "@/lib/validation/download-comment"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    //@ts-ignore
    const DB = context.locals.runtime.env.DB
    const body = await context.request.json()
    const parsedInput = updateDownloadCommentSchema.parse(body)

    const user = context.locals.user

    if (user?.role !== "admin") {
      return new Response(null, {
        status: 401,
      })
    }

    const data = await updateDownloadComment(DB, parsedInput)

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

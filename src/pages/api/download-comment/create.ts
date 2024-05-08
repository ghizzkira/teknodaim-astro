import type { APIContext, APIRoute } from "astro"

import { createDownloadComment } from "@/lib/action/download-comment"
import { createDownloadCommentSchema } from "@/lib/validation/download-comment"
import { z } from "zod"

import { createDownloadComment } from "@/lib/action/download-comment"
import { createDownloadCommentSchema } from "@/lib/validation/download-comment"
import { z } from "zod"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    const DB = context.locals.runtime.env.DB

    const body = await context.request.json()
    const parsedInput = createDownloadCommentSchema.parse(body)
    const data = await createDownloadComment(DB, {
      authorId: user?.id!,
      ...parsedInput,
    })

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
      return new Response(error.errors[0].message, { status: 422 })
    }
    return new Response("Internal Server Error", { status: 500 })
  }
}

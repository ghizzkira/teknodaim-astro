import type { APIContext, APIRoute } from "astro"

import { updateVideoEmbed } from "@/lib/action/video-embed"
import { updateVideoEmbedSchema } from "@/lib/validation/video-embed"
import { z } from "zod"

import { updateVideoEmbed } from "@/lib/action/video-embed"
import { updateVideoEmbedSchema } from "@/lib/validation/video-embed"
import { z } from "zod"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    const DB = context.locals.runtime.env.DB

    if (!user?.role.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = updateVideoEmbedSchema.parse(body)
    const data = await updateVideoEmbed(DB, parsedInput)

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

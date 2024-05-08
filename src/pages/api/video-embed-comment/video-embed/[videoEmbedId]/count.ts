import type { APIRoute } from "astro"

import { getVideoEmbedCommentsCountByVideoEmbedId } from "@/lib/action/video-embed-comment"
import { z } from "zod"

import { getVideoEmbedCommentsCountByVideoEmbedId } from "@/lib/action/video-embed-comment"
import { z } from "zod"

export const GET: APIRoute = async ({ locals, params }) => {
  try {
    const DB = locals.runtime.env.DB
    const videoEmbedId = params.videoEmbedId
    const parsedInput = z.string().parse(videoEmbedId)

    const data = await getVideoEmbedCommentsCountByVideoEmbedId(DB, parsedInput)

    if (!data) {
      return new Response(JSON.stringify(0), {
        status: 200,
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

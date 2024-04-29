import type { APIRoute } from "astro"
import { z } from "zod"

import { getArticleCommentsCountByArticleId } from "@/lib/action/article-comment"

export const GET: APIRoute = async ({ params, locals }) => {
  try {
    const DB = locals.runtime.env.DB
    const articleId = params.articleId
    const parsedInput = z.string().parse(articleId)

    const data = await getArticleCommentsCountByArticleId(DB, parsedInput)

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

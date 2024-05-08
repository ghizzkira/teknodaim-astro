import type { APIContext, APIRoute } from "astro"

import { createDownload } from "@/lib/action/download"
import { createDownloadSchema } from "@/lib/validation/download"
import { z } from "zod"

import { createDownload } from "@/lib/action/download"
import { createDownloadSchema } from "@/lib/validation/download"
import { z } from "zod"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const DB = context.locals.runtime.env.DB
    const user = context.locals.user

    if (!user?.role.includes("admin" || "author")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = createDownloadSchema.parse(body)
    const data = await createDownload(DB, parsedInput)

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

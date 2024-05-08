import type { APIContext, APIRoute } from "astro"

import { updateDownload } from "@/lib/action/download"
import { updateDownloadSchema } from "@/lib/validation/download"
import { z } from "zod"

import { updateDownload } from "@/lib/action/download"
import { updateDownloadSchema } from "@/lib/validation/download"
import { z } from "zod"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const DB = context.locals.runtime.env.DB
    const user = context.locals.user

    if (!user?.role.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = updateDownloadSchema.parse(body)
    const data = await updateDownload(DB, parsedInput)

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

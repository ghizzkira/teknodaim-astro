import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { createDownloadFile } from "@/lib/action/download-file"
import { createDownloadFileSchema } from "@/lib/validation/download-file"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user

    if (!user?.role.includes("admin" || "author")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = createDownloadFileSchema.parse(body)
    const data = await createDownloadFile(parsedInput)

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

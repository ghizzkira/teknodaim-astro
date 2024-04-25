import type { APIContext, APIRoute } from "astro"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { z } from "zod"

import { deleteMediaByName } from "@/lib/action/media"
import { r2Client } from "@/lib/r2"

export const DELETE: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user

    if (!user?.role.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = z.string().parse(body)

    const fileProperties = {
      Bucket: import.meta.env.R2_BUCKET,
      Key: parsedInput,
    }

    await r2Client.send(new DeleteObjectCommand(fileProperties))

    const data = await deleteMediaByName(parsedInput)

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

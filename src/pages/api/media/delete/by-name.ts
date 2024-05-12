import type { APIContext, APIRoute } from "astro"
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { z } from "zod"

import { deleteMediaByName } from "@/lib/action/media"

export const DELETE: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user

    const DB = context.locals.runtime.env.DB
    const R2_REGION = context.locals.runtime.env.R2_REGION
    const R2_ACCOUNT_ID = context.locals.runtime.env.R2_ACCOUNT_ID
    const R2_ACCESS_KEY = context.locals.runtime.env.R2_ACCESS_KEY
    const R2_SECRET_KEY = context.locals.runtime.env.R2_SECRET_KEY
    const R2_BUCKET = context.locals.runtime.env.R2_BUCKET
    if (!user?.role?.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = z.string().parse(body)

    const fileProperties = {
      Bucket: R2_BUCKET,
      Key: parsedInput,
    }
    const r2Config = {
      region: R2_REGION,
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY,
        secretAccessKey: R2_SECRET_KEY,
      },
    }
    const r2Client = new S3Client(r2Config)

    await r2Client.send(new DeleteObjectCommand(fileProperties))

    const data = await deleteMediaByName(DB, parsedInput)

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
    return new Response(JSON.stringify(error), { status: 501 })
  }
}

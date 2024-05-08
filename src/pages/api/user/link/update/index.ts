import type { APIContext, APIRoute } from "astro"

import { getUserLinkById, updateUserLink } from "@/lib/action/user-link"
import { updateUserLinkSchema } from "@/lib/validation/user-link"
import { z } from "zod"

import { getUserLinkById, updateUserLink } from "@/lib/action/user-link"
import { updateUserLinkSchema } from "@/lib/validation/user-link"
import { z } from "zod"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    const body = await context.request.json()
    const parsedInput = updateUserLinkSchema.parse(body)

    const userSession = context.locals.user
    const DB = context.locals.runtime.env.DB

    const userLink = await getUserLinkById(DB, parsedInput.id)

    if (!userSession) {
      return new Response(null, {
        status: 401,
      })
    }

    if (userSession?.id !== userLink?.user?.id) {
      return new Response("You can only update your profile", {
        status: 401,
      })
    }

    const data = await updateUserLink(DB, parsedInput)

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

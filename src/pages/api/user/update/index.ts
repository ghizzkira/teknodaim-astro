import type { APIContext, APIRoute } from "astro"
import { z } from "zod"

import { getUserById, updateUser } from "@/lib/action/user"
import { updateUserSchema } from "@/lib/validation/user"

export const PUT: APIRoute = async (context: APIContext) => {
  try {
    //@ts-ignore
    const DB = context.locals.runtime.env.DB
    const body = await context.request.json()
    const parsedInput = updateUserSchema.parse(body)

    const userSession = context.locals.user

    const user = await getUserById(DB, parsedInput.id)

    if (!userSession) {
      return new Response(null, {
        status: 401,
      })
    }

    if (userSession?.id !== user?.id) {
      return new Response("You can only update your profile", {
        status: 401,
      })
    }

    const data = await updateUser(DB, parsedInput)

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

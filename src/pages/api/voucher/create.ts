import type { APIContext, APIRoute } from "astro"

import { createVoucher } from "@/lib/action/voucher"
import { createVoucherSchema } from "@/lib/validation/voucher"
import { z } from "zod"

import { createVoucher } from "@/lib/action/voucher"
import { createVoucherSchema } from "@/lib/validation/voucher"
import { z } from "zod"

export const POST: APIRoute = async (context: APIContext) => {
  try {
    const user = context.locals.user
    const DB = context.locals.runtime.env.DB

    if (!user?.role.includes("admin")) {
      return new Response(null, {
        status: 401,
      })
    }

    const body = await context.request.json()
    const parsedInput = createVoucherSchema.parse(body)
    const data = await createVoucher(DB, parsedInput)

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

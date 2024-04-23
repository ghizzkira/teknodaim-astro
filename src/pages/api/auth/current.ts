import type { APIContext } from "astro"

export function GET(context: APIContext): Promise<Response> {
  if (!context.locals.user) {
    return new Response(null, {
      status: 401,
    })
  }

  return new Response(
    JSON.stringify({
      user: {
        id: context.locals.user.id,
        email: context.locals.user.email,
        name: context.locals.user.name,
        role: context.locals.user.role,
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

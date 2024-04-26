import { defineMiddleware } from "astro:middleware"
import { verifyRequestOrigin } from "lucia"

import { auth } from "@/lib/auth"

const excludedPaths = ["/api", "/auth", "/sitemap"]
export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url)
  console.log(url)
  if (context.request.method !== "GET") {
    const originHeader = context.request.headers.get("Origin")
    const hostHeader = context.request.headers.get("Host")
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return new Response(null, {
        status: 403,
      })
    }
  }

  const sessionId = context.cookies.get(auth.sessionCookieName)?.value ?? null
  if (!sessionId) {
    context.locals.user = null
    context.locals.session = null
    if (
      !url.pathname.endsWith("/") &&
      !excludedPaths.some((path) => url.pathname.startsWith(path))
    ) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: url + "/",
        },
      })
    }
    return next()
  }

  const { session, user } = await auth.validateSession(sessionId)
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id)
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  }
  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie()
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
  }
  context.locals.session = session
  context.locals.user = user

  if (
    !url.pathname.endsWith("/") &&
    !excludedPaths.some((path) => url.pathname.startsWith(path))
  ) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: url + "/",
      },
    })
  }

  return next()
})

export const config = {
  // Only run the middleware on the marketing route
  matcher: "/berita",
}

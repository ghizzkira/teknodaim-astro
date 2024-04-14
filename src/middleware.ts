/* eslint-disable @typescript-eslint/prefer-optional-chain */

import { defineMiddleware } from "astro:middleware"
import { verifyRequestOrigin } from "lucia"

import { auth } from "@/lib/auth"

export const onRequest = defineMiddleware(async (context, next) => {
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
    return next()
  }

  const { session, user } = await auth.validateSession(sessionId)
  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id)
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      //@ts-expect-error
      sessionCookie.attributes,
    )
  }
  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie()
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      //@ts-expect-error
      sessionCookie.attributes,
    )
  }
  context.locals.session = session
  context.locals.user = user
  return next()
})

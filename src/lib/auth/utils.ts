import type { APIContext } from "astro"
import type { Session, User } from "lucia"

import { auth } from "."

export const validateRequest = async function GET(
  context: APIContext,
): Promise<{ user: User; session: Session } | { user: null; session: null }> {
  const sessionId = context.cookies.get(auth.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return { user: null, session: null }
  }

  const result = await auth.validateSession(sessionId)
  try {
    if (result?.session?.fresh) {
      const sessionCookie = auth.createSessionCookie(result.session.id)
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        //@ts-expect-error
        sessionCookie.attributes,
      )
    }
    if (!result.session) {
      const sessionCookie = auth.createBlankSessionCookie()
      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        //@ts-expect-error
        sessionCookie.attributes,
      )
    }
  } catch {
    console.error("Failed to set session cookie")
  }
  return result
}

export interface AuthSession {
  session: {
    user: {
      id: string
      name: string
      username: string
      email: string
      image?: string
      phoneNumber?: string
      about?: string
      role: string
    }
  } | null
}

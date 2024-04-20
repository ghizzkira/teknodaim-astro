import type { APIContext } from "astro"
import { OAuth2RequestError } from "arctic"

import { auth, googleOAuth } from "@/lib/auth"
import { db } from "@/lib/db"
import { accounts, users } from "@/lib/db/schema"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code")
  const state = context.url.searchParams.get("state")
  const storedState = context.cookies.get("state")?.value ?? null
  const storedCodeVerifier = context.cookies.get("code_verifier")?.value ?? null

  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response("Invalid Request", {
      status: 400,
    })
  }

  try {
    const tokens = await googleOAuth.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    )

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    )

    const googleUser: GoogleUser = await googleUserResponse.json()

    const existingUser = await db.query.accounts.findFirst({
      where: (accounts, { and, eq }) =>
        and(
          eq(accounts.provider, "google"),
          eq(accounts.providerAccountId, googleUser.sub),
        ),
    })

    if (existingUser) {
      const session = await auth.createSession(existingUser.userId, {})
      const sessionCookie = auth.createSessionCookie(session.id)

      context.cookies.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
      return context.redirect("/")
    }

    const userId = cuid()

    await db.transaction(async (tx) => {
      await tx.insert(users).values({
        id: userId,
        email: googleUser.email,
        name: googleUser.name,
        username: `${slugify(googleUser.name)}_${uniqueCharacter()}`,
        image: googleUser.picture,
      })
      await tx.insert(accounts).values({
        provider: "google",
        providerAccountId: googleUser.sub,
        userId: userId,
      })
    })

    const session = await auth.createSession(userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return context.redirect("/")
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(e, {
      status: 500,
    })
  }
}

interface GoogleUser {
  sub: string
  email: string
  name: string
  picture: string
}

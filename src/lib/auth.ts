import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"

import "dotenv/config"

import { Google } from "arctic"
import { Lucia } from "lucia"

import { initializeDBWithoutSchema } from "@/lib/db"
import { sessions, users } from "@/lib/db/schema"
import type { UserRole } from "@/lib/validation/user"

export function initializeAuth(D1: D1Database) {
  const adapter = new DrizzleSQLiteAdapter(
    initializeDBWithoutSchema(D1),
    sessions,
    users,
  )

  return new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes: {
        secure: import.meta.env.APP_ENV === "production",
      },
    },
    getUserAttributes: (attributes) => {
      return {
        name: attributes.name,
        username: attributes.username,
        email: attributes.email,
        image: attributes.image,
        phoneNumber: attributes.phoneNumber,
        about: attributes.about,
        role: attributes.role,
      }
    },
  })
}

export const googleOAuth = new Google(
  import.meta.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID,
  import.meta.env.GOOGLE_CLIENT_SECRET ?? process.env.GOOGLE_CLIENT_SECRET,
  import.meta.env.GOOGLE_REDIRECT_URL ?? process.env.GOOGLE_REDIRECT_URL,
)

declare module "lucia" {
  interface Register {
    Lucia: typeof initializeAuth
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  name: string
  username: string
  email: string
  image: string
  phoneNumber: string
  about: string
  role: UserRole
}

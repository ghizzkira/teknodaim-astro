import { initializeDBWithoutSchema } from "@/lib/db"
import { sessions, users } from "@/lib/db/schema"
import type { UserRole } from "@/lib/validation/user"
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { Google } from "arctic"
import { Lucia } from "lucia"

import { initializeDBWithoutSchema } from "@/lib/db"
import { sessions, users } from "@/lib/db/schema"
import type { UserRole } from "@/lib/validation/user"
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { Google } from "arctic"
import { Lucia } from "lucia"

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
  import.meta.env.GOOGLE_CLIENT_ID ??
    "174500547602-jf04fv159t267gkrtujm4ese9535stoe.apps.googleusercontent.com",
  import.meta.env.GOOGLE_CLIENT_SECRET ?? "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",
  import.meta.env.GOOGLE_REDIRECT_URL ??
    "https://beta.teknodaim.com/auth/login/google/callback",
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

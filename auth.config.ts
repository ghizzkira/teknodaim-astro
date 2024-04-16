import Google from "@auth/core/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { db } from "@/lib/db"
import { getDomainWithoutSubdomain } from "@/lib/utils/domain"
import { uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"

const useSecureCookies = import.meta.env.PUBLIC_SITE_URL?.startsWith("https://")
const cookiePrefix = useSecureCookies ? "__Secure-" : ""
const hostName = getDomainWithoutSubdomain(import.meta.env.PUBLIC_SITE_URL!)

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain: hostName == "localhost" ? hostName : "." + hostName,
      },
    },
  },
  callbacks: {
    //@ts-ignore
    signIn({ user, profile }) {
      user.username = `${slugify(profile?.name!)}_${uniqueCharacter()}`
      return true
    },
    //@ts-ignore
    async session({ session }) {
      const res = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, session?.user?.email!),
      })
      return Promise.resolve({ user: { ...session.user, ...res } })
    },
  },
  pages: { signIn: "/auth/sign-in" },
}

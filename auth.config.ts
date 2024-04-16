import Google from "@auth/core/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

import { db } from "@/lib/db"

export default {
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

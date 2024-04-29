import "dotenv/config"

import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL!,
    authToken: process.env.VITE_DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config

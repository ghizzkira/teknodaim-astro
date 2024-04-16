import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://teknodaim-astro-dafundateam.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTMwOTU2MDYsImlkIjoiNGY4N2E1ZDYtNTI4ZS00Y2MxLWE0OTYtOTNjODFhYWRhNjQ0In0.ji6-NjxoFuPhEaQweCh1u-S40EIOsXMa74JJvJe613KAoivcyLTtWa6QiWPbr8penym-_7Zuj_EXFIe0EEkMBg",
  },
  // dbCredentials: {
  //   url: import.meta.env.DATABASE_URL,
  //   authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  // },
  verbose: true,
  strict: true,
} satisfies Config

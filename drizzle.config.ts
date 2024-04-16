import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://teknodaim-astro-dafundateam.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTMyNjM3ODksImlkIjoiNDQ0ZGJlZDktZmYyOS00NTFhLWJjNjctNDg5ZjYyZDkxZTFjIn0.8G5gtsYpsKT-lp6uyegBMo8EXfVz-AcY3sNkRj4Em5YOsqam5MEYlty7WC9eJBBMrzWFq25aXAVpFoiWfQCHAQ",
  },
  // dbCredentials: {
  //   url: import.meta.env.DATABASE_URL,
  //   authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  // },
  verbose: true,
  strict: true,
} satisfies Config

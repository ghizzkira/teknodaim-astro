import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://teknodaim-new-dafundateam.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTM3MDM0MzgsImlkIjoiMGQwY2RiNmEtODk4Ni00ZWNkLTk1YzctZTRkNmJjY2Q0MmY2In0.joqLZYxENKGJR0VbL2bIitHDXV9_TGQoqe-YFPv-pDM439Uwc6pmY_EclWnuVXN1r6hH-HOk4UPmsEjrdi82BA",
  },
  // dbCredentials: {
  //   url: import.meta.env.DATABASE_URL,
  //   authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  // },
  verbose: true,
  strict: true,
} satisfies Config

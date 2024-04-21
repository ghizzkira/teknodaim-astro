import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://teknodaim-new-dafundateam.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTM3MDUxNjQsImlkIjoiOWY1YWM1NzktYTFjNC00ZmEyLTkwYmMtZWIxZDUxM2I2MTM0In0.yLAzUWhq2L1xOXGL5FUlsuL5ctMVT2-1dLpI8b9nNLJY6wKyiURVhhlF-2EQBLgidTB9de8WpEyqx_nWDYhEBA",
  },
  // dbCredentials: {
  //   url: import.meta.env.DATABASE_URL,
  //   authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  // },
  verbose: true,
  strict: true,
} satisfies Config

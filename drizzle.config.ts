import type { Config } from "drizzle-kit"

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: "libsql://teknodaim-new-dafundateam.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTM0MTg3MDQsImlkIjoiMzExMDYwN2ItMDI0MS00YTNmLTk0ZDktODBlNzhmMmMxMTVhIn0.6dX_OQG3iZ71sRvE79oIXkIY0rUQrGnHoRn2fnqF8ALQZHUyo-yHmD3hBgTZZ2d_wBkZru-AWcvqgJySx8xMCw",
  },
  // dbCredentials: {
  //   url: import.meta.env.DATABASE_URL,
  //   authToken: import.meta.env.DATABASE_AUTH_TOKEN,
  // },
  verbose: true,
  strict: true,
} satisfies Config

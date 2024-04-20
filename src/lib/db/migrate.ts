import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"
import { migrate } from "drizzle-orm/libsql/migrator"

async function main() {
  const db = drizzle(
    createClient({
      // url: import.meta.env.DATABASE_URL,
      // authToken: import.meta.env.DATABASE_AUTH_TOKEN,
      url: "libsql://teknodaim-new-dafundateam.turso.io",
      authToken:
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTM0MTg3MDQsImlkIjoiMzExMDYwN2ItMDI0MS00YTNmLTk0ZDktODBlNzhmMmMxMTVhIn0.6dX_OQG3iZ71sRvE79oIXkIY0rUQrGnHoRn2fnqF8ALQZHUyo-yHmD3hBgTZZ2d_wBkZru-AWcvqgJySx8xMCw",
    }),
  )

  console.log("Running migrations")

  await migrate(db, { migrationsFolder: "src/lib/db/migrations" })

  console.log("Migrated successfully")

  process.exit(0)
}

main().catch((e) => {
  console.error("Migration failed")
  console.error(e)
  process.exit(1)
})

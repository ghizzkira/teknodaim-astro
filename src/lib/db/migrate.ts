import { createClient } from "@libsql/client"

import "dotenv/config"

import { drizzle } from "drizzle-orm/libsql"
import { migrate } from "drizzle-orm/libsql/migrator"

async function main() {
  const db = drizzle(
    createClient({
      url: process.env.VITE_DATABASE_URL!,
      authToken: process.env.VITE_DATABASE_AUTH_TOKEN,
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

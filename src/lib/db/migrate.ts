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
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTM3MDUxNjQsImlkIjoiOWY1YWM1NzktYTFjNC00ZmEyLTkwYmMtZWIxZDUxM2I2MTM0In0.yLAzUWhq2L1xOXGL5FUlsuL5ctMVT2-1dLpI8b9nNLJY6wKyiURVhhlF-2EQBLgidTB9de8WpEyqx_nWDYhEBA",
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

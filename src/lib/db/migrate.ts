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
        "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTM3MDM0MzgsImlkIjoiMGQwY2RiNmEtODk4Ni00ZWNkLTk1YzctZTRkNmJjY2Q0MmY2In0.joqLZYxENKGJR0VbL2bIitHDXV9_TGQoqe-YFPv-pDM439Uwc6pmY_EclWnuVXN1r6hH-HOk4UPmsEjrdi82BA",
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

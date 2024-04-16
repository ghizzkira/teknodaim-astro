import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

export const sqlite = createClient({
  url: import.meta.env.DATABASE_URL,
  authToken: import.meta.env.DATABASE_AUTH_TOKEN,
})

export const initializeDB = drizzle(sqlite)
export const db = drizzle(sqlite, { schema })
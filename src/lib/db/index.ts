import "dotenv/config"

import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

export const sqlite = createClient({
  url: process.env.VITE_DATABASE_URL!,
  authToken: process.env.VITE_DATABASE_AUTH_TOKEN,
})

export const initializeDB = drizzle(sqlite)
export const db = drizzle(sqlite, { schema })

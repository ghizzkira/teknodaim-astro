import { createClient } from "@libsql/client"
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql"

import * as schema from "./schema"

export const client = createClient({
  url: import.meta.env.VITE_DATABASE_URL!,
  authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN!,
})

export function dbClient(): LibSQLDatabase<typeof schema> {
  const url = import.meta.env.VITE_DATABASE_URL?.trim()
  if (url === undefined) {
    throw new Error("VITE_DATABASE_URL is not defined")
  }

  const authToken = import.meta.env.VITE_DATABASE_AUTH_TOKEN?.trim()
  if (authToken === undefined) {
    if (!url.includes("file:")) {
      throw new Error("VITE_DATABASE_AUTH_TOKEN is not defined")
    }
  }

  return drizzle(
    createClient({
      url,
      authToken,
    }),
    { schema },
  )
}

export const initializeDB = drizzle(client)
export const db = dbClient()
// export const db = drizzle(client, { schema })

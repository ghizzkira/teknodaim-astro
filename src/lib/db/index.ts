import "dotenv/config"

import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

import * as schema from "./schema"

export const client = () =>
  createClient({
    url: import.meta.env.VITE_DATABASE_URL!,
    authToken: import.meta.env.VITE_DATABASE_AUTH_TOKEN!,
  })

export const initializeDB = drizzle(client())
export const db = drizzle(client(), { schema })

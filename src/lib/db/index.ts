import * as schema from "./schema"
import { drizzle } from "drizzle-orm/d1"

import * as schema from "./schema"
import { drizzle } from "drizzle-orm/d1"

export const initializeDBWithoutSchema = (DB: D1Database) => {
  return drizzle(DB)
}

export const initializeDB = (DB: D1Database) => {
  return drizzle(DB, { schema })
}

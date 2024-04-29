import { drizzle } from "drizzle-orm/d1"

import * as schema from "./schema"

export const initializeDBWithoutSchema = (DB: D1Database) => drizzle(DB)

export const initializeDB = (DB: D1Database) => drizzle(DB, { schema })

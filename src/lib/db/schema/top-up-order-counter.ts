import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const topUpOrderCounters = sqliteTable("top_up_order_counters", {
  id: text("id").primaryKey(),
  brand: text("brand").unique().notNull(),
  orders: integer("orders").notNull().default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export type InsertTopUpOrderCounter = typeof topUpOrderCounters.$inferInsert
export type SelectTopUpOrderCounter = typeof topUpOrderCounters.$inferSelect

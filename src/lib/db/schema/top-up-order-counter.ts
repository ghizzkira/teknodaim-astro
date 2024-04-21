import { sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const topUpOrderCounters = sqliteTable("top_up_order_counters", {
  id: text("id").primaryKey(),
  key: text("key").unique().notNull(),
  value: text("value").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export type InsertTopUpOrderCounter = typeof topUpOrderCounters.$inferInsert
export type SelectTopUpOrderCounter = typeof topUpOrderCounters.$inferSelect

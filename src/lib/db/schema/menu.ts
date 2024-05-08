import { MENU_POSITION } from "@/lib/validation/menu"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { MENU_POSITION } from "@/lib/validation/menu"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const menus = sqliteTable("menus", {
  id: text("id").primaryKey(),
  title: text("title").unique().notNull(),
  link: text("link"),
  position: text("position", { enum: MENU_POSITION })
    .notNull()
    .default("sidebar_all"),
  order: integer("order").notNull().default(0),
  icon: text("icon"),
  iconDark: text("icon_dark"),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export type InsertMenu = typeof menus.$inferInsert
export type SelectMenu = typeof menus.$inferSelect

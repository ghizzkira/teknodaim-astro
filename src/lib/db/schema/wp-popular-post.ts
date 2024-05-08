import { LANGUAGE_TYPE } from "@/lib/validation/language"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { LANGUAGE_TYPE } from "@/lib/validation/language"
import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const wpPopularPosts = sqliteTable("wp_popular_posts", {
  id: text("id").primaryKey(),
  title: text("title").unique().notNull(),
  slug: text("slug").unique().notNull(),
  excerpt: text("excerpt").notNull(),
  language: text("language", { enum: LANGUAGE_TYPE }).notNull().default("id"),
  publishedTime: text("published_time").notNull(),
  thumbnail: text("thumbail").notNull(),
  primaryCategory: text("primary_category").notNull(),
  primaryCategorySlug: text("primary_category_slug").notNull(),
  authorName: text("author_name").notNull(),
  authorSlug: text("author_slug").notNull(),
  authorImage: text("author_image").notNull(),
  views: integer("views").notNull().default(0),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export type InsertWpPopularPost = typeof wpPopularPosts.$inferInsert
export type SelectWpPopularPost = typeof wpPopularPosts.$inferSelect

import { users } from "./user"
import { relations, sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

import { users } from "./user"
import { relations, sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const wpComments = sqliteTable("wp_comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  wpPostSlug: text("wp_post_slug").notNull(),
  replyToId: text("reply_to_id"),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const wpCommentsRelations = relations(wpComments, ({ one, many }) => ({
  replyTo: one(wpComments, {
    fields: [wpComments.replyToId],
    references: [wpComments.id],
    relationName: "wp_comments_replies",
  }),
  author: one(users, {
    fields: [wpComments.authorId],
    references: [users.id],
  }),
  replies: many(wpComments, {
    relationName: "wp_comments_replies",
  }),
}))

export type InsertWpComment = typeof wpComments.$inferInsert
export type SelectWpComment = typeof wpComments.$inferSelect

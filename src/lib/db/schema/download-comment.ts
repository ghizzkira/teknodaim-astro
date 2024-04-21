import { relations, sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

import { downloads } from "./download"
import { users } from "./user"

export const downloadComments = sqliteTable("download_comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  replyToId: text("reply_to_id"),
  downloadId: text("download_id")
    .notNull()
    .references(() => downloads.id),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const downloadCommentsRelations = relations(
  downloadComments,
  ({ one, many }) => ({
    replyTo: one(downloadComments, {
      fields: [downloadComments.replyToId],
      references: [downloadComments.id],
      relationName: "download_comments_replies",
    }),
    author: one(users, {
      fields: [downloadComments.authorId],
      references: [users.id],
    }),
    download: one(downloads, {
      fields: [downloadComments.downloadId],
      references: [downloads.id],
    }),
    replies: many(downloadComments, {
      relationName: "download_comments_replies",
    }),
  }),
)

export type InsertDownloadComment = typeof downloadComments.$inferInsert
export type SelectDownloadComment = typeof downloadComments.$inferSelect

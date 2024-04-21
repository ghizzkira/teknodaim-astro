import { relations, sql } from "drizzle-orm"
import { sqliteTable, text } from "drizzle-orm/sqlite-core"

import { users } from "./user"
import { videoEmbeds } from "./video-embed"

export const videoEmbedComments = sqliteTable("video_embed_comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  replyToId: text("reply_to_id"),
  videoEmbedId: text("video_embed_id")
    .notNull()
    .references(() => videoEmbeds.id),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const videoEmbedCommentsRelations = relations(
  videoEmbedComments,
  ({ one, many }) => ({
    replyTo: one(videoEmbedComments, {
      fields: [videoEmbedComments.replyToId],
      references: [videoEmbedComments.id],
      relationName: "video_embed_comments_replies",
    }),
    author: one(users, {
      fields: [videoEmbedComments.authorId],
      references: [users.id],
    }),
    videoEmbed: one(videoEmbeds, {
      fields: [videoEmbedComments.videoEmbedId],
      references: [videoEmbeds.id],
    }),
    replies: many(videoEmbedComments, {
      relationName: "video_mbed_comments_replies",
    }),
  }),
)

export type InsertVideoEmbedComment = typeof videoEmbedComments.$inferInsert
export type SelectVideoEmbedComment = typeof videoEmbedComments.$inferSelect

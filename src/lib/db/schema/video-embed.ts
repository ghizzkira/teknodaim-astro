import { medias } from "./media"
import { topics } from "./topic"
import { users } from "./user"
import { videoEmbedComments } from "./video-embed-comment"
import { STATUS_TYPE } from "@/lib/validation/status"
import { VIDEO_EMBED_TYPE } from "@/lib/validation/video-embed"
import { relations, sql } from "drizzle-orm"
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { medias } from "./media"
import { topics } from "./topic"
import { users } from "./user"
import { videoEmbedComments } from "./video-embed-comment"
import { STATUS_TYPE } from "@/lib/validation/status"
import { VIDEO_EMBED_TYPE } from "@/lib/validation/video-embed"
import { relations, sql } from "drizzle-orm"
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const videoEmbeds = sqliteTable("video_embeds", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  embedLink: text("embed_link").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status", { enum: STATUS_TYPE }).notNull().default("draft"),
  featuredImageId: text("featured_image_id").references(() => medias.id),
  type: text("type", { enum: VIDEO_EMBED_TYPE }).notNull().default("youtube"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const videoEmbedsRelations = relations(videoEmbeds, ({ one, many }) => ({
  featuredImage: one(medias, {
    fields: [videoEmbeds.featuredImageId],
    references: [medias.id],
  }),
  topics: many(videoEmbedTopics),
  authors: many(videoEmbedAuthors),
  comments: many(videoEmbedComments),
}))

export const videoEmbedAuthors = sqliteTable(
  "_video_embed_authors",
  {
    videoEmbedId: text("video_embed_id")
      .notNull()
      .references(() => videoEmbeds.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.videoEmbedId, t.userId],
    }),
  }),
)

export const videoEmbedAuthorsRelations = relations(
  videoEmbedAuthors,
  ({ one }) => ({
    videoEmbed: one(videoEmbeds, {
      fields: [videoEmbedAuthors.videoEmbedId],
      references: [videoEmbeds.id],
    }),
    user: one(users, {
      fields: [videoEmbedAuthors.userId],
      references: [users.id],
    }),
  }),
)

export const videoEmbedTopics = sqliteTable(
  "_video_embed_topics",
  {
    videoEmbedId: text("video_embed_id")
      .notNull()
      .references(() => videoEmbeds.id),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.videoEmbedId, t.topicId],
    }),
  }),
)

export const videoEmbedTopicsRelations = relations(
  videoEmbedTopics,
  ({ one }) => ({
    videoEmbed: one(videoEmbeds, {
      fields: [videoEmbedTopics.videoEmbedId],
      references: [videoEmbeds.id],
    }),
    topic: one(topics, {
      fields: [videoEmbedTopics.topicId],
      references: [topics.id],
    }),
  }),
)

export type InsertVideoEmbed = typeof videoEmbeds.$inferInsert
export type SelectVideoEmbed = typeof videoEmbeds.$inferSelect

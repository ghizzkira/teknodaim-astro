import { relations, sql } from "drizzle-orm"
import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { DOWNLOAD_SCHEMA_JSON, DOWNLOAD_TYPE } from "@/lib/validation/download"
import { LANGUAGE_TYPE } from "@/lib/validation/language"
import { STATUS_TYPE } from "@/lib/validation/status"
import { downloadComments } from "./download-comment"
import { downloadFiles } from "./download-file"
import { medias } from "./media"
import { topics } from "./topic"
import { users } from "./user"

export const downloadTranslations = sqliteTable("download_translations", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const downloads = sqliteTable("downloads", {
  id: text("id").primaryKey(),
  language: text("language", { enum: LANGUAGE_TYPE }).notNull().default("id"),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  developer: text("developer").notNull(),
  operatingSystem: text("operating_system").notNull(),
  license: text("license").notNull(),
  officialWebsite: text("official_website").notNull(),
  schemaType: text("schema_type", { enum: DOWNLOAD_SCHEMA_JSON }).notNull(),
  type: text("type", { enum: DOWNLOAD_TYPE }).notNull(),
  status: text("status", { enum: STATUS_TYPE }).notNull().default("draft"),
  downloadTranslationId: text("download_translation_id")
    .notNull()
    .references(() => downloadTranslations.id),
  featuredImageId: text("featured_image_id")
    .notNull()
    .references(() => medias.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const downloadsRelations = relations(downloads, ({ one, many }) => ({
  downloadTranslation: one(downloadTranslations, {
    fields: [downloads.downloadTranslationId],
    references: [downloadTranslations.id],
  }),
  featuredImage: one(medias, {
    fields: [downloads.featuredImageId],
    references: [medias.id],
  }),
  downloadFiles: many(downloadDownloadFiles),
  topics: many(downloadTopics),
  authors: many(downloadAuthors),
  comments: many(downloadComments),
}))

export const downloadTranslationsRelations = relations(
  downloadTranslations,
  ({ many }) => ({
    downloads: many(downloads),
  }),
)

export const downloadDownloadFiles = sqliteTable(
  "_download_download_files",
  {
    downloadId: text("download_id")
      .notNull()
      .references(() => downloads.id),
    downloadFileId: text("download_file_id")
      .notNull()
      .references(() => downloadFiles.id),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.downloadId, t.downloadFileId],
    }),
  }),
)

export const downloadDownloadFilesRelations = relations(
  downloadDownloadFiles,
  ({ one }) => ({
    download: one(downloads, {
      fields: [downloadDownloadFiles.downloadId],
      references: [downloads.id],
    }),
    downloadFile: one(downloadFiles, {
      fields: [downloadDownloadFiles.downloadFileId],
      references: [downloadFiles.id],
    }),
  }),
)

export const downloadAuthors = sqliteTable(
  "_download_authors",
  {
    downloadId: text("download_id")
      .notNull()
      .references(() => downloads.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.downloadId, t.userId],
    }),
  }),
)

export const downloadAuthorsRelations = relations(
  downloadAuthors,
  ({ one }) => ({
    download: one(downloads, {
      fields: [downloadAuthors.downloadId],
      references: [downloads.id],
    }),
    user: one(users, {
      fields: [downloadAuthors.userId],
      references: [users.id],
    }),
  }),
)

export const downloadTopics = sqliteTable(
  "_download_topics",
  {
    downloadId: text("download_id")
      .notNull()
      .references(() => downloads.id),
    topicId: text("topic_id")
      .notNull()
      .references(() => topics.id),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.downloadId, t.topicId],
    }),
  }),
)

export const downloadTopicsRelations = relations(downloadTopics, ({ one }) => ({
  download: one(downloads, {
    fields: [downloadTopics.downloadId],
    references: [downloads.id],
  }),
  topic: one(topics, {
    fields: [downloadTopics.topicId],
    references: [topics.id],
  }),
}))

export type InsertDownload = typeof downloads.$inferInsert
export type SelectDownload = typeof downloads.$inferSelect

export type InsertDownloadTranslation = typeof downloadTranslations.$inferInsert
export type SelectDownloadTranslation = typeof downloadTranslations.$inferSelect

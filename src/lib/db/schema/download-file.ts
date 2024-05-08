import { downloadDownloadFiles } from "./download"
import { medias } from "./media"
import { users } from "./user"
import { STATUS_TYPE } from "@/lib/validation/status"
import { relations, sql } from "drizzle-orm"
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { downloadDownloadFiles } from "./download"
import { medias } from "./media"
import { users } from "./user"
import { STATUS_TYPE } from "@/lib/validation/status"
import { relations, sql } from "drizzle-orm"
import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const downloadFiles = sqliteTable("download_files", {
  id: text("id").primaryKey(),
  title: text("title").unique().notNull(),
  slug: text("slug").unique().notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  version: text("version").notNull(),
  downloadLink: text("download_link").notNull(),
  fileSize: text("file_size").notNull(),
  currency: text("currency").notNull(),
  price: text("price").notNull(),
  status: text("status", { enum: STATUS_TYPE }).notNull().default("draft"),
  views: integer("views").notNull().default(0),
  featuredImageId: text("featured_image_id")
    .notNull()
    .references(() => medias.id),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

export const downloadFilesRelations = relations(
  downloadFiles,
  ({ one, many }) => ({
    featuredImage: one(medias, {
      fields: [downloadFiles.featuredImageId],
      references: [medias.id],
    }),
    authors: many(downloadFileAuthors),
    downloads: many(downloadDownloadFiles),
  }),
)

export const downloadFileAuthors = sqliteTable(
  "_download_file_authors",
  {
    downloadFileId: text("download_file_id")
      .notNull()
      .references(() => downloadFiles.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.downloadFileId, t.userId],
    }),
  }),
)

export type InsertDownloadFile = typeof downloadFiles.$inferInsert
export type SelectDownloadFile = typeof downloadFiles.$inferSelect

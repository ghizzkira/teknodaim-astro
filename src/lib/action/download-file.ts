import { and, count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { downloadDownloadFiles, downloads } from "@/lib/db/schema/download"
import {
  downloadFileAuthors,
  downloadFiles,
} from "@/lib/db/schema/download-file"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type {
  CreateDownloadFile,
  UpdateDownloadFile,
} from "@/lib/validation/download-file"
import { medias } from "../db/schema/media"
import { users } from "../db/schema/user"

export const getDownloadFilesDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.downloadFiles.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
  })

  return data
}

export const getDownloadFileById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const downloadFileData = await db
    .select()
    .from(downloadFiles)
    .leftJoin(medias, eq(medias.id, downloadFiles.featuredImageId))
    .where(eq(downloadFiles.id, input))
    .limit(1)

  const downloadFileAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(downloadFileAuthors)
    .leftJoin(
      downloadFiles,
      eq(downloadFileAuthors.downloadFileId, downloadFiles.id),
    )
    .leftJoin(users, eq(downloadFileAuthors.userId, users.id))
    .where(eq(downloadFiles.id, input))
    .all()

  const data = downloadFileData.map((item) => ({
    ...item.download_files,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    authors: downloadFileAuthorsData,
  }))

  return data[0]
}

export const getDownloadFileBySlug = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const downloadFileData = await db.query.downloadFiles.findFirst({
    where: (downloadFiles, { eq }) => eq(downloadFiles.slug, input),
    with: {
      featuredImage: true,
    },
  })

  const data = {
    ...downloadFileData,
  }

  return data
}

export const getDownloadFilesSitemap = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const downloadFilesData = await db.query.downloadFiles.findMany({
    where: (downloadFiles, { eq }) => eq(downloadFiles.status, "published"),
    limit: perPage,
    offset: (page - 1) * perPage,
    columns: {
      id: true,
      slug: true,
      updatedAt: true,
    },
  })

  const downloadFileDownloadsData = await db
    .select({ id: downloads.id, type: downloads.type, slug: downloads.slug })
    .from(downloadDownloadFiles)
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadId, downloads.id),
    )
    .where(eq(downloadFiles.id, downloadFilesData[0].id!))
    .all()

  const data = {
    ...downloadFilesData,
    downloads: downloadFileDownloadsData,
  }

  return data
}

export const getDownloadFilesCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(downloadFiles)
    .where(and(eq(downloadFiles.status, "published")))
  return data[0].value
}

export const searchDownloadFiles = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.query.downloadFiles.findMany({
    where: (downloadFiles, { eq, and, or, like }) =>
      and(
        eq(downloadFiles.status, "published"),
        or(
          like(downloadFiles.title, `%${input}%`),
          like(downloadFiles.version, `%${input}%`),
          like(downloadFiles.downloadLink, `%${input}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })

  return data
}

export const searchDownloadFilesDashboard = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)

  const downloadFilesData = await db.query.downloadFiles.findMany({
    where: (downloadFiles, { eq, and, or, like }) =>
      and(
        eq(downloadFiles.status, "published"),
        or(
          like(downloadFiles.title, `%${input}%`),
          like(downloadFiles.version, `%${input}%`),
          like(downloadFiles.downloadLink, `%${input}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })

  const downloadFileDownloadsData = await db
    .select({ id: downloads.id, type: downloads.type, slug: downloads.slug })
    .from(downloadDownloadFiles)
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadId, downloads.id),
    )
    .where(eq(downloadFiles.id, downloadFilesData[0].id!))
    .all()

  const data = {
    ...downloadFilesData,
    downloads: downloadFileDownloadsData,
  }

  return data
}

export const createDownloadFile = async (
  DB: D1Database,
  input: CreateDownloadFile,
) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedMetaTitle
    : input.metaDescription

  const downloadFileId = cuid()

  const db = initializeDB(DB)

  const data = await db
    .insert(downloadFiles)
    .values({
      ...input,
      id: downloadFileId,
      slug: slug,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
    })
    .returning()

  const authorValues = input.authors.map((author) => ({
    downloadFileId: data[0].id,
    userId: author,
  }))

  await db.insert(downloadFileAuthors).values(authorValues)

  return data
}

export const updateDownloadFile = async (
  DB: D1Database,
  input: UpdateDownloadFile,
) => {
  const db = initializeDB(DB)

  const data = await db
    .update(downloadFiles)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(downloadFiles.id, input.id))
    .returning()

  await db
    .delete(downloadFileAuthors)
    .where(eq(downloadFileAuthors.downloadFileId, input.id))

  const authorValues = input.authors.map((author) => ({
    downloadFileId: data[0].id,
    userId: author,
  }))

  await db.insert(downloadFileAuthors).values(authorValues)

  return data
}

export const deleteDownloadFile = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.batch([
    db
      .delete(downloadFileAuthors)
      .where(eq(downloadFileAuthors.downloadFileId, input)),
    db.delete(downloadFiles).where(eq(downloadFiles.id, input)),
  ])

  return data
}

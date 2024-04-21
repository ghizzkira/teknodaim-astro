import { and, count, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type {
  CreateDownloadFile,
  UpdateDownloadFile,
} from "@/lib/validation/download-file"
import { downloadDownloadFiles, downloads } from "../schema/download"
import { downloadFileAuthors, downloadFiles } from "../schema/download-file"

export const getDownloadFilesDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const downloadFilesData = await db.query.downloadFiles.findMany({
    where: (downloadFiles, { eq }) => eq(downloadFiles.status, "published"),
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const downloadFileDownloadsData = await db
    .select({
      id: downloads.id,
      title: downloads.title,
      slug: downloads.slug,
      developer: downloads.developer,
      operatingSystem: downloads.operatingSystem,
      license: downloads.license,
      officialWebsite: downloads.officialWebsite,
      schemaType: downloads.schemaType,
      type: downloads.type,
    })
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

export const getDownloadFileById = async (id: string) => {
  const downloadFileData = await db.query.downloadFiles.findFirst({
    where: (downloadFiles, { eq }) => eq(downloadFiles.id, id),
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const downloadFileDownloadsData = await db
    .select({
      id: downloads.id,
      title: downloads.title,
      slug: downloads.slug,
      developer: downloads.developer,
      operatingSystem: downloads.operatingSystem,
      license: downloads.license,
      officialWebsite: downloads.officialWebsite,
      schemaType: downloads.schemaType,
      type: downloads.type,
    })
    .from(downloadDownloadFiles)
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadId, downloads.id),
    )
    .where(eq(downloadFiles.id, downloadFileData?.id!))
    .all()

  const data = {
    ...downloadFileData,
    downloads: downloadFileDownloadsData,
  }

  return data
}

export const getDownloadFileBySlug = async (slug: string) => {
  const downloadFileData = await db.query.downloadFiles.findFirst({
    where: (downloadFiles, { eq }) => eq(downloadFiles.slug, slug),
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const downloadFileDownloadsData = await db
    .select({
      id: downloads.id,
      title: downloads.title,
      slug: downloads.slug,
      developer: downloads.developer,
      operatingSystem: downloads.operatingSystem,
      license: downloads.license,
      officialWebsite: downloads.officialWebsite,
      schemaType: downloads.schemaType,
      type: downloads.type,
    })
    .from(downloadDownloadFiles)
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadId, downloads.id),
    )
    .where(eq(downloadFiles.slug, slug))
    .all()

  const data = {
    ...downloadFileData,
    downloads: downloadFileDownloadsData,
  }

  return data
}

export const getDownloadFilesSitemap = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
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

export const getDownloadFilesCount = async () => {
  const data = await db
    .select({ value: count() })
    .from(downloadFiles)
    .where(and(eq(downloadFiles.status, "published")))
  return data[0].value
}

export const searchDownloadFiles = async (searchQuery: string) => {
  const downloadFilesData = await db.query.downloadFiles.findMany({
    where: (downloadFiles, { eq, and, or, like }) =>
      and(
        eq(downloadFiles.status, "published"),
        or(
          like(downloadFiles.title, `%${searchQuery}%`),
          like(downloadFiles.version, `%${searchQuery}%`),
          like(downloadFiles.downloadLink, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })

  const downloadFileDownloadsData = await db
    .select({
      id: downloads.id,
      title: downloads.title,
      slug: downloads.slug,
      developer: downloads.developer,
      operatingSystem: downloads.operatingSystem,
      license: downloads.license,
      officialWebsite: downloads.officialWebsite,
      schemaType: downloads.schemaType,
      type: downloads.type,
    })
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

export const searchDownloadFilesDashboard = async (searchQuery: string) => {
  const downloadFilesData = await db.query.downloadFiles.findMany({
    where: (downloadFiles, { eq, and, or, like }) =>
      and(
        eq(downloadFiles.status, "published"),
        or(
          like(downloadFiles.title, `%${searchQuery}%`),
          like(downloadFiles.version, `%${searchQuery}%`),
          like(downloadFiles.downloadLink, `%${searchQuery}%`),
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

export const createDownloadFile = async (input: CreateDownloadFile) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedMetaTitle
    : input.metaDescription

  const downloadFileId = cuid()

  const data = await db.transaction(async (tx) => {
    const downloadFile = await tx
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
      downloadFileId: downloadFile[0].id,
      userId: author,
    }))

    await tx.insert(downloadFileAuthors).values(authorValues)

    return downloadFile
  })

  return data
}

export const updateDownloadFile = async (input: UpdateDownloadFile) => {
  const data = await db.transaction(async (tx) => {
    const downloadFile = await tx
      .insert(downloadFiles)
      .values({
        ...input,
      })
      .returning()

    await tx
      .delete(downloadFileAuthors)
      .where(eq(downloadFileAuthors.downloadFileId, input.id))

    const authorValues = input.authors.map((author) => ({
      downloadFileId: downloadFile[0].id,
      userId: author,
    }))

    await tx.insert(downloadFileAuthors).values(authorValues)

    return downloadFile
  })

  return data
}

export const deleteDownloadFile = async (id: string) => {
  const data = await db.transaction(async (tx) => {
    await tx
      .delete(downloadFileAuthors)
      .where(eq(downloadFileAuthors.downloadFileId, id))
    const downloadFile = await tx
      .delete(downloadFiles)
      .where(eq(downloadFiles.id, id))
    return downloadFile
  })
  return data
}

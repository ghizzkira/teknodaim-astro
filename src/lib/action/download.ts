import { and, count, desc, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import {
  downloadAuthors,
  downloadDownloadFiles,
  downloads,
  downloadTopics,
  downloadTranslations,
} from "@/lib/db/schema/download"
import { downloadFiles } from "@/lib/db/schema/download-file"
import { medias } from "@/lib/db/schema/media"
import { topics } from "@/lib/db/schema/topic"
import { users } from "@/lib/db/schema/user"
import { trimText } from "@/lib/utils/content"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type {
  CreateDownload,
  DownloadType,
  TranslateDownload,
  UpdateDownload,
} from "@/lib/validation/download"
import type { LanguageType } from "@/lib/validation/language"

export const getDownloadTranslationById = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)

  const downloadTranslationData = await db.query.downloadTranslations.findFirst(
    {
      where: (downloadTranslations, { eq }) =>
        eq(downloadTranslations.id, input),
      with: {
        downloads: {
          columns: {
            id: true,
            title: true,
            language: true,
            developer: true,
            operatingSystem: true,
            license: true,
            officialWebsite: true,
            schemaType: true,
            type: true,
          },
          with: {
            featuredImage: {
              columns: {
                id: true,
                url: true,
              },
            },
            authors: true,
          },
        },
      },
    },
  )

  const downloadFilesData = await db
    .select({
      id: downloadFiles.id,
      title: downloadFiles.title,
      version: downloadFiles.version,
      fileSize: downloadFiles.fileSize,
      price: downloadFiles.price,
    })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, downloadTranslationData?.downloads[0].id!))
    .all()

  const downloadTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(downloadTopics)
    .leftJoin(downloads, eq(downloadTopics.downloadId, downloads.id))
    .leftJoin(topics, eq(downloadTopics.topicId, topics.id))
    .where(eq(downloads.id, downloadTranslationData?.downloads[0].id!))
    .all()

  const downloadAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(downloadAuthors)
    .leftJoin(downloads, eq(downloadAuthors.downloadId, downloads.id))
    .leftJoin(users, eq(downloadAuthors.userId, users.id))
    .where(eq(downloads.id, downloadTranslationData?.downloads[0].id!))
    .all()

  const downloadData = downloadTranslationData?.downloads.map((item) => ({
    ...item,
    downloadFiles: downloadFilesData,
    topics: downloadTopicsData,
    authors: downloadAuthorsData,
  }))

  const data = {
    ...downloadTranslationData,
    downloads: downloadData,
  }

  return data
}

export const getDownloadById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const downloadData = await db
    .select()
    .from(downloads)
    .leftJoin(medias, eq(medias.id, downloads.featuredImageId))
    .where(eq(downloads.id, input))
    .limit(1)

  const downloadFilesData = await db
    .select({
      id: downloadFiles.id,
      title: downloadFiles.title,
      version: downloadFiles.version,
      fileSize: downloadFiles.fileSize,
      price: downloadFiles.price,
    })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, input))
    .all()

  const downloadTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(downloadTopics)
    .leftJoin(downloads, eq(downloadTopics.downloadId, downloads.id))
    .leftJoin(topics, eq(downloadTopics.topicId, topics.id))
    .where(eq(downloads.id, input))
    .all()

  const downloadAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(downloadAuthors)
    .leftJoin(downloads, eq(downloadAuthors.downloadId, downloads.id))
    .leftJoin(users, eq(downloadAuthors.userId, users.id))
    .where(eq(downloads.id, input))
    .all()

  const data = downloadData.map((item) => ({
    ...item.downloads,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    downloadFiles: downloadFilesData,
    topics: downloadTopicsData,
    authors: downloadAuthorsData,
  }))

  return data[0]
}

export const getDownloadBySlug = async (
  DB: D1Database,
  input: {
    slug: string
    downloadFilePage: number
    downloadFilePerPage: number
  },
) => {
  const { slug, downloadFilePage, downloadFilePerPage } = input

  const db = initializeDB(DB)

  const downloadData = await db
    .select()
    .from(downloads)
    .leftJoin(medias, eq(medias.id, downloads.featuredImageId))
    .where(eq(downloads.slug, slug))
    .limit(1)

  const downloadFilesData = await db
    .select({
      id: downloadFiles.id,
      title: downloadFiles.title,
      version: downloadFiles.version,
      fileSize: downloadFiles.fileSize,
      price: downloadFiles.price,
    })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, downloadData[0].downloads.id))
    .limit(downloadFilePage)
    .offset((downloadFilePage - 1) * downloadFilePerPage)

  const downloadTopicsData = await db
    .select({ id: topics.id, title: topics.title, slug: topics.slug })
    .from(downloadTopics)
    .leftJoin(downloads, eq(downloadTopics.downloadId, downloads.id))
    .leftJoin(topics, eq(downloadTopics.topicId, topics.id))
    .where(eq(downloads.id, downloadData[0].downloads.id))
    .all()

  const downloadAuthorsData = await db
    .select({ id: users.id, name: users.name, username: users.username })
    .from(downloadAuthors)
    .leftJoin(downloads, eq(downloadAuthors.downloadId, downloads.id))
    .leftJoin(users, eq(downloadAuthors.userId, users.id))
    .where(eq(downloads.id, downloadData[0].downloads.id))
    .all()

  const data = downloadData.map((item) => ({
    ...item.downloads,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    downloadFiles: downloadFilesData,
    topics: downloadTopicsData,
    authors: downloadAuthorsData,
  }))

  return data[0]
}

export const getDownloadsByLanguage = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const db = initializeDB(DB)
  const { language, page, perPage } = input

  const downloadData = await db.query.downloads.findMany({
    where: (downloads, { eq, and }) =>
      and(eq(downloads.language, language), eq(downloads.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloads, { desc }) => [desc(downloads.updatedAt)],
    with: {
      featuredImage: true,
    },
  })

  const data = downloadData.map((item) => ({
    ...item,
  }))

  return data
}

export const getDownloadsByLanguageInfinite = async (
  DB: D1Database,
  input: {
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const db = initializeDB(DB)

  const { language, limit = 50, cursor } = input

  const downloadData = await db.query.downloads.findMany({
    where: (downloads, { eq, and, lt }) =>
      and(
        eq(downloads.language, language),
        eq(downloads.status, "published"),
        cursor ? lt(downloads.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
    },
  })

  const data = downloadData.map((item) => ({
    ...item,
  }))

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    downloads: data,
    nextCursor,
  }
}

export const getDownloadsByType = async (
  DB: D1Database,
  input: {
    type: DownloadType
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { type, language, page, perPage } = input

  const db = initializeDB(DB)

  const downloadData = await db.query.downloads.findMany({
    where: (downloads, { eq, and }) =>
      and(
        eq(downloads.type, type),
        eq(downloads.language, language),
        eq(downloads.status, "published"),
      ),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloads, { desc }) => [desc(downloads.updatedAt)],
    with: {
      featuredImage: true,
    },
  })

  const data = downloadData.map((item) => ({
    ...item,
  }))

  return data
}

export const getDownloadsByTopicId = async (
  DB: D1Database,
  input: {
    topicId: string
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { topicId, language, page, perPage } = input

  const db = initializeDB(DB)

  const downloads = await db.query.downloads.findMany({
    where: (downloads, { eq, and }) =>
      and(eq(downloads.language, language), eq(downloads.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloads, { desc }) => [desc(downloads.updatedAt)],
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = downloads.filter((download) =>
    download.topics.some((topic) => topic.topicId === topicId),
  )

  return data
}

export const getDownloadsByTopicIdInfinite = async (
  DB: D1Database,
  input: {
    topicId: string
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const { topicId, language, limit = 50, cursor } = input

  const db = initializeDB(DB)

  const downloads = await db.query.downloads.findMany({
    where: (downloads, { eq, and, lt }) =>
      and(
        eq(downloads.language, language),
        eq(downloads.status, "published"),
        cursor ? lt(downloads.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = downloads.filter((download) =>
    download.topics.some((topic) => topic.topicId === topicId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    downloads: data,
    nextCursor,
  }
}

export const getDownloadsByAuthorId = async (
  DB: D1Database,
  input: {
    authorId: string
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { authorId, language, page, perPage } = input

  const db = initializeDB(DB)

  const downloads = await db.query.downloads.findMany({
    where: (downloads, { eq, and }) =>
      and(eq(downloads.language, language), eq(downloads.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloads, { desc }) => [desc(downloads.updatedAt)],
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const data = downloads.filter((download) =>
    download.authors.some((author) => author.userId === authorId),
  )

  return data
}

export const getDownloadsByAuthorIdInfinite = async (
  DB: D1Database,
  input: {
    authorId: string
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const { authorId, language, limit = 50, cursor } = input

  const db = initializeDB(DB)

  const downloads = await db.query.downloads.findMany({
    where: (downloads, { eq, and, lt }) =>
      and(
        eq(downloads.language, language),
        eq(downloads.status, "published"),
        cursor ? lt(downloads.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const data = downloads.filter((download) =>
    download.authors.some((author) => author.userId === authorId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    downloads: data,
    nextCursor,
  }
}

export const getRelatedDownloadsInfinite = async (
  DB: D1Database,
  input: {
    topicId: string
    currentDownloadId: string
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const { topicId, currentDownloadId, language, limit = 50, cursor } = input

  const db = initializeDB(DB)

  const downloads = await db.query.downloads.findMany({
    where: (downloads, { eq, and, not, lt }) =>
      and(
        eq(downloads.language, language),
        eq(downloads.status, "published"),
        cursor ? lt(downloads.updatedAt, cursor) : undefined,
        not(eq(downloads.id, currentDownloadId)),
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = downloads.filter((download) =>
    download.topics.some((topic) => topic.topicId === topicId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    downloads: data,
    nextCursor,
  }
}

export const getDownloadsDashboard = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.downloads.findMany({
    where: (downloads, { eq }) => eq(downloads.language, language),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloads, { desc }) => [desc(downloads.updatedAt)],
    with: {
      featuredImage: {
        columns: {
          id: true,
          url: true,
        },
      },
      downloadTranslation: {
        columns: {
          id: true,
        },
        with: {
          downloads: {
            columns: {
              id: true,
              title: true,
              language: true,
            },
          },
        },
      },
    },
  })
  return data
}

export const getDownloadsSitemap = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.downloads.findMany({
    where: (downloads, { eq, and }) =>
      and(eq(downloads.language, language), eq(downloads.status, "published")),
    columns: {
      slug: true,
      updatedAt: true,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (downloads, { desc }) => [desc(downloads.id)],
  })

  return data
}

export const getDownloadsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(downloads)
    .where(and(eq(downloads.status, "published")))
  return data[0].value
}

export const getDownloadsCountDashboard = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(downloads)
  return data[0].value
}

export const getDownloadsCountByLanguage = async (
  DB: D1Database,
  input: LanguageType,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ values: count() })
    .from(downloads)
    .where(
      and(eq(downloads.language, input), eq(downloads.status, "published")),
    )
  return data[0].values
}

export const searchDownloads = async (
  DB: D1Database,
  input: {
    language: LanguageType
    searchQuery: string
  },
) => {
  const { language, searchQuery } = input

  const db = initializeDB(DB)

  const data = await db.query.downloads.findMany({
    where: (downloads, { eq, and, or, like }) =>
      and(
        eq(downloads.language, language),
        eq(downloads.status, "published"),
        or(
          like(downloads.title, `%${searchQuery}%`),
          like(downloads.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchDownloadsDashboard = async (
  DB: D1Database,
  input: {
    language: LanguageType
    searchQuery: string
  },
) => {
  const { language, searchQuery } = input

  const db = initializeDB(DB)

  const data = await db.query.downloads.findMany({
    where: (downloads, { eq, and, or, like }) =>
      and(
        eq(downloads.language, language),
        or(
          like(downloads.title, `%${searchQuery}%`),
          like(downloads.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const createDownload = async (DB: D1Database, input: CreateDownload) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedExcerpt = !input.excerpt
    ? trimText(input.content, 160)
    : input.excerpt
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedExcerpt
    : input.metaDescription

  const downloadTranslationId = cuid()
  const downloadId = cuid()

  const db = initializeDB(DB)

  const downloadTranslation = await db
    .insert(downloadTranslations)
    .values({
      id: downloadTranslationId,
    })
    .returning()

  const data = await db
    .insert(downloads)
    .values({
      ...input,
      id: downloadId,
      slug: slug,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      downloadTranslationId: downloadTranslation[0].id,
    })
    .returning()

  const downloadFileValues = input.downloadFiles.map((downloadFile) => ({
    downloadId: data[0].id,
    downloadFileId: downloadFile,
  }))

  const topicValues = input.topics.map((topic) => ({
    downloadId: data[0].id,
    topicId: topic,
  }))

  const authorValues = input.authors.map((author) => ({
    downloadId: data[0].id,
    userId: author,
  }))

  await db.batch([
    db.insert(downloadDownloadFiles).values(downloadFileValues),
    db.insert(downloadTopics).values(topicValues),
    db.insert(downloadAuthors).values(authorValues),
  ])

  return data
}

export const updateDownload = async (DB: D1Database, input: UpdateDownload) => {
  const db = initializeDB(DB)

  const data = await db
    .update(downloads)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(downloads.id, input.id))
    .returning()

  await db.batch([
    db
      .delete(downloadDownloadFiles)
      .where(eq(downloadTopics.downloadId, input.id)),
    db.delete(downloadTopics).where(eq(downloadTopics.downloadId, input.id)),
    db.delete(downloadAuthors).where(eq(downloadAuthors.downloadId, input.id)),
  ])

  const downloadFileValues = input.downloadFiles.map((downloadFile) => ({
    downloadId: data[0].id,
    downloadFileId: downloadFile,
  }))

  const topicValues = input.topics.map((topic) => ({
    downloadId: data[0].id,
    topicId: topic,
  }))

  const authorValues = input.authors.map((author) => ({
    downloadId: data[0].id,
    userId: author,
  }))

  await db.batch([
    db.insert(downloadAuthors).values(authorValues),
    db.insert(downloadTopics).values(topicValues),
    db.insert(downloadDownloadFiles).values(downloadFileValues),
  ])

  return data
}

export const updateDownloadWithoutChangeUpdatedDate = async (
  DB: D1Database,
  input: UpdateDownload,
) => {
  const db = initializeDB(DB)
  const data = await db
    .update(downloads)
    .set({
      ...input,
    })
    .where(eq(downloads.id, input.id))
    .returning()

  await db.batch([
    db.delete(downloadTopics).where(eq(downloadTopics.downloadId, input.id)),
    db.delete(downloadAuthors).where(eq(downloadAuthors.downloadId, input.id)),
  ])

  const topicValues = input.topics.map((topic) => ({
    downloadId: data[0].id,
    topicId: topic,
  }))

  const authorValues = input.authors.map((author) => ({
    downloadId: data[0].id,
    userId: author,
  }))

  await db.batch([
    db.insert(downloadAuthors).values(authorValues),
    db.insert(downloadTopics).values(topicValues),
  ])

  return data
}

export const translateDownload = async (
  DB: D1Database,
  input: TranslateDownload,
) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedExcerpt = !input.excerpt
    ? trimText(input.content, 160)
    : input.excerpt
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedExcerpt
    : input.metaDescription

  const db = initializeDB(DB)

  const data = await db
    .insert(downloads)
    .values({
      ...input,
      id: cuid(),
      slug: slug,
      excerpt: generatedExcerpt,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
    })
    .returning()

  const topicValues = input.topics.map((topic) => ({
    downloadId: data[0].id,
    topicId: topic,
  }))

  const authorValues = input.authors.map((author) => ({
    downloadId: data[0].id,
    userId: author,
  }))

  await db.batch([
    db.insert(downloadTopics).values(topicValues),
    db.insert(downloadAuthors).values(authorValues),
  ])

  return data
}

export const deleteDownload = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.batch([
    db.delete(downloadTopics).where(eq(downloadTopics.downloadId, input)),
    db.delete(downloadAuthors).where(eq(downloadAuthors.downloadId, input)),
    db.delete(downloads).where(eq(downloads.id, input)),
  ])

  return data
}

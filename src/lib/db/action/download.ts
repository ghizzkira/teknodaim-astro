import { and, count, desc, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import {
  downloadAuthors,
  downloadDownloadFiles,
  downloads,
  downloadTopics,
  downloadTranslations,
} from "@/lib/db/schema/download"
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
import { downloadFiles } from "../schema/download-file"

export const getDownloadTranslationById = async (id: string) => {
  const downloadTranslationData = await db.query.downloadTranslations.findFirst(
    {
      where: (downloadTranslations, { eq }) => eq(downloadTranslations.id, id),
      with: {
        downloads: {
          columns: {
            id: true,
            title: true,
            language: true,
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
    .select({ id: downloadFiles.id, title: downloadFiles.title })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadDownloadFiles,
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

export const getDownloadById = async (id: string) => {
  const downloadData = await db
    .select()
    .from(downloads)
    .leftJoin(medias, eq(medias.id, downloads.featuredImageId))
    .where(eq(downloads.id, id))
    .limit(1)

  const downloadFilesData = await db
    .select({ id: downloadFiles.id, title: downloadFiles.title })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, id))
    .all()

  const downloadTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(downloadTopics)
    .leftJoin(downloads, eq(downloadTopics.downloadId, downloads.id))
    .leftJoin(topics, eq(downloadTopics.topicId, topics.id))
    .where(eq(downloads.id, id))
    .all()

  const downloadAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(downloadAuthors)
    .leftJoin(downloads, eq(downloadAuthors.downloadId, downloads.id))
    .leftJoin(users, eq(downloadAuthors.userId, users.id))
    .where(eq(downloads.id, id))
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

export const getDownloadBySlug = async ({
  slug,
  downloadFilePage,
  downloadFilePerPage,
}: {
  slug: string
  downloadFilePage: number
  downloadFilePerPage: number
}) => {
  const downloadData = await db
    .select()
    .from(downloads)
    .leftJoin(medias, eq(medias.id, downloads.featuredImageId))
    .where(eq(downloads.slug, slug))
    .limit(1)

  const downloadFilesData = await db
    .select({ id: downloadFiles.id, title: downloadFiles.title })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadDownloadFiles,
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

export const getDownloadsByLanguage = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

  const downloadFilesData = await db
    .select({ id: downloadFiles.id, title: downloadFiles.title })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, downloadData[0].id))
    .all()

  const data = downloadData.map((item) => ({
    ...item,
    downloadFiles: downloadFilesData,
  }))

  return data
}

export const getDownloadsByLanguageInfinite = async ({
  language,
  limit = 50,
  cursor,
}: {
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
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

  const downloadFilesData = await db
    .select({ id: downloadFiles.id, title: downloadFiles.title })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, downloadData[0].id))
    .all()

  const data = downloadData.map((item) => ({
    ...item,
    downloadFiles: downloadFilesData,
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

export const getDownloadsByType = async ({
  type,
  language,
  page,
  perPage,
}: {
  type: DownloadType
  language: LanguageType
  page: number
  perPage: number
}) => {
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

  const downloadFilesData = await db
    .select({ id: downloadFiles.id, title: downloadFiles.title })
    .from(downloadDownloadFiles)
    .leftJoin(downloads, eq(downloadDownloadFiles.downloadId, downloads.id))
    .leftJoin(
      downloadDownloadFiles,
      eq(downloadDownloadFiles.downloadFileId, downloadFiles.id),
    )
    .orderBy(desc(downloadFiles.createdAt))
    .where(eq(downloads.id, downloadData[0].id))
    .all()

  const data = downloadData.map((item) => ({
    ...item,
    downloadFiles: downloadFilesData,
  }))

  return data
}

export const getDownloadsByTopicId = async ({
  topicId,
  language,
  page,
  perPage,
}: {
  topicId: string
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getDownloadsByTopicIdInfinite = async ({
  topicId,
  language,
  limit = 50,
  cursor,
}: {
  topicId: string
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
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

export const getDownloadsByAuthorId = async ({
  authorId,
  language,
  page,
  perPage,
}: {
  authorId: string
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getDownloadsByAuthorIdInfinite = async ({
  authorId,
  language,
  limit = 50,
  cursor,
}: {
  authorId: string
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
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

export const getRelatedDownloadsInfinite = async ({
  topicId,
  currentDownloadId,
  language,
  limit = 50,
  cursor,
}: {
  topicId: string
  currentDownloadId: string
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
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

export const getDownloadsDashboard = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getDownloadsSitemap = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getDownloadsCount = async () => {
  const data = await db
    .select({ value: count() })
    .from(downloads)
    .where(and(eq(downloads.status, "published")))
  return data[0].value
}

export const getDownloadsCountDashboard = async () => {
  const data = await db.select({ value: count() }).from(downloads)
  return data[0].value
}

export const getDownloadsCountByLanguage = async (language: LanguageType) => {
  const data = await db
    .select({ values: count() })
    .from(downloads)
    .where(
      and(eq(downloads.language, language), eq(downloads.status, "published")),
    )
  return data[0].values
}

export const searchDownloads = async ({
  language,
  searchQuery,
}: {
  language: LanguageType
  searchQuery: string
}) => {
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

export const searchDownloadsDashboard = async ({
  language,
  searchQuery,
}: {
  language: LanguageType
  searchQuery: string
}) => {
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

export const createDownload = async (input: CreateDownload) => {
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

  const data = await db.transaction(async (tx) => {
    const downloadTranslation = await tx
      .insert(downloadTranslations)
      .values({
        id: downloadTranslationId,
      })
      .returning()

    const download = await tx
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
      downloadId: download[0].id,
      downloadFileId: downloadFile,
    }))

    await tx.insert(downloadDownloadFiles).values(downloadFileValues)

    const topicValues = input.topics.map((topic) => ({
      downloadId: download[0].id,
      topicId: topic,
    }))

    await tx.insert(downloadTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      downloadId: download[0].id,
      userId: author,
    }))

    await tx.insert(downloadAuthors).values(authorValues)

    return download
  })

  return data
}

export const updateDownload = async (input: UpdateDownload) => {
  const data = await db.transaction(async (tx) => {
    const download = await tx
      .update(downloads)
      .set({
        ...input,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(downloads.id, input.id))
      .returning()

    await tx
      .delete(downloadTopics)
      .where(eq(downloadTopics.downloadId, input.id))

    await tx
      .delete(downloadAuthors)
      .where(eq(downloadAuthors.downloadId, input.id))

    const topicValues = input.topics.map((topic) => ({
      downloadId: download[0].id,
      topicId: topic,
    }))

    await tx.insert(downloadTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      downloadId: download[0].id,
      userId: author,
    }))

    await tx.insert(downloadAuthors).values(authorValues)

    return download
  })

  return data
}

export const updateDownloadWithoutChangeUpdatedDate = async (
  input: UpdateDownload,
) => {
  const data = await db.transaction(async (tx) => {
    const download = await tx
      .update(downloads)
      .set({
        ...input,
      })
      .where(eq(downloads.id, input.id))
      .returning()

    await tx
      .delete(downloadTopics)
      .where(eq(downloadTopics.downloadId, input.id))

    await tx
      .delete(downloadAuthors)
      .where(eq(downloadAuthors.downloadId, input.id))

    const topicValues = input.topics.map((topic) => ({
      downloadId: download[0].id,
      topicId: topic,
    }))

    await tx.insert(downloadTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      downloadId: download[0].id,
      userId: author,
    }))

    await tx.insert(downloadAuthors).values(authorValues)

    return download
  })

  return data
}

export const translateDownload = async (input: TranslateDownload) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedExcerpt = !input.excerpt
    ? trimText(input.content, 160)
    : input.excerpt
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedExcerpt
    : input.metaDescription

  const data = await db.transaction(async (tx) => {
    const download = await tx
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
      downloadId: download[0].id,
      topicId: topic,
    }))

    await tx.insert(downloadTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      downloadId: download[0].id,
      userId: author,
    }))

    await tx.insert(downloadAuthors).values(authorValues)

    return download
  })

  return data
}

export const deleteDownload = async (id: string) => {
  const data = await db.transaction(async (tx) => {
    await tx.delete(downloadTopics).where(eq(downloadTopics.downloadId, id))
    await tx.delete(downloadAuthors).where(eq(downloadAuthors.downloadId, id))
    const download = await tx.delete(downloads).where(eq(downloads.id, id))
    return download
  })
  return data
}

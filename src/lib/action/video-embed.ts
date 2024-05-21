import { and, count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { medias } from "@/lib/db/schema/media"
import { topics } from "@/lib/db/schema/topic"
import { users } from "@/lib/db/schema/user"
import {
  videoEmbedAuthors,
  videoEmbeds,
  videoEmbedTopics,
} from "@/lib/db/schema/video-embed"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type {
  CreateVideoEmbed,
  UpdateVideoEmbed,
  VideoEmbedType,
} from "@/lib/validation/video-embed"

export const getVideoEmbedsDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.videoEmbeds.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  return data
}

export const getVideoEmbedsByTopicId = async (
  DB: D1Database,
  input: {
    topicId: string
    page: number
    perPage: number
  },
) => {
  const { topicId, page, perPage } = input
  const db = initializeDB(DB)
  const videoEmbeds = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq }) => eq(videoEmbeds.status, "published"),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (videoEmbeds, { desc }) => [desc(videoEmbeds.updatedAt)],
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = videoEmbeds.filter((videoEmbed) =>
    videoEmbed.topics.some((topic) => topic.topicId === topicId),
  )

  return data
}

export const getVideoEmbedsByTopicIdInfinite = async (
  DB: D1Database,
  input: {
    topicId: string
    limit?: number
    cursor?: string
  },
) => {
  const { topicId, limit = 50, cursor } = input
  const db = initializeDB(DB)
  const videoEmbeds = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and, lt }) =>
      and(
        eq(videoEmbeds.status, "published"),
        cursor ? lt(videoEmbeds.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = videoEmbeds.filter((videoEmbed) =>
    videoEmbed.topics.some((topic) => topic.topicId === topicId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    videoEmbeds: data,
    nextCursor,
  }
}

export const getRelatedVideoEmbedsInfinite = async (
  DB: D1Database,
  input: {
    topicId: string
    currentVideoEmbedId: string
    limit?: number
    cursor?: string
  },
) => {
  const { topicId, currentVideoEmbedId, limit = 50, cursor } = input
  const db = initializeDB(DB)
  const videoEmbeds = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and, not, lt }) =>
      and(
        eq(videoEmbeds.status, "published"),
        cursor ? lt(videoEmbeds.updatedAt, cursor) : undefined,
        not(eq(videoEmbeds.id, currentVideoEmbedId)),
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  const data = videoEmbeds.filter((videoEmbed) =>
    videoEmbed.topics.some((topic) => topic.topicId === topicId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    videoEmbeds: data,
    nextCursor,
  }
}

export const getVideoEmbedsByType = async (
  DB: D1Database,
  input: {
    type: VideoEmbedType
    page: number
    perPage: number
  },
) => {
  const { type, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and }) =>
      and(eq(videoEmbeds.type, type), eq(videoEmbeds.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (videoEmbeds, { desc }) => [desc(videoEmbeds.updatedAt)],
    with: {
      featuredImage: true,
    },
  })

  return data
}

export const getVideoEmbedsByTypeInfinite = async (
  DB: D1Database,
  input: {
    type: VideoEmbedType
    limit?: number
    cursor?: string
  },
) => {
  const { type, limit = 50, cursor } = input
  const db = initializeDB(DB)
  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and, lt }) =>
      and(
        eq(videoEmbeds.status, "published"),
        eq(videoEmbeds.type, type),
        cursor ? lt(videoEmbeds.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      topics: true,
    },
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    videoEmbeds: data,
    nextCursor,
  }
}

export const getVideoEmbedsByAuthorIdInfinite = async (
  DB: D1Database,
  input: {
    authorId: string
    limit?: number
    cursor?: string
  },
) => {
  const { authorId, limit = 50, cursor } = input
  const db = initializeDB(DB)
  const videoEmbeds = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and, lt }) =>
      and(
        eq(videoEmbeds.status, "published"),
        cursor ? lt(videoEmbeds.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
      authors: true,
    },
  })

  const data = videoEmbeds.filter((videoEmbed) =>
    videoEmbed.authors.some((author) => author.userId === authorId),
  )

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    videoEmbeds: data,
    nextCursor,
  }
}

export const getVideoEmbedById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const videoEmbedData = await db
    .select()
    .from(videoEmbeds)
    .leftJoin(medias, eq(medias.id, videoEmbeds.featuredImageId))
    .where(eq(videoEmbeds.id, input))
    .limit(1)

  const videoEmbedTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(videoEmbedTopics)
    .leftJoin(videoEmbeds, eq(videoEmbedTopics.videoEmbedId, videoEmbeds.id))
    .leftJoin(topics, eq(videoEmbedTopics.topicId, topics.id))
    .where(eq(videoEmbeds.id, input))
    .all()

  const videoEmbedAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(videoEmbedAuthors)
    .leftJoin(videoEmbeds, eq(videoEmbedAuthors.videoEmbedId, videoEmbeds.id))
    .leftJoin(users, eq(videoEmbedAuthors.userId, users.id))
    .where(eq(videoEmbeds.id, input))
    .all()

  const data = videoEmbedData.map((item) => ({
    ...item.video_embeds,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    topics: videoEmbedTopicsData,
    authors: videoEmbedAuthorsData,
  }))

  return data[0]
}

export const getVideoEmbedBySlug = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const videoEmbedData = await db
    .select()
    .from(videoEmbeds)
    .leftJoin(medias, eq(medias.id, videoEmbeds.featuredImageId))
    .where(eq(videoEmbeds.slug, input))
    .limit(1)

  const videoEmbedTopicsData = await db
    .select({ id: topics.id, title: topics.title, slug: topics.slug })
    .from(videoEmbedTopics)
    .leftJoin(videoEmbeds, eq(videoEmbedTopics.videoEmbedId, videoEmbeds.id))
    .leftJoin(topics, eq(videoEmbedTopics.topicId, topics.id))
    .where(eq(videoEmbeds.id, videoEmbedData[0].video_embeds.id))
    .all()

  const videoEmbedAuthorsData = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      image: users.image,
    })
    .from(videoEmbedAuthors)
    .leftJoin(videoEmbeds, eq(videoEmbedAuthors.videoEmbedId, videoEmbeds.id))
    .leftJoin(users, eq(videoEmbedAuthors.userId, users.id))
    .where(eq(videoEmbeds.id, videoEmbedData[0].video_embeds.id))
    .all()

  const data = videoEmbedData.map((item) => ({
    ...item.video_embeds,
    featuredImage: {
      id: item?.medias?.id!,
      url: item?.medias?.url!,
    },
    topics: videoEmbedTopicsData,
    authors: videoEmbedAuthorsData,
  }))

  return data[0]
}

export const getVideoEmbedsSitemap = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq }) => eq(videoEmbeds.status, "published"),
    columns: {
      slug: true,
      updatedAt: true,
    },
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (videoEmbeds, { desc }) => [desc(videoEmbeds.id)],
  })

  return data
}

export const getVideoEmbedsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(videoEmbeds)
    .where(and(eq(videoEmbeds.status, "published")))
  return data[0].value
}

export const getVideoEmbedsCountDashboard = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(videoEmbeds)
  return data[0].value
}

export const getVideoEmbedsCountByType = async (
  DB: D1Database,
  input: VideoEmbedType,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(videoEmbeds)
    .where(eq(videoEmbeds.type, input))
  return data[0].value
}

export const searchVideoEmbeds = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and, or, like }) =>
      and(
        eq(videoEmbeds.status, "published"),
        or(
          like(videoEmbeds.title, `%${input}%`),
          like(videoEmbeds.slug, `%${input}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchVideoEmbedsDashboard = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { or, like }) =>
      or(
        like(videoEmbeds.title, `%${input}%`),
        like(videoEmbeds.slug, `%${input}%`),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const createVideoEmbed = async (
  DB: D1Database,
  input: CreateVideoEmbed,
) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedMetaTitle
    : input.metaDescription

  const db = initializeDB(DB)

  const data = await db
    .insert(videoEmbeds)
    .values({
      id: cuid(),
      slug: slug,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
      ...input,
    })
    .returning()

  const topicValues = input.topics.map((topic) => ({
    videoEmbedId: data[0].id,
    topicId: topic,
  }))

  const authorValues = input.authors.map((author) => ({
    videoEmbedId: data[0].id,
    userId: author,
  }))

  await db.batch([
    db.insert(videoEmbedTopics).values(topicValues),
    db.insert(videoEmbedAuthors).values(authorValues),
  ])

  return data
}

export const updateVideoEmbed = async (
  DB: D1Database,
  input: UpdateVideoEmbed,
) => {
  const db = initializeDB(DB)

  const data = await db
    .update(videoEmbeds)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(videoEmbeds.id, input.id))
    .returning()

  await db.batch([
    db
      .delete(videoEmbedTopics)
      .where(eq(videoEmbedTopics.videoEmbedId, input.id)),
    db
      .delete(videoEmbedAuthors)
      .where(eq(videoEmbedAuthors.videoEmbedId, input.id)),
  ])

  const topicValues = input.topics.map((topic) => ({
    videoEmbedId: data[0].id,
    topicId: topic,
  }))

  const authorValues = input.authors.map((author) => ({
    videoEmbedId: data[0].id,
    userId: author,
  }))

  await db.batch([
    db.insert(videoEmbedAuthors).values(authorValues),
    db.insert(videoEmbedTopics).values(topicValues),
  ])

  return data
}

export const deleteVideoEmbed = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.batch([
    db.delete(videoEmbedTopics).where(eq(videoEmbedTopics.videoEmbedId, input)),
    db
      .delete(videoEmbedAuthors)
      .where(eq(videoEmbedAuthors.videoEmbedId, input)),
    db.delete(videoEmbeds).where(eq(videoEmbeds.id, input)),
  ])

  return data
}

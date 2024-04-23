import { and, count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { topics } from "@/lib/db/schema/topic"
import { users } from "@/lib/db/schema/user"
import {
  videoEmbedAuthors,
  videoEmbeds,
  videoEmbedTopics,
} from "@/lib/db/schema/video-embed"
import type {
  CreateVideoEmbed,
  UpdateVideoEmbed,
  VideoEmbedType,
} from "@/lib/validation/video-embed"
import { medias } from "../db/schema/media"
import { cuid, uniqueCharacter } from "../utils/id"
import { slugify } from "../utils/slug"

export const getVideoEmbedsDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const videoEmbedsData = await db.query.videoEmbeds.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      featuredImage: true,
    },
  })

  const videoEmbedTopicsData = await db
    .select({ id: topics.id, title: topics.title })
    .from(videoEmbedTopics)
    .leftJoin(videoEmbeds, eq(videoEmbedTopics.videoEmbedId, videoEmbeds.id))
    .leftJoin(topics, eq(videoEmbedTopics.topicId, topics.id))
    .where(eq(videoEmbeds.id, videoEmbedsData[0].id))
    .all()

  const videoEmbedAuthorsData = await db
    .select({ id: users.id, name: users.name })
    .from(videoEmbedAuthors)
    .leftJoin(videoEmbeds, eq(videoEmbedAuthors.videoEmbedId, videoEmbeds.id))
    .leftJoin(users, eq(videoEmbedAuthors.userId, users.id))
    .where(eq(videoEmbeds.id, videoEmbedsData[0].id))
    .all()

  const data = videoEmbedsData.map((item) => ({
    ...item,
    topics: videoEmbedTopicsData,
    authors: videoEmbedAuthorsData,
  }))

  return data
}

export const getRelatedVideoEmbedsInfinite = async ({
  topicId,
  currentVideoEmbedId,
  limit = 50,
  cursor,
}: {
  topicId: string
  currentVideoEmbedId: string
  limit?: number
  cursor?: string
}) => {
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

export const getVideoEmbedsByType = async ({
  type,
  page,
  perPage,
}: {
  type: VideoEmbedType
  page: number
  perPage: number
}) => {
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

export const getRelatedVideoEmbedsByTypeInfinite = async ({
  type,
  limit = 50,
  cursor,
}: {
  type: VideoEmbedType
  limit?: number
  cursor?: string
}) => {
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

export const getVideoEmbedsByAuthorIdInfinite = async ({
  authorId,
  limit = 50,
  cursor,
}: {
  authorId: string
  limit?: number
  cursor?: string
}) => {
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

export const getVideoEmbedById = async (id: string) => {
  const data = await db.query.videoEmbeds.findFirst({
    where: (videoEmbed, { eq }) => eq(videoEmbed.id, id),
    with: {
      featuredImage: true,
    },
  })

  return data
}

export const getVideoEmbedBySlug = async ({ slug }: { slug: string }) => {
  const videoEmbedData = await db
    .select()
    .from(videoEmbeds)
    .leftJoin(medias, eq(medias.id, videoEmbeds.featuredImageId))
    .where(eq(videoEmbeds.slug, slug))
    .limit(1)

  const videoEmbedTopicsData = await db
    .select({ id: topics.id, title: topics.title, slug: topics.slug })
    .from(videoEmbedTopics)
    .leftJoin(videoEmbeds, eq(videoEmbedTopics.videoEmbedId, videoEmbeds.id))
    .leftJoin(topics, eq(videoEmbedTopics.topicId, topics.id))
    .where(eq(videoEmbeds.id, videoEmbedData[0].video_embeds.id))
    .all()

  const videoEmbedAuthorsData = await db
    .select({ id: users.id, name: users.name, username: users.username })
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

export const getVideoEmbedsSitemap = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
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

export const getVideoEmbedsCount = async () => {
  const data = await db
    .select({ value: count() })
    .from(videoEmbeds)
    .where(and(eq(videoEmbeds.status, "published")))
  return data[0].value
}

export const getVideoEmbedsCountDashboard = async () => {
  const data = await db.select({ value: count() }).from(videoEmbeds)
  return data[0].value
}

export const getVideoEmbedsCountByType = async (type: VideoEmbedType) => {
  const data = await db
    .select({ value: count() })
    .from(videoEmbeds)
    .where(eq(videoEmbeds.type, type))
  return data[0].value
}

export const searchVideoEmbeds = async (searchQuery: string) => {
  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { eq, and, or, like }) =>
      and(
        eq(videoEmbeds.status, "published"),
        or(
          like(videoEmbeds.title, `%${searchQuery}%`),
          like(videoEmbeds.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchVideoEmbedsDashboard = async (searchQuery: string) => {
  const data = await db.query.videoEmbeds.findMany({
    where: (videoEmbeds, { or, like }) =>
      or(
        like(videoEmbeds.title, `%${searchQuery}%`),
        like(videoEmbeds.slug, `%${searchQuery}%`),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const createVideoEmbed = async (input: CreateVideoEmbed) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedMetaTitle
    : input.metaDescription

  const data = await db.transaction(async (tx) => {
    const videoEmbed = await tx
      .insert(videoEmbeds)
      .values({
        ...input,
        id: cuid(),
        slug: slug,
        metaTitle: generatedMetaTitle,
        metaDescription: generatedMetaDescription,
      })
      .returning()

    const topicValues = input.topics.map((topic) => ({
      videoEmbedId: videoEmbed[0].id,
      topicId: topic,
    }))

    await tx.insert(videoEmbedTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      videoEmbedId: videoEmbed[0].id,
      userId: author,
    }))

    await tx.insert(videoEmbedAuthors).values(authorValues)
  })

  return data
}

export const updateVideoEmbed = async (input: UpdateVideoEmbed) => {
  const data = await db.transaction(async (tx) => {
    const videoEmbed = await tx
      .update(videoEmbeds)
      .set({
        ...input,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(eq(videoEmbeds.id, input.id))
      .returning()

    await tx
      .delete(videoEmbedTopics)
      .where(eq(videoEmbedTopics.videoEmbedId, input.id))

    await tx
      .delete(videoEmbedAuthors)
      .where(eq(videoEmbedAuthors.videoEmbedId, input.id))

    const topicValues = input.topics.map((topic) => ({
      videoEmbedId: videoEmbed[0].id,
      topicId: topic,
    }))

    await tx.insert(videoEmbedTopics).values(topicValues)

    const authorValues = input.authors.map((author) => ({
      videoEmbedId: videoEmbed[0].id,
      userId: author,
    }))

    await tx.insert(videoEmbedAuthors).values(authorValues)

    return videoEmbed
  })

  return data
}

export const deleteVideoEmbed = async (id: string) => {
  const data = await db.transaction(async (tx) => {
    await tx.delete(videoEmbedTopics).where(eq(videoEmbedTopics.videoEmbedId, id))
    await tx.delete(videoEmbedAuthors).where(eq(videoEmbedAuthors.videoEmbedId, id))
    const videoEmbed = await tx.delete(videoEmbeds).where(eq(videoEmbeds.id, id))
    return videoEmbed
  })
  return data
}

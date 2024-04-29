import { and, count, desc, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { articleTopics } from "@/lib/db/schema/article"
import { topics, topicTranslations } from "@/lib/db/schema/topic"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type { LanguageType } from "@/lib/validation/language"
import type {
  CreateTopic,
  TopicType,
  TopicVisibility,
  TranslateTopic,
  UpdateTopic,
} from "@/lib/validation/topic"

export const getTopciTranslationById = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db.query.topicTranslations.findFirst({
    where: (topicTranslations, { eq }) => eq(topicTranslations.id, input),
    with: {
      topics: true,
    },
  })
  return data
}

export const getTopicsDashboard = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq }) => eq(topics.language, language),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (users, { desc }) => [desc(users.updatedAt)],
    with: {
      topicTranslation: {
        with: {
          topics: true,
        },
      },
    },
  })
  return data
}

export const getTopicsByLanguage = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { and, eq }) =>
      and(eq(topics.language, language), eq(topics.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (topics, { desc }) => [desc(topics.createdAt)],
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getTopicsByArticlesCount = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db
    .select({
      id: topics.id,
      title: topics.title,
      slug: topics.slug,
      language: topics.language,
      count: sql<number>`count(${articleTopics.articleId})`.mapWith(Number),
    })
    .from(topics)
    .where(
      and(
        eq(topics.language, language),
        eq(topics.status, "published"),
        eq(topics.visibility, "public"),
      ),
    )
    .leftJoin(articleTopics, eq(articleTopics.topicId, topics.id))
    .limit(perPage)
    .offset((page - 1) * perPage)
    .groupBy(topics.id)
    .orderBy(desc(count(articleTopics.articleId)))
  return data
}

export const getTopicsSitemap = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq, and }) =>
      and(eq(topics.language, language), eq(topics.status, "published")),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (topics, { desc }) => [desc(topics.updatedAt)],
    columns: {
      slug: true,
      updatedAt: true,
    },
  })
  return data
}

export const getTopicsByType = async (
  DB: D1Database,
  input: {
    type: TopicType
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { type, language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq, and }) =>
      and(
        eq(topics.type, type),
        eq(topics.language, language),
        eq(topics.status, "published"),
      ),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (topics, { desc }) => [desc(topics.updatedAt)],
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getTopicsByVisibility = async (
  DB: D1Database,
  input: {
    visibility: TopicVisibility
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { visibility, language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq, and }) =>
      and(
        eq(topics.visibility, visibility),
        eq(topics.language, language),
        eq(topics.status, "published"),
      ),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (topics, { desc }) => [desc(topics.updatedAt)],
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getTopicBySlug = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.slug, input),
  })
  return data
}

export const searchTopics = async (
  DB: D1Database,
  input: {
    language: LanguageType
    searchQuery: string
  },
) => {
  const { language, searchQuery } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq, and, or, like }) =>
      and(
        eq(topics.language, language),
        eq(topics.visibility, "public"),
        eq(topics.status, "published"),
        or(
          like(topics.title, `%${searchQuery}%`),
          like(topics.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchTopicsDashboard = async (
  DB: D1Database,
  input: {
    language: LanguageType
    searchQuery: string
  },
) => {
  const { language, searchQuery } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq, and, or, like }) =>
      and(
        eq(topics.language, language),
        or(
          like(topics.title, `%${searchQuery}%`),
          like(topics.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchTopicsByType = async (
  DB: D1Database,
  input: {
    type: TopicType
    language: LanguageType
    searchQuery: string
  },
) => {
  const { type, language, searchQuery } = input
  const db = initializeDB(DB)
  const data = await db.query.topics.findMany({
    where: (topics, { eq, and, or, like }) =>
      and(
        eq(topics.type, type),
        eq(topics.language, language),
        eq(topics.visibility, "public"),
        eq(topics.status, "published"),
        or(
          like(topics.title, `%${searchQuery}%`),
          like(topics.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const getTopicsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(topics)
  return data[0].value
}

export const getTopicsCountByLanguage = async (
  DB: D1Database,
  input: LanguageType,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ values: count() })
    .from(topics)
    .where(and(eq(topics.language, input), eq(topics.status, "published")))
  return data[0].values
}

export const getTopicById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.id, input),
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const createTopic = async (DB: D1Database, input: CreateTopic) => {
  const db = initializeDB(DB)
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? input.description
    : input.metaDescription

  const topicTranslationId = cuid()
  const topicId = cuid()

  const data = await db.transaction(async (tx) => {
    const topicTranslation = await tx
      .insert(topicTranslations)
      .values({
        id: topicTranslationId,
      })
      .returning()

    const topic = await tx
      .insert(topics)
      .values({
        id: topicId,
        language: input.language,
        title: input.title,
        slug: slug,
        description: input.description,
        visibility: input.visibility,
        type: input.type,
        status: input.status,
        metaTitle: generatedMetaTitle,
        metaDescription: generatedMetaDescription,
        featuredImageId: input.featuredImageId,
        topicTranslationId: topicTranslation[0].id,
      })
      .returning()

    return topic
  })

  return data
}

export const updateTopic = async (DB: D1Database, input: UpdateTopic) => {
  const db = initializeDB(DB)
  const data = await db
    .update(topics)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(topics.id, input.id))
  return data
}

export const translateTopic = async (DB: D1Database, input: TranslateTopic) => {
  const db = initializeDB(DB)
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? input.description
    : input.metaDescription

  const data = await db.insert(topics).values({
    id: cuid(),
    language: input.language,
    title: input.title,
    slug: slug,
    description: input.description,
    visibility: input.visibility,
    type: input.type,
    status: input.status,
    metaTitle: generatedMetaTitle,
    metaDescription: generatedMetaDescription,
    featuredImageId: input.featuredImageId,
    topicTranslationId: input.topicTranslationId,
  })

  return data
}

export const deleteTopic = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.transaction(async (tx) => {
    await tx.delete(articleTopics).where(eq(articleTopics.topicId, input))
    const topic = await tx.delete(topics).where(eq(topics.id, input))
    return topic
  })

  return data
}

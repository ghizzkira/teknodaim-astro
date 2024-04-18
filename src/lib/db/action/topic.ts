import { and, count, desc, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
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
import { articleTopics } from "../schema/article"
import { topics, topicTranslations } from "../schema/topic"

export const getTopciTranslationById = async (id: string) => {
  const data = await db.query.topicTranslations.findFirst({
    where: (topicTranslations, { eq }) => eq(topicTranslations.id, id),
    with: {
      topics: true,
    },
  })
  return data
}

export const getTopicsDashboard = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getTopicsByLanguage = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getTopicsByArticlesCount = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getTopicsSitemap = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getTopicsByType = async ({
  type,
  language,
  page,
  perPage,
}: {
  type: TopicType
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getTopicsByVisibility = async ({
  visibility,
  language,
  page,
  perPage,
}: {
  visibility: TopicVisibility
  language: LanguageType
  page: number
  perPage: number
}) => {
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

export const getTopicBySlug = async (slug: string) => {
  const data = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.slug, slug),
  })
  return data
}

export const searchTopics = async ({
  language,
  searchQuery,
}: {
  language: LanguageType
  searchQuery: string
}) => {
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

export const searchTopicsDashboard = async ({
  language,
  searchQuery,
}: {
  language: LanguageType
  searchQuery: string
}) => {
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

export const searchTopicsByType = async ({
  type,
  language,
  searchQuery,
}: {
  type: TopicType
  language: LanguageType
  searchQuery: string
}) => {
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

export const getTopicsCount = async () => {
  const data = await db.select({ value: count() }).from(topics)
  return data[0].value
}

export const getTopicsCountByLanguage = async (language: LanguageType) => {
  const data = await db
    .select({ values: count() })
    .from(topics)
    .where(and(eq(topics.language, language), eq(topics.status, "published")))
  return data[0].values
}

export const getTopicById = async (id: string) => {
  const data = await db.query.topics.findFirst({
    where: (topics, { eq }) => eq(topics.id, id),
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const createTopic = async (input: CreateTopic) => {
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

export const updateTopic = async (input: UpdateTopic) => {
  const data = await db
    .update(topics)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(topics.id, input.id))
  return data
}

export const translateTopic = async (input: TranslateTopic) => {
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

export const deleteTopic = async (id: string) => {
  const data = await db.transaction(async (tx) => {
    await tx.delete(articleTopics).where(eq(articleTopics.topicId, id))

    const topic = await tx.delete(topics).where(eq(topics.id, id))

    return topic
  })

  return data
}

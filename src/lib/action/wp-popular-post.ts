import { and, count, eq, gte, lte, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { wpPopularPosts } from "@/lib/db/schema/wp-popular-post"
import { formatDateTimeDB } from "@/lib/utils/date"
import { cuid } from "@/lib/utils/id"
import type { LanguageType } from "@/lib/validation/language"
import type { UpsertWpPopularPost } from "@/lib/validation/wp-popular-post"

export const getWpPopularPosts = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { eq }) => eq(wpPopularPosts.language, language),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPosts, { desc }) => [desc(wpPopularPosts.views)],
  })
  return data
}

export const getWpPopularPostsLast30Days = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { and, eq, gte, lte }) =>
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(thirtyDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPosts, { desc }) => [desc(wpPopularPosts.views)],
  })
  return data
}

export const getWpPopularPostsLast30DaysInfinite = async (
  DB: D1Database,
  input: {
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const { language, limit = 50, cursor } = input

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { and, eq, lt, gte, lte }) =>
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(thirtyDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
        cursor ? lt(wpPopularPosts.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    orderBy: (wpPopularPost, { desc }) => [desc(wpPopularPost.views)],
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    wpPopularPosts: data,
    nextCursor,
  }
}

export const getWpPopularPostsLast7Days = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { and, eq, gte, lte }) =>
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(sevenDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPost, { desc }) => [desc(wpPopularPost.views)],
  })
  return data
}

export const getWpPopularPostsLast7DaysInfinite = async (
  DB: D1Database,
  input: {
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const { language, limit = 50, cursor } = input

  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { and, eq, lt, gte, lte }) =>
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(sevenDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
        cursor ? lt(wpPopularPosts.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    orderBy: (wpPopularPost, { desc }) => [desc(wpPopularPost.views)],
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    wpPopularPosts: data,
    nextCursor,
  }
}

export const getWpPopularPostsLast1Day = async (
  DB: D1Database,
  input: {
    language: LanguageType
    page: number
    perPage: number
  },
) => {
  const { language, page, perPage } = input

  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { and, eq, gte, lte }) =>
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(oneDayAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPost, { desc }) => [desc(wpPopularPost.views)],
  })
  return data
}

export const getWpPopularPostsLast1DayInfinite = async (
  DB: D1Database,
  input: {
    language: LanguageType
    limit?: number
    cursor?: string
  },
) => {
  const { language, limit = 50, cursor } = input

  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { and, eq, lt, gte, lte }) =>
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(oneDayAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
        cursor ? lt(wpPopularPosts.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    orderBy: (wpPopularPosts, { desc }) => [desc(wpPopularPosts.views)],
  })

  let nextCursor: string | undefined = undefined

  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem?.updatedAt) {
      nextCursor = nextItem.updatedAt
    }
  }

  return {
    wpPopularPosts: data,
    nextCursor,
  }
}

export const getWpPopularPostsByCategorySlug = async (
  DB: D1Database,
  input: {
    slug: string
    page: number
    perPage: number
  },
) => {
  const { slug, page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { eq }) =>
      eq(wpPopularPosts.primaryCategorySlug, slug),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPosts, { desc }) => [desc(wpPopularPosts.createdAt)],
  })
  return data
}

export const getWpPopularPostBySlug = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.wpPopularPosts.findFirst({
    where: (wpPopularPost, { eq }) => eq(wpPopularPost.slug, input),
  })
  return data
}

export const getWpPopularPostsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(wpPopularPosts)
  return data[0].value
}

export const getWpPopularPostsCountByLanguage = async (
  DB: D1Database,
  input: LanguageType,
) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(eq(wpPopularPosts.language, input))
  return data[0].values
}

export const getWpPopularPostsCountLast30Days = async (
  DB: D1Database,
  input: LanguageType,
) => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(
      and(
        eq(wpPopularPosts.language, input),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(thirtyDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    )

  return data[0].values
}

export const getWpPopularPostsCountLast7Days = async (
  DB: D1Database,
  input: LanguageType,
) => {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(
      and(
        eq(wpPopularPosts.language, input),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(sevenDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    )

  return data[0].values
}

export const getWpPopularPostsCountLast1Day = async (
  DB: D1Database,
  input: LanguageType,
) => {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const db = initializeDB(DB)

  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(
      and(
        eq(wpPopularPosts.language, input),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(oneDayAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    )

  return data[0].values
}

export const upsertWpPopularPost = async (
  DB: D1Database,
  input: UpsertWpPopularPost,
) => {
  const db = initializeDB(DB)
  const wpPopularPost = await db
    .insert(wpPopularPosts)
    .values({
      ...input,
      id: cuid(),
      views: 1,
    })
    .onConflictDoUpdate({
      target: wpPopularPosts.slug,
      set: { views: sql`${wpPopularPosts.views} + 1` },
    })

  return wpPopularPost
}

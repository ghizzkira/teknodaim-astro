import { and, count, eq, gte, lte, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { wpPopularPosts } from "@/lib/db/schema/wp-popular-post"
import { cuid } from "@/lib/utils/id"
import type { LanguageType } from "@/lib/validation/language"
import type { UpsertWpPopularPost } from "@/lib/validation/wp-popular-post"
import { formatDateTimeDB } from "../utils/date"

export const getWpPopularPosts = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { eq }) => eq(wpPopularPosts.language, language),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPosts, { desc }) => [desc(wpPopularPosts.views)],
  })
  return data
}

export const getWpPopularPostsLast30Days = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

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

export const getWpPopularPostsLast30DaysInfinite = async ({
  language,
  limit = 50,
  cursor,
}: {
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

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

export const getWpPopularPostsLast7Days = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

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

export const getWpPopularPostsLast7DaysInfinite = async ({
  language,
  limit = 50,
  cursor,
}: {
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

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

export const getWpPopularPostsLast1Day = async ({
  language,
  page,
  perPage,
}: {
  language: LanguageType
  page: number
  perPage: number
}) => {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

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

export const getWpPopularPostsLast1DayInfinite = async ({
  language,
  limit = 50,
  cursor,
}: {
  language: LanguageType
  limit?: number
  cursor?: string
}) => {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

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

export const getWpPopularPostsByCategorySlug = async ({
  slug,
  page,
  perPage,
}: {
  slug: string
  page: number
  perPage: number
}) => {
  const data = await db.query.wpPopularPosts.findMany({
    where: (wpPopularPosts, { eq }) =>
      eq(wpPopularPosts.primaryCategorySlug, slug),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (wpPopularPosts, { desc }) => [desc(wpPopularPosts.createdAt)],
  })
  return data
}

export const getWpPopularPostBySlug = async (slug: string) => {
  const data = await db.query.wpPopularPosts.findFirst({
    where: (wpPopularPost, { eq }) => eq(wpPopularPost.slug, slug),
  })
  return data
}

export const getWpPopularPostsCount = async () => {
  const data = await db.select({ value: count() }).from(wpPopularPosts)
  return data[0].value
}

export const getWpPopularPostsCountByLanguage = async (
  language: LanguageType,
) => {
  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(eq(wpPopularPosts.language, language))
  return data[0].values
}

export const getWpPopularPostsCountLast30Days = async (
  language: LanguageType,
) => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(thirtyDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    )

  return data[0].values
}

export const getWpPopularPostsCountLast7Days = async (
  language: LanguageType,
) => {
  const now = new Date()
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(sevenDaysAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    )

  return data[0].values
}

export const getWpPopularPostsCountLast1Day = async (
  language: LanguageType,
) => {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const data = await db
    .select({ values: count() })
    .from(wpPopularPosts)
    .where(
      and(
        eq(wpPopularPosts.language, language),
        gte(wpPopularPosts.updatedAt, formatDateTimeDB(oneDayAgo)),
        lte(wpPopularPosts.updatedAt, formatDateTimeDB(now)),
      ),
    )

  return data[0].values
}

export const upsertWpPopularPost = async (input: UpsertWpPopularPost) => {
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

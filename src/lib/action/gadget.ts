import { and, count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { gadgets } from "@/lib/db/schema/gadget"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type { CreateGadget, UpdateGadget } from "@/lib/validation/gadget"

export const getGadgetsPublished = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input

  const db = initializeDB(DB)

  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq }) => eq(gadgets.status, "published"),
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsPublishedInfinite = async (
  DB: D1Database,
  input: {
    limit?: number
    cursor?: string
  },
) => {
  const { limit = 10, cursor } = input

  const db = initializeDB(DB)

  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and, lt }) =>
      and(
        eq(gadgets.status, "published"),
        cursor ? lt(gadgets.updatedAt, cursor) : undefined,
      ),
    limit: limit + 1,
    with: {
      featuredImage: true,
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
    gadgets: data,
    nextCursor,
  }
}

export const getGadgetsByWpTagSlug = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)

  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and }) =>
      and(eq(gadgets.status, "published"), eq(gadgets.wpTagSlug, input)),
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsByWpCategorySlug = async (
  DB: D1Database,
  input: string,
) => {
  const db = initializeDB(DB)
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and }) =>
      and(eq(gadgets.status, "published"), eq(gadgets.wpCategorySlug, input)),
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.gadgets.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsSitemap = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq }) => eq(gadgets.status, "published"),
    limit: perPage,
    offset: (page - 1) * perPage,
    columns: {
      slug: true,
      updatedAt: true,
    },
  })
  return data
}

export const getGadgetsCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db
    .select({ value: count() })
    .from(gadgets)
    .where(and(eq(gadgets.status, "published")))
  return data[0].value
}

export const getGadgetsDashboardCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(gadgets)
  return data[0].value
}

export const searchGadgets = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and, or, like }) =>
      and(
        eq(gadgets.status, "published"),
        or(like(gadgets.title, `%${input}%`), like(gadgets.slug, `%${input}%`)),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchGadgetsDashboard = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { or, like }) =>
      or(like(gadgets.title, `%${input}%`), like(gadgets.slug, `%${input}%`)),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const createGadget = async (DB: D1Database, input: CreateGadget) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedMetaTitle
    : input.metaDescription

  const gadgetId = cuid()

  const db = initializeDB(DB)

  const data = await db
    .insert(gadgets)
    .values({
      ...input,
      id: gadgetId,
      slug: slug,
      metaTitle: generatedMetaTitle,
      metaDescription: generatedMetaDescription,
    })
    .returning()

  return data
}

export const updateGadget = async (DB: D1Database, input: UpdateGadget) => {
  const db = initializeDB(DB)
  const data = await db
    .insert(gadgets)
    .values({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .returning()

  return data
}

export const deleteGadget = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(gadgets).where(eq(gadgets.id, input))
  return data
}

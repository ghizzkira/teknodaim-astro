import { and, count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { gadgets } from "@/lib/db/schema/gadget"
import { cuid, uniqueCharacter } from "@/lib/utils/id"
import { slugify } from "@/lib/utils/slug"
import type { CreateGadget, UpdateGadget } from "@/lib/validation/gadget"

export const getGadgetsPublished = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
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

export const getGadgetsPublishedInfinite = async ({
  limit = 50,
  cursor,
}: {
  limit?: number
  cursor?: string
}) => {
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

export const getGadgetsByWpTagSlug = async (wpTagSlug: string) => {
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and }) =>
      and(eq(gadgets.status, "published"), eq(gadgets.wpTagSlug, wpTagSlug)),
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsByWpCategorySlug = async (wpCategorySlug: string) => {
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and }) =>
      and(
        eq(gadgets.status, "published"),
        eq(gadgets.wpCategorySlug, wpCategorySlug),
      ),
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.gadgets.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    with: {
      featuredImage: true,
    },
  })
  return data
}

export const getGadgetsSitemap = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
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

export const getGadgetsCount = async () => {
  const data = await db
    .select({ value: count() })
    .from(gadgets)
    .where(and(eq(gadgets.status, "published")))
  return data[0].value
}

export const getGadgetsDashboardCount = async () => {
  const data = await db.select({ value: count() }).from(gadgets)
  return data[0].value
}

export const searchGadgets = async (searchQuery: string) => {
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { eq, and, or, like }) =>
      and(
        eq(gadgets.status, "published"),
        or(
          like(gadgets.title, `%${searchQuery}%`),
          like(gadgets.slug, `%${searchQuery}%`),
        ),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const searchGadgetsDashboard = async (searchQuery: string) => {
  const data = await db.query.gadgets.findMany({
    where: (gadgets, { or, like }) =>
      or(
        like(gadgets.title, `%${searchQuery}%`),
        like(gadgets.slug, `%${searchQuery}%`),
      ),
    with: {
      featuredImage: true,
    },
    limit: 10,
  })
  return data
}

export const createGadget = async (input: CreateGadget) => {
  const slug = `${slugify(input.title)}_${uniqueCharacter()}`
  const generatedMetaTitle = !input.metaTitle ? input.title : input.metaTitle
  const generatedMetaDescription = !input.metaDescription
    ? generatedMetaTitle
    : input.metaDescription

  const gadgetId = cuid()

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

export const updateGadget = async (input: UpdateGadget) => {
  const data = await db
    .insert(gadgets)
    .values({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .returning()

  return data
}

export const deleteGadget = async (id: string) => {
  const data = await db.delete(gadgets).where(eq(gadgets.id, id))
  return data
}

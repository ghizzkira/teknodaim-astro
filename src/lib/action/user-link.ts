import { initializeDB } from "@/lib/db"
import { userLinks } from "@/lib/db/schema/user-link"
import { cuid } from "@/lib/utils/id"
import type { CreateUserLink, UpdateUserLink } from "@/lib/validation/user-link"
import { eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { userLinks } from "@/lib/db/schema/user-link"
import { cuid } from "@/lib/utils/id"
import type { CreateUserLink, UpdateUserLink } from "@/lib/validation/user-link"
import { eq, sql } from "drizzle-orm"

export const getUserLinksDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.userLinks.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (userLinks, { desc }) => [desc(userLinks.createdAt)],
  })
  return data
}

export const getUserLinkById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.userLinks.findFirst({
    where: (userLinks, { eq }) => eq(userLinks.id, input),
    with: {
      user: true,
    },
  })

  return data
}

export const searchUserLinks = async (
  DB: D1Database,
  input: {
    userId: string
    searchQuery: string
  },
) => {
  const { userId, searchQuery } = input
  const db = initializeDB(DB)
  const data = await db.query.userLinks.findMany({
    where: (userLinks, { and, or, like }) =>
      and(
        eq(userLinks.userId, userId),
        or(
          like(userLinks.title, `%${searchQuery}%`),
          like(userLinks.url, `%${searchQuery}%`),
        ),
      ),
    limit: 10,
  })
  return data
}

export const createUserLink = async (
  DB: D1Database,
  input: CreateUserLink & { userId: string },
) => {
  const db = initializeDB(DB)
  const data = await db.insert(userLinks).values({
    id: cuid(),
    title: input.title,
    url: input.url,
    userId: input.userId,
  })
  return data
}

export const updateUserLink = async (DB: D1Database, input: UpdateUserLink) => {
  const db = initializeDB(DB)
  const data = await db
    .update(userLinks)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(userLinks.id, input.id))
  return data
}

export const deleteUserLink = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(userLinks).where(eq(userLinks.id, input))
  return data
}

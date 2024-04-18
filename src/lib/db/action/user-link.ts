import { eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { userLinks } from "@/lib/db/schema/user-link"
import { cuid } from "@/lib/utils/id"
import type { CreateUserLink, UpdateUserLink } from "@/lib/validation/user-link"

export const getUserLinksDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.userLinks.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (userLinks, { desc }) => [desc(userLinks.createdAt)],
  })
  return data
}

export const getUserLinkById = async (id: string) => {
  const data = await db.query.userLinks.findFirst({
    where: (userLinks, { eq }) => eq(userLinks.id, id),
  })
  return data
}

export const createUserLink = async (
  input: CreateUserLink & { userId: string },
) => {
  const data = await db.insert(userLinks).values({
    id: cuid(),
    title: input.title,
    url: input.url,
    userId: input.userId,
  })
  return data
}

export const updateUserLink = async (input: UpdateUserLink) => {
  const data = await db
    .update(userLinks)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(userLinks.id, input.id))
  return data
}

export const deleteUserLink = async (id: string) => {
  const data = await db.delete(userLinks).where(eq(userLinks.id, id))
  return data
}

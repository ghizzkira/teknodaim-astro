import { count, eq, sql } from "drizzle-orm"

import { db } from "@/lib/db"
import { users } from "@/lib/db/schema/user"
import type { UpdateUser, UserRole } from "@/lib/validation/user"

export const getUsersDashboard = async ({
  page,
  perPage,
}: {
  page: number
  perPage: number
}) => {
  const data = await db.query.users.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  })
  return data
}

export const getUserById = async (id: string) => {
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  })
  return data
}

export const getUserByUsername = async (username: string) => {
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })
  return data
}

export const getUserByEmail = async (email: string) => {
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  })
  return data
}

export const getUsersByRole = async ({
  role,
  page,
  perPage,
}: {
  role: UserRole
  page: number
  perPage: number
}) => {
  const data = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.role, role),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  })
  return data
}

export const getUsersCount = async () => {
  const data = await db.select({ value: count() }).from(users)
  return data[0].value
}

export const searchUsers = async (searchQuery: string) => {
  const data = await db.query.users.findMany({
    where: (users, { and, or, like }) =>
      and(
        or(
          like(users.name, `%${searchQuery}%`),
          like(users.username, `%${searchQuery}%`),
        ),
      ),
    limit: 10,
  })
  return data
}

export const updateUser = async (input: UpdateUser) => {
  const data = await db
    .update(users)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(users.id, input.id))
  return data
}

export const deleteUser = async (id: string) => {
  const data = await db.delete(users).where(eq(users.id, id))
  return data
}

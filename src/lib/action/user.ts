import { initializeDB } from "@/lib/db"
import { users } from "@/lib/db/schema/user"
import type { UpdateUser, UserRole } from "@/lib/validation/user"
import { count, eq, sql } from "drizzle-orm"

import { initializeDB } from "@/lib/db"
import { users } from "@/lib/db/schema/user"
import type { UpdateUser, UserRole } from "@/lib/validation/user"
import { count, eq, sql } from "drizzle-orm"

export const getUsersDashboard = async (
  DB: D1Database,
  input: {
    page: number
    perPage: number
  },
) => {
  const { page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.users.findMany({
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  })
  return data
}

export const getUserById = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, input),
  })
  return data
}

export const getUserByUsername = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, input),
  })
  return data
}

export const getUserByEmail = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, input),
  })
  return data
}

export const getUsersByRole = async (
  DB: D1Database,
  input: {
    role: UserRole
    page: number
    perPage: number
  },
) => {
  const { role, page, perPage } = input
  const db = initializeDB(DB)
  const data = await db.query.users.findMany({
    where: (users, { eq }) => eq(users.role, role),
    limit: perPage,
    offset: (page - 1) * perPage,
    orderBy: (users, { desc }) => [desc(users.createdAt)],
  })
  return data
}

export const getUsersCount = async (DB: D1Database) => {
  const db = initializeDB(DB)
  const data = await db.select({ value: count() }).from(users)
  return data[0].value
}

export const searchUsers = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.query.users.findMany({
    where: (users, { and, or, like }) =>
      and(
        or(like(users.name, `%${input}%`), like(users.username, `%${input}%`)),
      ),
    limit: 10,
  })
  return data
}

export const searchUsersByRole = async (
  DB: D1Database,
  input: {
    role: UserRole
    searchQuery: string
  },
) => {
  const { role, searchQuery } = input
  const db = initializeDB(DB)
  const data = await db.query.users.findMany({
    where: (users, { eq, and, or, like }) =>
      and(
        eq(users.role, role),
        or(
          like(users.name, `%${searchQuery}%`),
          like(users.username, `%${searchQuery}%`),
        ),
      ),
    limit: 10,
  })
  return data
}

export const updateUser = async (DB: D1Database, input: UpdateUser) => {
  const db = initializeDB(DB)
  const data = await db
    .update(users)
    .set({
      ...input,
      updatedAt: sql`CURRENT_TIMESTAMP`,
    })
    .where(eq(users.id, input.id))
  return data
}

export const deleteUser = async (DB: D1Database, input: string) => {
  const db = initializeDB(DB)
  const data = await db.delete(users).where(eq(users.id, input))
  return data
}

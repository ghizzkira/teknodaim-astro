import { initTRPC, TRPCError } from "@trpc/server"

import type { Context } from "./context"

const t = initTRPC.context<Context>().create()

export const router = t.router

const enforceIsAuthed = t.middleware(async (opts) => {
  if (opts.ctx.session === null || opts.ctx.session === undefined)
    throw new TRPCError({ code: "UNAUTHORIZED" })

  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email!),
  })

  return opts.next({
    ctx: {
      user: data,
    },
  })
})

const enforceUserIsAuthor = t.middleware(async (opts) => {
  const user = await opts.ctx.db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, opts.ctx.session?.user?.email!),
  })

  const isAuthor = user?.role === "author"

  if (opts.ctx.session && isAuthor) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email!),
  })

  return opts.next({
    ctx: {
      user: data,
    },
  })
})

const enforceUserIsAuthorOrAdmin = t.middleware(async (opts) => {
  const user = await opts.ctx.db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, opts.ctx.session?.user?.email!),
  })

  const isAuthorOrAdmin = user?.role?.includes("author" || "admin")

  if (opts.ctx.session && isAuthorOrAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email!),
  })

  return opts.next({
    ctx: {
      user: data,
    },
  })
})

const enforceUserIsAdmin = t.middleware(async (opts) => {
  const user = await opts.ctx.db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, opts.ctx.session?.user?.email!),
  })

  const isAdmin = user?.role === "admin"

  if (opts.ctx.session && isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email!),
  })

  return opts.next({
    ctx: {
      user: data,
    },
  })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(enforceIsAuthed)
export const authorProtectedProcedure = t.procedure.use(enforceUserIsAuthor)
export const adminProtectedProcedure = t.procedure.use(enforceUserIsAdmin)
export const authorOrAdminProtectedProcedure = t.procedure.use(
  enforceUserIsAuthorOrAdmin,
)

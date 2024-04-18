import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { g as getSession, d as db } from './__MLL9IRBw.mjs';
import { initTRPC, TRPCError } from '@trpc/server';

function createTRPCInnerContext(opts) {
  return {
    db,
    session: opts?.session,
    user: opts?.session?.user
  };
}
async function createContext(opts) {
  const session = await getSession(opts.req);
  const contextInner = createTRPCInnerContext({ session });
  return {
    ...contextInner
  };
}

const t = initTRPC.context().create();
const router = t.router;
const enforceIsAuthed = t.middleware(async (opts) => {
  if (opts.ctx.session === null || opts.ctx.session === void 0)
    throw new TRPCError({ code: "UNAUTHORIZED" });
  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email)
  });
  return opts.next({
    ctx: {
      user: data
    }
  });
});
const enforceUserIsAuthor = t.middleware(async (opts) => {
  const user = await opts.ctx.db.query.users.findFirst({
    where: (user2, { eq }) => eq(user2.email, opts.ctx.session?.user?.email)
  });
  const isAuthor = user?.role === "author";
  if (opts.ctx.session && isAuthor) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email)
  });
  return opts.next({
    ctx: {
      user: data
    }
  });
});
const enforceUserIsAuthorOrAdmin = t.middleware(async (opts) => {
  const user = await opts.ctx.db.query.users.findFirst({
    where: (user2, { eq }) => eq(user2.email, opts.ctx.session?.user?.email)
  });
  const isAuthorOrAdmin = user?.role?.includes("author");
  if (opts.ctx.session && isAuthorOrAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email)
  });
  return opts.next({
    ctx: {
      user: data
    }
  });
});
const enforceUserIsAdmin = t.middleware(async (opts) => {
  const user = await opts.ctx.db.query.users.findFirst({
    where: (user2, { eq }) => eq(user2.email, opts.ctx.session?.user?.email)
  });
  const isAdmin = user?.role === "admin";
  if (opts.ctx.session && isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const data = await opts.ctx.db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, opts.ctx.session?.user?.email)
  });
  return opts.next({
    ctx: {
      user: data
    }
  });
});
const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(enforceIsAuthed);
t.procedure.use(enforceUserIsAuthor);
t.procedure.use(enforceUserIsAdmin);
t.procedure.use(
  enforceUserIsAuthorOrAdmin
);

const example = router({
  public: publicProcedure.query(() => {
    return "Hello from server!";
  }),
  private: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.user?.name}`;
  })
});

const appRouter = router({
  example
});

const ALL = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext
  });
};

export { ALL };

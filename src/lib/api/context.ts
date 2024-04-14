import type { APIContext } from "astro"
import type { inferAsyncReturnType } from "@trpc/server"
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

import { validateRequest, type AuthSession } from "@/lib/auth/utils"
import { db } from "@/lib/db"

interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {
  session: AuthSession["session"] | null
  context: APIContext
}

export function createTRPCInnerContext(opts?: CreateInnerContextOptions) {
  return {
    session: opts?.session,
    user: opts?.session?.user,
    db,
    ...opts,
  }
}

export async function createContext(
  opts: FetchCreateContextFnOptions & { context: APIContext },
) {
  const { session } = await validateRequest(opts?.context)

  //@ts-expect-error
  const contextInner = createTRPCInnerContext({ session })

  return {
    ...contextInner,
  }
}

export type Context = inferAsyncReturnType<typeof createTRPCInnerContext>

import type { APIRoute } from "astro"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { createContext } from "@/lib/api/context"
import { appRouter } from "@/lib/api/routes"

export const ALL: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  })
}

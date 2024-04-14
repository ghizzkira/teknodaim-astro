import type { APIRoute } from "astro"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter, createContext } from "@/server"

export const all: APIRoute = ({ request }) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  })
}

/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>

declare namespace App {
  interface Locals extends Runtime {
    session: import("lucia").Session | null
    user: import("lucia").User | null
  }
}

type D1Database = import("@cloudflare/workers-types/experimental").D1Database

interface ENV {
  DB: D1Database
}

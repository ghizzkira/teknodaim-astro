/// <reference types="astro/client" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<ENV>

type User = import("lucia").User &
  import("@/lib/validation/user").UpdateUser & {
    role: import("@/lib/validation/user").UserRole
  }

declare namespace App {
  interface Locals extends Runtime {
    session: import("lucia").Session | null
    user: Partial<User> | null
    cache(_seconds: number): void
  }
}

type D1Database = import("@cloudflare/workers-types/experimental").D1Database

interface ENV {
  DB: D1Database
}

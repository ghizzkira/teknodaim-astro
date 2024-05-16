import type { Config } from "drizzle-kit"

export default {
  dialect: "sqlite",
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: `${process.cwd()}/wrangler.toml`,
    dbName: "teknodaim",
  },
  verbose: true,
  strict: true,
} satisfies Config

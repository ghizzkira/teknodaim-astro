import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_DOMAIN ?? "http://localhost:4321",
  output: "server",
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      en: "http://global.localhost:4321",
      id: `http://localhost:4321`,
    },
  },
  experimental: {
    i18nDomains: true,
  },
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"],
    },
  },
})

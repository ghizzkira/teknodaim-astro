import { defineConfig, passthroughImageService } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare(),
  image: {
    service: passthroughImageService(),
    domains: ["media.teknodaim.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.teknodaim.com",
      },
    ],
  },
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

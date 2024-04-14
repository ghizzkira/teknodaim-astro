import vercel from "@astrojs/vercel/serverless"
import { defineConfig } from "astro/config"
import auth from "auth-astro"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    auth(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["auth:config"],
    },
  },
})

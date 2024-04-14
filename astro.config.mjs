import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import auth from "auth-astro";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [auth(), tailwind({
    applyBaseStyles: false
  }), react()],
  vite: {
    optimizeDeps: {
      exclude: ["auth:config"]
    }
  }
});
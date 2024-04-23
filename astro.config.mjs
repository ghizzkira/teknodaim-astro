import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PUBLIC_DOMAIN ?? "http://localhost:4321",
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
    imageService: "custom",
    // routes: {
    //   extend: {
    //     include: [{ pattern: "/en/*" }], // Route a prerended page to the SSR function for on-demand rendering
    //   },
    // },
  }),
  image: {
    endpoint: "./src/lib/utils/image/image-endpoint",
    domains: ["secure.gravatar.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "assets.tripay.co.id",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.dafunda.com",
      },
      {
        protocol: "https",
        hostname: import.meta.env.PUBLIC_DOMAIN,
      },
      {
        protocol: "https",
        hostname: `*.${import.meta.env.PUBLIC_DOMAIN}`,
      },
      {
        protocol: "https",
        hostname: `media.${import.meta.env.PUBLIC_DOMAIN}`,
      },
      {
        protocol: "https",
        hostname: `cdn.${import.meta.env.PUBLIC_DOMAIN}`,
      },
    ],
    service: {
      entrypoint: "./src/lib/utils/image/image",
    },
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

import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import partytown from "@astrojs/partytown"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
  output: "server",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      en: import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
      id: import.meta.env.PUBLIC_EN_SITE_URL ?? "http://localhost:4321",
    },
  },
  experimental: {
    i18nDomains: true,
  },
  adapter: cloudflare({
    mode: "directory",
    imageService: "cloudflare",
    functionPerRoute: true,
    platformProxy: {
      enabled: true,
    },
    // routes: {
    //   extend: {
    //     include: [{ pattern: "/en/*" }], // Route a prerended page to the SSR function for on-demand rendering
    //   },
    // },
  }),

  image: {
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
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"],
    },

    ssr: {
      external: [
        "node:buffer",
        "node:util",
        "node:path",
        "node:child_process",
        "node:stream",
        "node:cripto",
        "node:fs",
        "node:os",
      ],
    },
  },
})

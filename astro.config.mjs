import { defineConfig } from "astro/config"
import cloudflare from "@astrojs/cloudflare"
import partytown from "@astrojs/partytown"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
// import commonjs from "vite-plugin-commonjs"
import topLevelAwait from "vite-plugin-top-level-await"
import wasm from "vite-plugin-wasm"

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:8788",
  output: "server",
  i18n: {
    defaultLocale: "id",
    locales: ["id", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
    domains: {
      en: "http://localhost:8788",
      id: `http://localhost:8788`,
    },
  },
  experimental: {
    i18nDomains: true,
  },
  adapter: cloudflare({
    imageService: "custom",
    platformProxy: {
      enable: true,
    },
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
    build: {
      rollupOptions: {
        external: ["wasm-image-optimization", "@cf-wasm/photon"],
      },
    },
    plugins: [wasm(), topLevelAwait()],
    // ssr: {
    //   external: [
    //     "node:buffer",
    //     "node:util",
    //     "node:path",
    //     "node:child_process",
    //     "node:stream",
    //     "node:cripto",
    //     "node:fs",
    //   ],
    // },
  },
})

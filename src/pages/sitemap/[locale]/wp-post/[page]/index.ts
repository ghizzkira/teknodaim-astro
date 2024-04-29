/* eslint-disable @typescript-eslint/restrict-template-expressions */

import type { APIRoute } from "astro"

import { wpGetPostsSitemapAction } from "@/lib/wp/action/wp-post"
import type { WpMapPostDataProps } from "@/lib/wp/action/wp-types"
import { splitUriWP } from "@/lib/wp/helper"

function generateSiteMap(posts: WpMapPostDataProps[] | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${
       posts
         ?.map((post: WpMapPostDataProps) => {
           const uri = splitUriWP(post.uri, post.slug)
           const langId = `${import.meta.env.PUBLIC_DOMAIN}`
           const langEn = `${import.meta.env.PUBLIC_DOMAIN}/en`
           return `
       <url>
           <loc>https://${`${
             post.language.slug === "id" ? langId : langEn
           }${uri}/`}</loc>
           <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
       </url>
     `
         })
         .join("") ?? []
     }
   </urlset>
 `
}

export const GET: APIRoute = async ({ params }) => {
  const page = parseInt(params.page!)
  const locale = params.locale
  const { posts } = await wpGetPostsSitemapAction(
    page as unknown as number,
    locale?.toLocaleUpperCase(),
  )
  const sitemap = generateSiteMap(posts)

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  })
}

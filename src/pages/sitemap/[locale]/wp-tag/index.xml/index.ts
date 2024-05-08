/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { wpGetAllTagsSiteMap } from "@/lib/wp/action/wp-tag"
import type { WpTagsDataProps } from "@/lib/wp/action/wp-types"

import { wpGetAllTagsSiteMap } from "@/lib/wp/action/wp-tag"
import type { WpTagsDataProps } from "@/lib/wp/action/wp-types"

function generateSiteMap(tags: WpTagsDataProps[] | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${
       tags
         ?.map((tag: WpTagsDataProps) => {
           const langId = `${import.meta.env.PUBLIC_DOMAIN}`
           const langEn = `${import.meta.env.PUBLIC_DOMAIN}/en`
           return `
       <url>
           <loc>https://${`${
             tag.language.slug.toLowerCase() === "id" ? langId : langEn
           }/tag/${tag.slug}/`}</loc>
          
       </url>
     `
         })
         .join("") ?? []
     }
   </urlset>
 `
}

export async function GET(): Promise<Response> {
  const { tags } = await wpGetAllTagsSiteMap()

  const sitemap = generateSiteMap(tags)

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  })
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { wpGetAllCategoriesSiteMapAction } from "@/lib/wp/action/wp-category"
import type { WpCategoriesDataProps } from "@/lib/wp/action/wp-types"

function generateSiteMap(categories: WpCategoriesDataProps[] | null) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${
         categories
           ?.map((category: WpCategoriesDataProps) => {
             const langId = `${import.meta.env.PUBLIC_DOMAIN}`
             const langEn = `${import.meta.env.PUBLIC_DOMAIN}/en`

             return `
         <url>
             <loc>https://${`${
               category.language.slug.toLowerCase() === "id" ? langId : langEn
             }/${category.slug}/`}</loc>
            
         </url>
       `
           })
           .join("") ?? []
       }
     </urlset>
   `
}

export async function GET() {
  const { categories } = await wpGetAllCategoriesSiteMapAction()
  const sitemap = generateSiteMap(categories)

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  })
}

import { wpGetTotalPosts } from "@/lib/wp/action/wp-post"

interface RouteProps {
  url: string
  lastModified: string
}

async function generateSiteMap() {
  const { totalPosts } = await wpGetTotalPosts("ID")
  const { totalPosts: totalPostsEn } = await wpGetTotalPosts("EN")

  const postPageCount = Math.ceil(totalPosts! / 100)
  const postPageCountEn = Math.ceil(totalPostsEn! / 100)

  const wpPosts: RouteProps[] = []
  if (typeof postPageCount === "number") {
    for (let i = 0; i < postPageCount; i++) {
      const obj = {
        url: `https://${`${import.meta.env.PUBLIC_DOMAIN}/sitemap/id/wp-post/${i + 1}/`}`,
        lastModified: new Date()
          .toISOString()
          .split("T")[0] as unknown as string,
      }
      wpPosts.push(obj)
    }
  }
  const wpPostsEn: RouteProps[] = []
  if (typeof postPageCountEn === "number") {
    for (let i = 0; i < postPageCountEn; i++) {
      const obj = {
        url: `https://${`${import.meta.env.PUBLIC_DOMAIN}/sitemap/en/wp-post/${i + 1}/`}`,
        lastModified: new Date()
          .toISOString()
          .split("T")[0] as unknown as string,
      }
      wpPostsEn.push(obj)
    }
  }
  const wpPostsNews: RouteProps[] = []
  if (typeof postPageCount === "number") {
    for (let i = 0; i < postPageCount; i++) {
      const obj = {
        url: `https://${`${import.meta.env.PUBLIC_DOMAIN}/sitemap-news/id/wp-post/${
          i + 1
        }/`}`,
        lastModified: new Date()
          .toISOString()
          .split("T")[0] as unknown as string,
      }
      wpPostsNews.push(obj)
    }
  }
  const wpPostsNewsEn: RouteProps[] = []
  if (typeof postPageCountEn === "number") {
    for (let i = 0; i < postPageCountEn; i++) {
      const obj = {
        url: `https://${`${import.meta.env.PUBLIC_DOMAIN}/sitemap-news/en/wp-post/${
          i + 1
        }/`}`,
        lastModified: new Date()
          .toISOString()
          .split("T")[0] as unknown as string,
      }
      wpPostsNewsEn.push(obj)
    }
  }

  const base = [
    "/article/",
    "/download/",
    "/sitemap/shop/index.xml",
    "/sitemap/wp-category/index.xml",
    "/sitemap/wp-tag/index.xml",
  ].map((route) => ({
    url: `${import.meta.env.PUBLIC_SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))
  const routes = [
    ...base,
    ...wpPostsNewsEn,
    ...wpPosts,
    ...wpPostsEn,
    ...wpPostsNews,
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${
       routes
         ?.map((route) => {
           return `
       <url>
           <loc>${route.url}</loc>
           <lastmod>${route.lastModified}</lastmod>
       </url>
     `
         })
         .join("") ?? []
     }
   </urlset>
 `
}

export async function GET(): Promise<Response> {
  const sitemap = await generateSiteMap()

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  })
}

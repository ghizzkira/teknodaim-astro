import type { APIContext } from "astro"

import {
  getWpCommentsByWpPostSlug,
  getWpCommentsCountByWpPostSlug,
} from "@/lib/action/wp-comment"
import { santizeCharacter } from "@/lib/amp/sanitize"
import { basecolor, htmlStyle } from "@/lib/amp/style"
import { transformHtmlToAMP } from "@/lib/amp/transform-html-to-amp"
import { formatDateFromNow } from "@/lib/utils/date"
import { generateJsonLdSchema } from "@/lib/utils/schema"
import type { LanguageType } from "@/lib/validation/language"
import {
  wpGetPostBySlugAction,
  wpGetPostsByCategorySlugAction,
} from "@/lib/wp/action/wp-post"
import type { WpCategoriesDataProps } from "@/lib/wp/action/wp-types"
import { splitUriWP, wpPrimaryCategorySlug } from "@/lib/wp/helper"
import { z } from "zod"

import {
  getWpCommentsByWpPostSlug,
  getWpCommentsCountByWpPostSlug,
} from "@/lib/action/wp-comment"
import { santizeCharacter } from "@/lib/amp/sanitize"
import { basecolor, htmlStyle } from "@/lib/amp/style"
import { transformHtmlToAMP } from "@/lib/amp/transform-html-to-amp"
import { formatDateFromNow } from "@/lib/utils/date"
import { generateJsonLdSchema } from "@/lib/utils/schema"
import type { LanguageType } from "@/lib/validation/language"
import {
  wpGetPostBySlugAction,
  wpGetPostsByCategorySlugAction,
} from "@/lib/wp/action/wp-post"
import type { WpCategoriesDataProps } from "@/lib/wp/action/wp-types"
import { splitUriWP, wpPrimaryCategorySlug } from "@/lib/wp/helper"
import { z } from "zod"

const inputSchema = z.object({
  wpPostSlug: z.string(),
  page: z.number(),
  perPage: z.number(),
})
export const GET = async (context: APIContext) => {
  const { params } = context
  const { slug, categorySlug } = params
  const DB = context.locals.runtime.env.DB

  const { post: mainPost, otherLangPost } = await wpGetPostBySlugAction(slug!)

  if (!mainPost && !otherLangPost) {
    return new Response(null, {
      status: 404,
    })
  }

  const locale = "id"
  let post = null
  if (
    mainPost &&
    slug === mainPost.slug &&
    mainPost.language.slug.toLocaleLowerCase() === "id"
  ) {
    post = mainPost
  } else if (
    mainPost &&
    slug === mainPost.slug &&
    mainPost.language.slug.toLocaleLowerCase() !== "id"
  ) {
    if (otherLangPost?.slug) {
      const { primaryCategory } = wpPrimaryCategorySlug(
        otherLangPost?.categories as WpCategoriesDataProps[],
      )
      Response.redirect(`/${primaryCategory?.slug}/${otherLangPost?.slug}/amp/`)
    }
  }
  if (!post) {
    Response.redirect("/")
  }
  const { posts: categoryPosts } = await wpGetPostsByCategorySlugAction(
    categorySlug!,
    "",
    post?.id,
  )

  // const settings = await api.setting.byKey("settings")
  // const adsBelowHeader = await api.ad.byPosition("article_below_header_amp")
  // const adsSingleArticleAbove = await api.ad.byPosition(
  //   "single_article_above_content_amp",
  // )
  // const adsSingleArticleBelow = await api.ad.byPosition(
  //   "single_article_below_content_amp",
  // )
  // const adsSingleArticleInline = await api.ad.byPosition(
  //   "single_article_middle_content_amp",
  // )
  // const menus = await api.menu.byLocation("sidebar_all_amp")
  // const menusByLang = await api.menu.byLocation(
  //   "id" === "id" ? "sidebar_all_id_amp" : "sidebar_all_en_amp",
  // )
  // const menusFooterAll = await api.menu.byLocation("footer_all_amp")
  // const menusFooterByLang = await api.menu.byLocation(
  //   "id" === "id" ? "footer_id_amp" : "footer_en_amp",
  // )

  //   const menusAllLang = menus
  //     ?.map((menu) => {
  //       if (menu.active) {
  //         return `
  // <li>
  //         <a aria-label="${menu.title}" role="link" class="sidebar-link" href="${menu.link}">
  //             <p class="sidebar-p">
  //             ${menu.icon && `<amp-img alt="${menu.title}" src="${menu.icon}" width="16" height="16" class="sidebar-item-svg" layout="fixed"></amp-img>`}
  //                 ${menu.title}
  //             </p>
  //         </a>
  //     </li>
  //         `
  //       }
  //       return
  //     })
  //     .join("")
  //   const menusByLangHtml = menusByLang
  //     ?.map((menu) => {
  //       if (menu.active) {
  //         return `
  // <li>
  //     <a aria-label="${menu.title}" role="link" class="sidebar-link" href="${menu.link}">
  //         <p class="sidebar-p">
  //             ${menu.icon && `<amp-img alt="${menu.title}" src="${menu.icon}" width="16" height="16" class="sidebar-item-svg" layout="fixed"></amp-img>`}
  //             ${menu.title}
  //         </p>
  //     </a>
  // </li>
  //         `
  //       }
  //       return
  //     })
  //     .join("")
  const wpPostSlug = params.slug
  const parsedInputCount = z.string().parse(wpPostSlug)

  const commentCount = await getWpCommentsCountByWpPostSlug(
    DB,
    parsedInputCount,
  )

  const url = new URL(context.request.url)
  const queryParams = new URLSearchParams(url.search)
  const page = parseInt(queryParams.get("page") ?? "1")
  const perPage = parseInt(queryParams.get("perPage") ?? "10")

  const parsedInput = inputSchema.parse({
    wpPostSlug,
    page,
    perPage,
  })

  const comments = await getWpCommentsByWpPostSlug(DB, parsedInput)

  const commentsHtml = `
    <div class="amp-comment-container">
    <div class="amp-comment-count">
  Comments (${commentCount ?? 0})
  </div>
  <div class="amp-comment-action">
  <a aria-label="You should sign in before comment" href="/${categorySlug}/${slug}#comment/">
  Leave a comment
  </a>
  </div>
      <ul class="amp-comment-lists">
          ${comments
            .map((comment) => {
              return `
          <li class="amp-comment-lists">
              <div class="amp-comment-item">
                  <figcaption>
                      <div class="amp-comment-item-img">
                          <amp-img layout="fixed" width="40" height="40" src="${comment?.author?.image}"></amp-img>
                      </div>
                      <div class="amp-comment-item-content">
                          <div class="amp-comment-author-name">
                              <h1>
                                  ${comment?.author?.name}
                              </h1>
                              <div class="amp-comment-date">
                                  ${formatDateFromNow(comment.createdAt, "id")}
                              </div>
                          </div>
                          <span class="amp-comment-content">
                              ${comment.content}
                          </span>
                      </div>
                  </figcaption>
              </div>
          </li>
          ${comment?.replies
            ?.map((reply) => {
              return `
          <li class="amp-comment-reply-container">
              <div class="amp-comment-reply-item">
                  <figcaption>
                      <div class="amp-comment-reply-img">
                          <amp-img layout="fixed" width="40" height="40" src="${reply?.author?.image}"></amp-img>
                      </div>
                      <div class="amp-comment-item-content">
                          <div class="amp-comment-author-name">
                              <h1>
                                  ${reply?.author?.name}
                              </h1>
                              <div class="amp-comment-date">
                                  ${formatDateFromNow(reply.createdAt, "id")}
                              </div>
                          </div>
                          <span class="amp-comment-content">${reply.content}</span>
                      </div>
                  </figcaption>
              </div>
          </li>`
            })
            .join("")}
          `
            })
            .join("")}
      </ul>
  </div>
    `
  //   let settingsValue

  //   if (settings) {
  //     const parsedData = JSON.parse(settings.value)
  //     settingsValue = { ...parsedData }
  //   }

  const htmlcontent = await transformHtmlToAMP(post)
  const { newsArticle, breadcrumbList } = generateJsonLdSchema(post, "id")

  //   const adsBelowHeaderHtml = adsBelowHeader?.map((ad) => {
  //     return `
  // <div class="amp-ad-header">
  //     <amp-ad width="100vw" height="320" type="adsense" data-ad-client="${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}" data-ad-slot="${ad.content}" data-auto-format="rspv" data-full-width="">
  //         <div overflow></div>
  //     </amp-ad>
  // </div>
  //     `
  //   })
  //   const adsSingleArticleAboveHtml = adsSingleArticleAbove?.map((ad) => {
  //     return `<div class="amp-ad-content"><amp-ad width="100vw" height="320" type="adsense" data-ad-client="${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}" data-ad-slot="${ad.content}" data-auto-format="rspv" data-full-width=""><div overflow></div></amp-ad></div>`
  //   })
  //   const adsSingleArticleBelowHtml = adsSingleArticleBelow?.map((ad) => {
  //     return `<div class="amp-ad-content"><amp-ad width="100vw" height="320" type="adsense" data-ad-client="${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}" data-ad-slot="${ad.content}" data-auto-format="rspv" data-full-width=""><div overflow></div></amp-ad></div>`
  //   })
  //   const adsSingleArticleInlineHtml = adsSingleArticleInline?.map((ad) => {
  //     return `<div class="amp-ad-content"><amp-ad width="100vw" height="320" type="adsense" data-ad-client="${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}" data-ad-slot="${ad.content}" data-auto-format="rspv" data-full-width=""><div overflow></div></amp-ad></div>`
  //   })

  const layoutHtml = `<!doctype html>
  <html amp lang="en">
     <head>
        <meta charset="utf-8">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-script" src="https://cdn.ampproject.org/v0/amp-script-0.1.js"></script>
        <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
        <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
        <script async custom-element="amp-twitter" src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"></script>
        <script async custom-element="amp-auto-ads" src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <meta
          name="amp-script-src"
          content="sha384-HLjhGFoQL5ruBX6qnMC1eyKy-QVvXvGLwT0Pe55bKhv3Ov21f0S15eWC0gwkcxHg">
        <title>${post.title}</title>
        <link rel="canonical" href="${
          "id" === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }${splitUriWP(post.uri, post.slug)}/">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
        <noscript>
           <style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style>
        </noscript>
        <meta property="og:title" content="${post.title}">
        <meta name="twitter:title" content="${post.title}">
        <meta name="description" content="${santizeCharacter(post.seo.metaDesc)}">
        <meta property="og:description" content="${santizeCharacter(post.seo.metaDesc)}">
        <meta name="twitter:description" content="${santizeCharacter(post.seo.metaDesc)}">
        <meta property="og:site_name" content="${
          import.meta.env.PUBLIC_SITE_URL
        }">
        <meta property="og:id" content="${locale}">
        <meta property="og:type" content="article">
        <meta property="og:url" content="${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }${splitUriWP(post.uri, post.slug)}/">
        <meta name="twitter:url" content="${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }${splitUriWP(post.uri, post.slug)}/">
        <meta property="og:image" content="${post.featuredImage.sourceUrl}">
        <meta name="twitter:image" content="${post.featuredImage.sourceUrl}">
        <meta name="twitter:label1" content="Written by">
        <meta name="twitter:data1" content="${post.author.name}">
        <meta property="article:published_time" content=${JSON.stringify(post.date)}>
        ${post.tags
          .map(
            (tag) => `
        <meta property="article:tag" content="${tag.name}">
        `,
          )
          .join("")}
        <meta name="twitter:card" content="summary_large_image">
        <link
           rel="apple-touch-icon"
           sizes="180x180"
           href="/icon/apple-touch-icon.png"
           />
        <link
           rel="icon"
           type="image/png"
           sizes="32x32"
           href="/icon/favicon-32x32.png"
           />
        <link
           rel="icon"
           type="image/png"
           sizes="16x16"
           href="/icon/favicon-16x16.png"
           />
           <link rel="preload" fetchpriority="high"  as="image"
    href="${post.featuredImage.sourceUrl}">
    <link rel="dns-prefetch" href="https://${import.meta.env.PUBLIC_WP_DOMAIN}" />
    <link rel="dns-prefetch" href="https://cdn.ampproject.org" />
    <link rel="dns-prefetch" href="https://secure.gravatar.com" />
        <style amp-custom>
        ${basecolor}
       ${htmlStyle}
          
        </style>
        <script
            type="application/ld+json">${JSON.stringify(newsArticle)}</script>
        <script type="application/ld+json">${JSON.stringify(breadcrumbList)}
        </script>
        
     </head>
     <body>
     <amp-auto-ads class="amp-ad-content" type="adsense" data-ad-client="${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}" data-auto-format="rspv" data-full-width="">
        <div overflow></div>
     </amp-auto-ads>
     <div id="dark-mode-wrapper" class="ligth-mode" [class]="darkClass">
     <header id="#top" class="header-container">
     <label for="sidebar-trigger" class="sidebar-icon-toggle">
        <span class="spinner diagonal part-1 bg-foreground"></span>
        <span class="spinner horizontal bg-foreground"></span>
        <span class="spinner diagonal part-2 bg-foreground"></span>
     </label>
     <div class="center-content">
        <a class="amp-logo" href="/">
           <amp-img src="${import.meta.env.PUBLIC_LOGO_URL}" width="120" height="23" layout="fixed" alt="${
             locale === "id"
               ? import.meta.env.PUBLIC_SITE_URL
               : import.meta.env.PUBLIC_EN_SITE_URL
           }"></amp-img>
        </a>
        <div>
        <amp-state id="darkClass">
  <script type="application/json">
    "light-mode"
  </script>
</amp-state>
<amp-state id="darkModeSwitcherClass">
  <script type="application/json">
    "amp-dark-mode-container light-mode"
  </script>
</amp-state>
<amp-script layout="container" script="dark-mode-script">
  <div class="flex-center">
<div class="amp-dark-mode-container">
  <button id="dark-mode-switcher-light"  class="amp-dark-mode-button">
  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Dark Theme" class="amp-dark-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"></path></svg>
  </button>
  <button id="dark-mode-switcher-dark"  class="amp-dark-mode-button">
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Light Theme" class="amp-light-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path></svg>
  </button>
</div>
</div>
</amp-script>
<script id="dark-mode-script" type="text/plain" target="amp-script">
const lightButton = document.getElementById('dark-mode-switcher-light');
const darkButton = document.getElementById('dark-mode-switcher-dark');
lightButton.addEventListener('click', () => {
 AMP.setState({ darkClass: 'dark-mode'}); 
});
darkButton.addEventListener('click', () => {
 AMP.setState({ darkClass: 'light-mode'}); 
});

</script>
</div>
     </div>
  </header>
  <input class="sidebar-trigger" id="sidebar-trigger" type="checkbox">
  <div id="sidebarMenu" class="sidebar-container">
     <nav class="sidebar-nav">
        <ul class="sidebar-items">
           <li>
              <a aria-label="Go To Trending Page" role="link" class="sidebar-link" href="/trending/">
                 <p class="sidebar-p">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Go To Trending Page" class="sidebar-item-svg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                       <path fill="none" d="M0 0h24v24H0z"></path>
                       <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
                    </svg>
                    Trending
                 </p>
              </a>
           </li>
           <li>
              <a aria-label="Go To Popular Page" role="link" class="sidebar-link" href="/popular/">
                 <p class="sidebar-p">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" aria-label="Go To Popular Page" class="sidebar-item-svg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                       <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"></path>
                    </svg>
                    Popular
                 </p>
              </a>
           </li>
          
        </ul>
        <ul class="sidebar-items">
           <li>
              <a role="link" aria-label="Go To Download Page" class="sidebar-link" href="/download/">
                 <p class="sidebar-p">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Go To Download Page" class="sidebar-item-svg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                       <path fill="none" d="M0 0h24v24H0z"></path>
                       <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"></path>
                    </svg>
                    Download
                 </p>
              </a>
           </li>
           <li>
              <a role="link" aria-label="Go To Video Page" class="sidebar-link" href="/video/">
                 <p class="sidebar-p">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" aria-label="Go To Video Page" class="sidebar-item-svg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                       <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                    </svg>
                    Video
                 </p>
              </a>
           </li>
        </ul>
     </nav>
  </div>
  
  <main class="content" role="main">
     <article class="post">
        <div class="amp-wp-meta-terms">
           <div class="amp-wp-tax-category">${post.categories
             .map((category) => {
               return `<a href="/${category.slug}" rel="category tag">${category.name}</a>`
             })
             .join(" ")}
           </div>
        </div>
        <header class="post-header">
           <h1 class="post-title">${post.title}</h1>
           <ul class="amp-wp-meta">
              <li class="amp-wp-byline">
                 <amp-img src="${post.author.avatar.url}" width="42" height="42" layout="fixed"></amp-img>
                 <div class="amp-wp-author">
                    <a href="/author/${post.author.slug}">${post.author.name}</a>
                    <time class="post-date" datetime=${JSON.stringify(post.date)}>${formatDateFromNow(post.date, locale)}</time>
                 </div>
              </li>
              <li class="amp-wp-posted-on">
              </li>
           </ul>
        </header>
        <figure class="post-image">
           <amp-img noloading data-hero sizes="${post.featuredImage?.sizes}" srcset="${post.featuredImage.srcSet}" src="${post.featuredImage.sourceUrl}" width="600" height="340" layout="responsive" alt="${post.title}"></amp-img>
        </figure>
        <div class="amp-share-container">
            <a target="_blank" rel="noopener noreferrer" title="" class="amp-share-facebook" href="https://facebook.com/sharer/sharer.php?u=${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}/">
                <button class="amp-share-facebook-button" aria-label="Facebook">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                  </svg>
                </button>
            </a>
            <a target="_blank" rel="noopener noreferrer" title="" class="amp-share-x" href="https://twitter.com/intent/tweet/?text=${encodeURI(post.seo.metaDesc)}&amp;url=${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}/">
                <button class="amp-share-x-button" aria-label="Twitter">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </button>
            </a>
            <a target="_blank" rel="noopener noreferrer" title="${post.title}" class="amp-share-email" href="mailto:?subject=${encodeURI(post.title)};body=${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}}/">
                <button class="amp-share-email-button" aria-label="Email">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                  </svg>
                </button>
            </a>
            <a target="_blank" rel="noopener noreferrer" title="" class="amp-share-whatsapp" href="whatsapp://send?text=${encodeURI(post.title)}${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}/">
                <button class="amp-share-whatsapp-button" aria-label="WhatsApp">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </button>
            </a>
          </div>
         <section class="post-content">
           ${htmlcontent.firstCleanHtml}
            ${htmlcontent.secondCleanHtml}
        </section>
         <div class="amp-wp-meta-terms">
           <div class="amp-wp-tax-tag">${post.tags
             .map((tag) => {
               return `<a href="/tag/${tag.slug}" rel="category tag">${tag.name}</a>`
             })
             .join(" ")}
           </div>
        </div>
        <div class="amp-share-container">
            <a target="_blank" rel="noopener noreferrer" title="" class="amp-share-facebook" href="https://facebook.com/sharer/sharer.php?u=${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}/">
                <button class="amp-share-facebook-button" aria-label="Facebook">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                  </svg>
                </button>
            </a>
            <a target="_blank" rel="noopener noreferrer" title="" class="amp-share-x" href="https://twitter.com/intent/tweet/?text=${encodeURI(post.seo.metaDesc)}&amp;url=${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}/">
                <button class="amp-share-x-button" aria-label="Twitter">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                  </svg>
                </button>
            </a>
            <a target="_blank" rel="noopener noreferrer" title="${post.title}" class="amp-share-email" href="mailto:?subject=${encodeURI(post.title)};body=${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}}/">
                <button class="amp-share-email-button" aria-label="Email">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                  </svg>
                </button>
            </a>
            <a target="_blank" rel="noopener noreferrer" title="" class="amp-share-whatsapp" href="whatsapp://send?text=${encodeURI(post.title)}${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }${splitUriWP(post.uri, post.slug)}/">
                <button class="amp-share-whatsapp-button" aria-label="WhatsApp">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </button>
            </a>
          </div>
          ${commentsHtml}
        <section class="mb-20">
           <h2 class="related-title">Related Posts</h2>
           <div class="related-posts">
              ${categoryPosts
                ?.map(
                  (category: { uri: string; slug: string; title: string }) => {
                    return `
              <article class="related-post">
                 <a aria-label="${category.title}" href="${splitUriWP(category.uri, category.slug)}">
                    <p>${category.title}</p>
                 </a>
              </article>
              `
                  },
                )
                .join("")}
           </div>
        </section>
     </article>
  </main>
  <footer class="amp-footer-container">
  <div class="amp-footer-top">
    <div class="amp-footer-top-menu">
      <div class="amp-footer-top-left-menu">
        <a class="amp-logo" href="/">
          <amp-img
            src="${import.meta.env.PUBLIC_LOGO_URL}"
            width="120"
            height="23"
            layout="fixed"
            alt="${
              locale === "id"
                ? import.meta.env.PUBLIC_SITE_URL
                : import.meta.env.PUBLIC_EN_SITE_URL
            }"
          ></amp-img>
        </a>
        <ul>
          <li>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-label="Location" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"></path></svg>
            <span>${import.meta.env.PUBLIC_ADDRESS}</span>
          </li>
          <li>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" aria-label="Send Email support@gamerode.com" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
            <a
              aria-label="Send Email ${import.meta.env.PUBLIC_SUPPORT_EMAIL}"
              href="mailto:${import.meta.env.PUBLIC_SUPPORT_EMAIL}"
            >
              <span>${import.meta.env.PUBLIC_SUPPORT_EMAIL}</span>
            </a>
          </li>
          <li>
          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" aria-label="Send Whatsapp to 6283822727338" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
            <a
              aria-label="Send Whatsapp to ${import.meta.env.PUBLIC_WHATSAPP_NUMBER}"
              href="https://api.whatsapp.com/send?phone=${import.meta.env.PUBLIC_WHATSAPP_NUMBER}"
            >
              <span>+${import.meta.env.PUBLIC_WHATSAPP_NUMBER}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="amp-footer-top-right-menu">
     
      </div>
    </div>
  </div>
  <div class="amp-footer-bottom">
    <div class="amp-footer-copy">
      © ${new Date().getFullYear()} ${import.meta.env.PUBLIC_SITE_TITLE}
    </div>
  </div>
</footer>
     </div>
     </body>
  </html>`

  return new Response(layoutHtml, { headers: { "content-type": "text/html" } })
}

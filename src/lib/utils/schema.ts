import type { LanguageType } from "@/lib/validation/language"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import { wpPrimaryCategorySlug } from "@/lib/wp/helper"

import type { LanguageType } from "@/lib/validation/language"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import { wpPrimaryCategorySlug } from "@/lib/wp/helper"

export function generateJsonLdSchema(
  post: WpSinglePostDataProps,
  locale: LanguageType,
) {
  const { primaryCategory } = wpPrimaryCategorySlug(post?.categories ?? [])
  const articleSections = post?.categories?.map((category) => {
    return category.name
  })

  const keywords =
    post?.tags.map((tag) => {
      return tag.name
    }) ?? ""

  const newsArticle = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/${primaryCategory?.slug ?? ""}/${post?.slug}#article/`,
        isPartOf: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/${post?.slug}/`,
        },
        author: {
          name: post?.author?.name ?? "",
          url: `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/author/${post?.author?.slug ?? ""}/`,
        },
        headline: post?.title ?? "",
        datePublished: new Date(post?.date),
        dateModified: new Date(post?.modified),
        mainEntityOfPage: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/${post?.slug}#article/`,
        },
        publisher: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/#organization/`,
        },
        image: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/${post?.slug}#primaryimage/`,
        },
        thumbnailUrl: post?.featuredImage?.sourceUrl ?? "",
        keywords: keywords,
        articleSection: articleSections,
        inLanguage: "id",
        potentialAction: [
          {
            "@type": "CommentAction",
            name: "Comment",
            target: [
              `${
                locale === "id"
                  ? import.meta.env.PUBLIC_SITE_URL
                  : import.meta.env.PUBLIC_EN_SITE_URL
              }/${primaryCategory?.slug ?? ""}/${post?.slug}#respond/`,
            ],
          },
        ],
        copyrightYear: "2024",
        copyrightHolder: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/#organization/`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/${primaryCategory?.slug ?? ""}/${post?.slug}/`,
        url: `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/${primaryCategory?.slug ?? ""}/${post?.slug}#article/`,
        name: post?.title ?? "",
        isPartOf: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/#website/`,
        },
        primaryImageOfPage: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/${post?.slug}#primaryimage/`,
        },
        image: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/${post?.slug}#primaryimage/`,
        },
        thumbnailUrl: post?.featuredImage?.sourceUrl ?? "",
        datePublished: new Date(post?.date),
        dateModified: new Date(post?.modified),
        description: post?.seo.metaDesc,
        breadcrumb: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/${post?.slug}#breadcrumb/`,
        },
        inLanguage: "id",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [
              `${
                locale === "id"
                  ? import.meta.env.PUBLIC_SITE_URL
                  : import.meta.env.PUBLIC_EN_SITE_URL
              }/${primaryCategory?.slug ?? ""}/${post?.slug}/`,
            ],
          },
        ],
      },
      {
        "@type": "ImageObject",
        inLanguage: "id",
        "@id": `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/${primaryCategory?.slug ?? ""}/${post?.slug}#primaryimage/`,
        url: post?.featuredImage?.sourceUrl ?? "",
        contentUrl: post?.featuredImage?.sourceUrl ?? "",
        width: 1280,
        height: 720,
        caption: post.featuredImage.altText ?? post?.title ?? "",
      },
      {
        "@type": "WebSite",
        "@id": `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }#article/`,
        url: `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/`,
        name: import.meta.env.PUBLIC_SITE_TITLE,
        description: import.meta.env.PUBLIC_SITE_DESCRIPTION,
        publisher: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/#organization/`,
        },
        inLanguage: "id",
      },
      {
        "@type": "Organization",
        "@id": `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/#organization`,
        name: import.meta.env.PUBLIC_SITE_TITLE,
        url: `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/`,
        logo: {
          "@type": "ImageObject",
          inLanguage: "id",
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/#schema/logo/image`,
          url: import.meta.env.PUBLIC_LOGO_URL,
          contentUrl: import.meta.env.PUBLIC_LOGO_URL,
          width: 512,
          height: 512,
          caption: import.meta.env.PUBLIC_SITE_TITLE,
        },
        image: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/#schema/logo/image`,
        },
        sameAs: [
          `https://www.facebook.com/${import.meta.env.PUBLIC_FACEBOOK_USERNAME}/`,
          `https://www.twitter.com/${import.meta.env.PUBLIC_TWITTER_USERNAME}/`,
          `https://www.youtube.com/${import.meta.env.PUBLIC_YOUTUBE_USERNAME}/`,
          `https://www.instagram.com/${import.meta.env.PUBLIC_YOUTUBE_USERNAME}/`,
        ],
      },
      {
        "@type": "Person",
        "@id": `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }#/schema/person/cfbb8c50dad6788bea8bc82c4d5dbcae`,
        name: post?.author?.name ?? "",
        image: {
          "@type": "ImageObject",
          inLanguage: "id",
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }#/schema/person/image`,
          url: post?.author?.avatar?.url ?? "",
          contentUrl: post?.author?.avatar?.url ?? "",
          caption: post?.author?.name ?? "",
        },
        url: `${
          locale === "id"
            ? import.meta.env.PUBLIC_SITE_URL
            : import.meta.env.PUBLIC_EN_SITE_URL
        }/author/${post?.author?.slug ?? ""}`,
      },
    ],
  }

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${
            locale === "id"
              ? import.meta.env.PUBLIC_SITE_URL
              : import.meta.env.PUBLIC_EN_SITE_URL
          }/${primaryCategory?.slug ?? ""}/`,
          name: `${primaryCategory.name}`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          name: `${post?.title ?? ""}`,
        },
      },
    ],
  }

  return { newsArticle, breadcrumbList }
}

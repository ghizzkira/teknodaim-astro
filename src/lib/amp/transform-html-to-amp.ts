//@ts-ignore
// import Amperize from "amperize"
import sanitizeHtml from "sanitize-html"

import ParseAMPContent from "@/components/ParseAMPContent"
import { splitReactNodes } from "@/lib/utils/content"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"

const allowedAMPTags = [
  "html",
  "body",
  "article",
  "section",
  "nav",
  "aside",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "footer",
  "address",
  "p",
  "a",
  "amp-img",
  "img",
  "amp-iframe",
  "amp-youtube",
  "amp-twitter",
  "i-amphtml-sizer",
  "iframe",
  "blockquote",
  "figure",
  "table",
  "tbody",
  "tr",
  "td",
  "strong",
  "b",
  "i",
  "span",
  "div",
  "ul",
  "li",
  //... and other tags (used for sanitize-html)
]

const allowedAMPAttributes = {
  "*": [
    "itemid",
    "itemprop",
    "itemref",
    "amp-access",
    "amp-access-*",
    "i-amp-access-id",
    "data-*",
    "style",
    "href",
    "layout",
    "height",
    "width",
    "src",
  ],
  //... and other tags (used for sanitize-html)
}
const allowedAMPClasses = {
  span: ["ctaText", "postTitle"],
  //... and other tags (used for sanitize-html)
}
const convertHtmlToAmp = (htmlStr: string) =>
  new Promise<string>((resolve, reject) => {
    // new Amperize().parse(htmlStr, (err: string | undefined, result: string) => {
    //   if (err) {
    //     return reject(new Error(err))
    //   }
    //   resolve(result)
    // })
  })

export async function transformHtmlToAMP(post: WpSinglePostDataProps) {
  const { renderToString } = (await import("react-dom/server")).default
  const { Children } = (await import("react")).default
  const fullContentReact = ParseAMPContent({
    htmlInput: post?.content!,
    title: post?.title!,
  })

  const { firstContent, secondContent } = splitReactNodes(
    Children.toArray(fullContentReact),
  )
  const firstContentHtml = renderToString(firstContent)
  const secondContentHtml = renderToString(secondContent)
  const firstAmpHtml = await convertHtmlToAmp(firstContentHtml)
  const firstCleanHtml = sanitizeHtml(firstAmpHtml, {
    allowedTags: allowedAMPTags,
    allowedAttributes: allowedAMPAttributes,
    selfClosing: ["source", "track", "br"],
    allowedClasses: allowedAMPClasses,
    transformTags: {
      span: function (tagName, attribs) {
        if (Object.hasOwnProperty.call(attribs, "data-tweetid")) {
          return {
            tagName: "amp-twitter",
            attribs: {
              "data-tweetid": attribs["data-tweetid"],
              width: "375",
              height: "472",
              layout: "responsive",
            },
          }
        }
        return { tagName, attribs } // Adjust this line based on your type definitions
      },
      a: function (tagName, attribs) {
        const regexId = new RegExp(import.meta.env.PUBLIC_WP_DOMAIN ?? "")
        const regexEn = new RegExp(import.meta.env.PUBLIC_WP_EN_SUBDOMAIN ?? "")
        return {
          tagName,
          attribs: {
            ...attribs,
            href:
              attribs?.href
                ?.replace(regexId, import.meta.env.PUBLIC_DOMAIN ?? "")
                ?.replace(regexEn, import.meta.env.PUBLIC_EN_SUBDOMAIN ?? "") ??
              "#",
          },
        }
      },
    },
  })?.replace(/!important/g, "")
  const secondAmpHtml = await convertHtmlToAmp(secondContentHtml)
  const secondCleanHtml = sanitizeHtml(secondAmpHtml, {
    allowedTags: allowedAMPTags,
    allowedAttributes: allowedAMPAttributes,
    selfClosing: ["source", "track", "br"],
    allowedClasses: allowedAMPClasses,
    transformTags: {
      span: function (tagName, attribs) {
        // My own custom magic goes here
        if (Object.hasOwnProperty.call(attribs, "data-tweetid")) {
          return {
            tagName: "amp-twitter",
            attribs: {
              "data-tweetid": attribs["data-tweetid"],
              width: "375",
              height: "472",
              layout: "responsive",
            },
          }
        }
        return { tagName, attribs } // Adjust this line based on your type definitions
      },
      a: function (tagName, attribs) {
        const regexId = new RegExp(import.meta.env.PUBLIC_WP_DOMAIN ?? "")
        const regexEn = new RegExp(import.meta.env.PUBLIC_WP_EN_SUBDOMAIN ?? "")
        return {
          tagName,
          attribs: {
            ...attribs,
            href:
              attribs?.href
                ?.replace(regexId, import.meta.env.PUBLIC_DOMAIN ?? "")
                ?.replace(regexEn, import.meta.env.PUBLIC_EN_SUBDOMAIN ?? "") ??
              "#",
          },
        }
      },
    },
  })?.replace(/!important/g, "")

  return { firstCleanHtml, secondCleanHtml }
}

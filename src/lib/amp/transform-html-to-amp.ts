import {
  allowedAMPAttributes,
  allowedAMPClasses,
  allowedAMPTags,
} from "./sanitize"
import ParseAMPContent from "@/components/ParseAMPContent"
import { splitReactNodes } from "@/lib/utils/content"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import sanitizeHtml from "sanitize-html"

import {
  allowedAMPAttributes,
  allowedAMPClasses,
  allowedAMPTags,
} from "./sanitize"
import ParseAMPContent from "@/components/ParseAMPContent"
import { splitReactNodes } from "@/lib/utils/content"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import sanitizeHtml from "sanitize-html"

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
  const firstCleanHtml = sanitizeHtml(firstContentHtml, {
    allowedTags: allowedAMPTags,
    allowedAttributes: allowedAMPAttributes,
    selfClosing: ["source", "track", "br"],
    allowedClasses: allowedAMPClasses,
    transformTags: transformHtmlTags(),
  })?.replace(/!important/g, "")
  const secondCleanHtml = sanitizeHtml(secondContentHtml, {
    allowedTags: allowedAMPTags,
    allowedAttributes: allowedAMPAttributes,
    selfClosing: ["source", "track", "br"],
    allowedClasses: allowedAMPClasses,
    transformTags: transformHtmlTags(),
  })?.replace(/!important/g, "")

  return { firstCleanHtml, secondCleanHtml }
}
export function transformHtmlTags():
  | { [tagName: string]: string | sanitizeHtml.Transformer }
  | undefined {
  return {
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
    img: function (_tagName, attribs) {
      return {
        tagName: "amp-img",
        attribs: {
          width: attribs?.width,
          height: attribs?.height,
          layout: "responsive",
          alt: attribs?.alt,
          src: attribs?.src,
        },
      }
    },
    iframe: function (_tagName, attribs) {
      const youtubeId = attribs.src.match(
        /^.*(youtu.be\/|youtube(-nocookie)?.com\/(v\/|.*u\/\w\/|embed\/|.*v=))([\w-]{11}).*/,
      )

      if (youtubeId) {
        attribs["data-videoid"] = youtubeId[4]
        delete attribs.src
        delete attribs.sandbox
        delete attribs.allowfullscreen
        delete attribs.allow
        delete attribs.frameborder

        return {
          tagName: "amp-youtube",
          attribs: {
            ...attribs,
            width: attribs?.width ?? 600,
            height: attribs?.height ?? 400,
            layout: "responsive",
          },
        }
      } else {
        attribs.sandbox = !attribs.sandbox
          ? "allow-scripts allow-same-origin"
          : attribs.sandbox

        if (attribs.hasOwnProperty("frameborder")) {
          attribs.frameborder = attribs.frameborder === "0" ? "0" : "1"
        }

        if (attribs.hasOwnProperty("scrolling")) {
          attribs.scrolling = attribs.scrolling === "0" ? "0" : "1"
        }

        if (attribs.hasOwnProperty("allowfullscreen")) {
          if (attribs.allowfullscreen === "false") {
            delete attribs.allowfullscreen
          } else {
            attribs.allowfullscreen = ""
          }
        }

        if (attribs.hasOwnProperty("allowtransparency")) {
          if (attribs.allowtransparency === "false") {
            delete attribs.allowtransparency
          } else {
            attribs.allowtransparency = ""
          }
        }

        if (!attribs.width || !attribs.height || !attribs.layout) {
          attribs.width = !attribs.width ? "600" : attribs.width
          attribs.height = !attribs.height ? "400" : attribs.height
        }

        return {
          tagName: "amp-iframe",
          attribs: attribs,
        }
      }
    },
  }
}

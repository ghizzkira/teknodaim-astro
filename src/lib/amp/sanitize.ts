export function santizeCharacter(item: string) {
  return item.replace(/"/g, "'")
}

export const allowedAMPTags = [
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

export const allowedAMPAttributes = {
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
export const allowedAMPClasses = {
  span: ["ctaText", "postTitle"],
  //... and other tags (used for sanitize-html)
}

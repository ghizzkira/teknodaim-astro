import type { WpCategoriesDataProps } from "@/lib/wp/action/wp-types"

export const splitUriWP = (uri: string, slug: string) => {
  let newString = uri
  const globalUri = new RegExp(
    `https://${import.meta.env.WP_EN_SUBDOMAIN}/`,
    "g",
  )
  if (
    newString.includes(
      `https://${import.meta.env.WP_EN_SUBDOMAIN}` ?? "en.teknodaim.com",
    )
  ) {
    newString = newString.replace(globalUri ?? "/", "/")
  }
  const regex = /^\/(\w+)(\/.*)$/
  const match: RegExpMatchArray | null = newString.match(regex)

  const newUri =
    match?.[1] && match[1].length > 0 ? `/${match[1]}/${slug}` : newString
  return newUri
}

export const splitUriMenuWP = (uri: string) => {
  let domainUrl
  if (uri.startsWith("http")) {
    domainUrl = new URL(uri)
    domainUrl = domainUrl.origin
  } else {
    domainUrl = ""
  }
  const fullUrl = uri.includes(domainUrl)
  let slicedUrl = uri
  if (fullUrl) {
    slicedUrl = uri.slice(domainUrl.length)
  }
  const pattern = /^(\/[^/]+\/)(.*)\/$/
  const matches = slicedUrl.match(pattern)

  if (matches && matches.length === 3) {
    const path2 = matches[2]

    if (path2) {
      return `/${path2}/`
    }
  }

  return slicedUrl
}

export function wpPrimaryCategorySlug(category: WpCategoriesDataProps[]) {
  const isPrimary = category?.find(({ parent }) => {
    return parent === null
  })
  let primaryCategory
  if (isPrimary) {
    primaryCategory = isPrimary
    return { primaryCategory }
  } else {
    primaryCategory = category[0]
    return { primaryCategory }
  }
}

export function wpAuthorPathBySlug(slug: string) {
  return `/author/${slug}`
}

export function wpCategoryPathBySlug(slug: string) {
  return `/category/${slug}`
}

export function wpTagPathBySlug(slug: string) {
  return `/tag/${slug}`
}

export function wpPostPathBySlug(slug: string) {
  return `/${slug}`
}

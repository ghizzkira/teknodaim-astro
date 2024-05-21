import type { LanguageType } from "@/lib/validation/language"

export function rewriteUrlLocale(locale: LanguageType, uri: string) {
  if (locale === "en") {
    try {
      const url = new URL(uri)
      if (url?.origin) {
        return `${url.origin}/${locale}${url.pathname}`
      } else {
        return `/${locale}${uri}`
      }
    } catch (error) {
      return `/${locale}${uri}`
    }
  } else {
    try {
      const url = new URL(uri)
      if (url?.origin) {
        return `${url.origin}/${url.pathname}`
      } else {
        return `${uri}`
      }
    } catch (error) {
      return `${uri}`
    }
  }
}

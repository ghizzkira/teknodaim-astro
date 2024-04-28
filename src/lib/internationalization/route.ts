import type { LanguageType } from "../validation/language"

export function rewriteUrlLocale(locale: LanguageType, uri: string) {
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
}

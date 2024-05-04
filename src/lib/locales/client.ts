import { defaultLang, translations } from "./translations"

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/")
  if (lang in translations) return lang as keyof typeof translations
  return defaultLang
}

export function useI18n(lang: keyof typeof translations) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key]
  }
}

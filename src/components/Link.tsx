import * as React from "react"

import { rewriteUrlLocale } from "@/lib/internationalization/route"
import type { LanguageType } from "@/lib/validation/language"

interface LinkProps extends React.HtmlHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  className?: string
  href: string
  locale: LanguageType
}

const Link = (props: LinkProps) => {
  const { children, className, href, locale, ...rest } = props
  return (
    <a {...rest} className={className} href={rewriteUrlLocale(locale, href)}>
      {children}
    </a>
  )
}
export default Link

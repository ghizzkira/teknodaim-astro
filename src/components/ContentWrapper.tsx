import ParseContent from "./ParseContent"
import { splitReactNodes } from "@/lib/utils/content"
import type { LanguageType } from "@/lib/validation/language"
import React from "react"

interface ContentWrapperProps {
  content: string
  locale: LanguageType
  title: string
}

const ContentWrapper = (props: ContentWrapperProps) => {
  const { content, locale, title } = props

  const parsedContent = ParseContent({
    htmlInput: content!,
    title: title!,
    locale: locale,
  })

  const { firstContent, secondContent } = splitReactNodes(
    React.Children.toArray(parsedContent),
  )
  return (
    <>
      {firstContent}
      {secondContent}
    </>
  )
}
export default ContentWrapper

import * as React from "react"

import type { LanguageType } from "@/lib/validation/language"
import ShareButtonArticle from "./share-button-article"

interface StaticShareProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  categorySlug: string
  postSlug: string
  locale: LanguageType
}

const StaticShare: React.FunctionComponent<StaticShareProps> = (props) => {
  const { title, categorySlug, postSlug, locale } = props
  return (
    <div className="grid w-full grid-flow-col grid-cols-4 grid-rows-1 gap-2">
      <ShareButtonArticle
        url={
          locale === "id"
            ? `${import.meta.env.NEXT_PUBLIC_SITE_URL}/${categorySlug}/${postSlug}`
            : `${import.meta.env.NEXT_PUBLIC_EN_SITE_URL}/${categorySlug}/${postSlug}`
        }
        text={title}
      />
    </div>
  )
}

export default StaticShare

import * as React from "react"

import type { LanguageType } from "@/lib/validation/language"
import ShareButtonArticle from "./share-button-article"

interface StickyShareProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  categorySlug: string
  postSlug: string
  locale: LanguageType
}

const StickyShare: React.FunctionComponent<StickyShareProps> = (props) => {
  const { title, categorySlug, postSlug, locale } = props
  return (
    <div className="shadow-xs fixed bottom-0 left-0 top-[unset] z-40 mx-0 mb-0 mr-2 flex h-fit w-full flex-row items-center justify-center bg-background lg:sticky lg:bottom-[unset] lg:left-[unset] lg:top-20 lg:w-auto lg:bg-transparent lg:px-2 lg:shadow-none lg:dark:bg-transparent">
      <div className="lg:justify-unset flex flex-row justify-evenly py-2 max-lg:w-full sm:max-[767px]:w-1/2 lg:mt-2 lg:w-auto lg:flex-col lg:py-0">
        <ShareButtonArticle
          url={
            locale === "id"
              ? `${import.meta.env.PUBLIC_SITE_URL}/${categorySlug}/${postSlug}`
              : `${import.meta.env.PUBLIC_EN_SITE_URL}/${categorySlug}/${postSlug}`
          }
          text={title}
        />
      </div>
    </div>
  )
}

export default StickyShare

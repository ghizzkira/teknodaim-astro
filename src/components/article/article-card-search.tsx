import * as React from "react"

import Image from "@/components/image"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { LanguageType } from "@/lib/validation/language"

type ArticleDataProps = Pick<ArticleProps, "title" | "slug"> & {
  featured_image: Pick<MediaProps, "url">
}

interface ArticleCardSearchProps {
  locale: LanguageType
  article: ArticleDataProps
}

const ArticleCardSearch: React.FunctionComponent<ArticleCardSearchProps> = (
  props,
) => {
  const { locale, article } = props

  const { title, slug, featured_image } = article

  return (
    <a
      aria-label={title}
      href={
        locale === "id"
          ? `${import.meta.env.PUBLIC_SITE_URL}/article/${slug}`
          : `${import.meta.env.PUBLIC_EN_SITE_URL}/article/${slug}`
      }
      className="mb-2 w-full"
    >
      <div className="flex flex-row hover:bg-accent">
        <div className="relative aspect-[1/1] h-[50px] w-auto max-w-[unset] overflow-hidden rounded-md">
          <Image
            src={featured_image.url}
            className="object-cover"
            alt={title}
            width={"50"}
            height={"50"}
          />
        </div>
        <div className="ml-2 w-3/4">
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
        </div>
      </div>
    </a>
  )
}

export default ArticleCardSearch

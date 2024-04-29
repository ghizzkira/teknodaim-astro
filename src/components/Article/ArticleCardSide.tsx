import * as React from "react"

import Image from "@/components/Image"
import Link from "@/components/Link"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { LanguageType } from "@/lib/validation/language"

interface ArticleCardSideProps {
  article: Pick<ArticleProps, "title" | "slug"> & {
    featured_image: Pick<MediaProps, "url">
  }
  locale: LanguageType
}

const ArticleCardSide: React.FunctionComponent<ArticleCardSideProps> = (
  props,
) => {
  const { article, locale } = props

  const { featured_image, slug, title } = article

  return (
    <Link
      locale={locale}
      role="link"
      aria-label={title}
      href={`/article/${slug}`}
    >
      <article className="mb-4 flex w-full border-separate flex-col rounded-lg">
        <div className="relative flex max-w-xs flex-col space-y-3 md:max-w-3xl md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative aspect-[1/1] h-[75px] w-auto">
            <Image
              className="max-w-[unset] overflow-hidden rounded-md object-cover object-center"
              src={featured_image.url}
              alt={`Image ${title}`}
              sizes="(max-width: 768px) 50px, 100px"
              width={"50"}
              height={"50"}
            />
          </div>

          <div className="flex w-full flex-col space-y-2 md:w-2/3">
            <h3 className="line-clamp-3 text-sm leading-5 hover:text-primary">
              {title}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ArticleCardSide

import * as React from "react"

import Image from "@/components/Image"
import Link from "@/components/Link"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { LanguageType } from "@/lib/validation/language"

export interface ArticleCardFeaturedProps {
  article: Pick<ArticleProps, "title" | "slug"> & {
    featured_image?: Pick<MediaProps, "url">
  }
  locale: LanguageType
}

const ArticleCardFeatured: React.FunctionComponent<ArticleCardFeaturedProps> = (
  props,
) => {
  const { article, locale } = props

  const { title, featured_image, slug } = article

  return (
    <>
      <article
        className="whitspace-normal relative h-full overflow-hidden rounded-xl"
        {...props}
      >
        <div className="h-full">
          <Link
            locale={locale}
            aria-label={title}
            className="after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:bg-gradient-to-t after:from-[#282828] after:to-transparent after:transition-all"
            href={`/article/${slug}`}
          >
            <div className="relative box-border aspect-[8/16] h-[300px] overflow-hidden md:aspect-[9/16]">
              <Image
                src={featured_image?.url!}
                className="object-cover"
                alt={title}
                width={"300"}
                height={"300"}
              />
            </div>
          </Link>
        </div>
        <div className="featured-meta absolute bottom-0 left-0 z-[7] w-full p-[20px] md:px-4 md:py-5 min-[992px]:p-[25px]">
          <Link locale={locale} aria-label={title} href={`/article/${slug}`}>
            <h3
              className={`line-clamp-4 text-xl font-bold leading-[1.3] text-background hover:text-primary`}
            >
              {title}
            </h3>
          </Link>
        </div>
      </article>
    </>
  )
}

export default ArticleCardFeatured

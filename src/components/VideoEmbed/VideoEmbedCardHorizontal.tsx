import * as React from "react"

import Image from "@/components/Image"
import type { LanguageType } from "@/lib/validation/language"
import Link from "@/components/Link"
import { formatDateFromNow } from "@/lib/utils/date"

interface VideoEmbedCardHorizontalProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  featuredImageUrl: string
  slug: string
  authorSlug: string
  authorName: string
  date: Date
  locale: LanguageType
}

const VideoEmbedCardHorizontal: React.FunctionComponent<
  VideoEmbedCardHorizontalProps
> = (props) => {
  const {
    title,
    featuredImageUrl,
    slug,
    authorSlug,
    authorName,
    date,
    locale,
  } = props

  return (
    <article className="group flex">
      <div className="flex w-full flex-col sm:flex-row">
        <Link
          locale={locale}
          aria-label={title}
          href={`/video/${slug}`}
          className="relative mr-2 block aspect-video h-auto w-full overflow-hidden sm:h-[90px] sm:w-[130px] sm:rounded-lg"
        >
          <Image
            alt={`Image ${title}`}
            src={featuredImageUrl}
            className="!h-full !w-full object-cover transition group-hover:grayscale-[50%]"
            width={"200"}
            height={"200"}
          />
        </Link>
        <div className="flex-1 p-4 sm:pt-0">
          <Link locale={locale} aria-label={title} href={`/video/${slug}`}>
            <h2 className="line-clamp-2 text-base font-bold leading-[20px] hover:text-primary">
              {title}
            </h2>
          </Link>
          <Link
            locale={locale}
            aria-label={authorName}
            className="mt-1 block"
            href={`/user/${authorSlug}`}
          >
            <span className="text-[rgb(96, 96, 96)] text-[14px] hover:text-main">
              {authorName}
            </span>
          </Link>
          <span className="text-[rgb(96, 96, 96)] hidden text-[14px] hover:text-main sm:block">
            {formatDateFromNow(date, locale)}
          </span>
        </div>
      </div>
    </article>
  )
}

export default VideoEmbedCardHorizontal

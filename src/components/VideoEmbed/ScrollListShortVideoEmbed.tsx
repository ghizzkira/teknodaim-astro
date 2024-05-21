import * as React from "react"

import ShortVideoEmbedCard from "./ShortVideoEmbedCard"
import type { LanguageType } from "@/lib/validation/language"
import type { SelectVideoEmbed, SelectUser, SelectMedia } from "@/lib/db/schema"

type VideoEmbeds = Pick<
  SelectVideoEmbed,
  "id" | "title" | "slug" | "featuredImageUrl"
> & {
  authors?: Pick<SelectUser, "name" | "username" | "image">[]
  featuredImage?: Pick<SelectMedia, "url" | "id">
}

interface ScrollListShortVideoEmbedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  locale: LanguageType
  shortVideos?: VideoEmbeds[]
}

const ScrollListShortVideoEmbed: React.FunctionComponent<
  ScrollListShortVideoEmbedProps
> = (props) => {
  const { shortVideos, locale } = props

  return (
    <div className="scrollbar-hide mb-4 flex min-w-full grid-cols-3 flex-row flex-nowrap gap-4 border-b border-border px-4 pb-2 max-md:overflow-x-auto sm:grid-cols-5 md:grid md:flex-wrap">
      {shortVideos?.map((video) => {
        const mainAuthor = video?.authors?.[0]
        return (
          <ShortVideoEmbedCard
            className="max-md:aspect-[9/16] max-md:h-[300px] max-md:w-auto"
            key={video.title ?? ""}
            title={video.title ?? ""}
            featuredImageUrl={
              video.featuredImageUrl ?? video.featuredImage?.url ?? ""
            }
            slug={video.slug ?? ""}
            authorName={mainAuthor?.name ?? ""}
            authorSlug={mainAuthor?.username ?? ""}
            authorImage={mainAuthor?.image ?? ""}
            locale={locale}
          />
        )
      })}
    </div>
  )
}

export default ScrollListShortVideoEmbed

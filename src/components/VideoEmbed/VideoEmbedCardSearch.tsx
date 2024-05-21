import * as React from "react"

import Image from "@/components/Image"
import type { LanguageType } from "@/lib/validation/language"
import type { SelectVideoEmbed } from "@/lib/db/schema"
import Link from "@/components/Link"

type VideoEmbedDataProps = Pick<
  SelectVideoEmbed,
  "title" | "slug" | "featuredImageUrl" | "type"
>

interface VideoEmbedCardSearchProps {
  locale: LanguageType
  videoEmbed: VideoEmbedDataProps
}

const VideoEmbedCardSearch: React.FunctionComponent<
  VideoEmbedCardSearchProps
> = (props) => {
  const { videoEmbed, locale } = props

  const { title, slug, featuredImageUrl, type } = videoEmbed
  const url =
    type === "youtube_short"
      ? `${import.meta.env.PUBLIC_SITE_URL}/video/short/${slug}`
      : `${import.meta.env.PUBLIC_SITE_URL}/video/${slug}`

  return (
    <Link locale={locale} aria-label={title} href={url} className="mb-2 w-full">
      <div className="flex flex-row hover:bg-accent">
        <div className="relative aspect-[1/1] h-[50px] w-auto max-w-[unset] overflow-hidden rounded-md">
          <Image
            src={featuredImageUrl ?? ""}
            className="!h-full !w-full object-cover"
            alt={title}
            width={"50"}
            height={"50"}
          />
        </div>
        <div className="ml-2 w-3/4">
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default VideoEmbedCardSearch

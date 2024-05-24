import type { LanguageType } from "@/lib/validation/language"
import * as React from "react"
import Link from "@/components/Link"
import Image from "@/components/Image"

interface VideoEmbedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  featuredImageUrl: string
  slug: string
  authorName?: string
  authorSlug?: string
  authorImage?: string
  locale: LanguageType
}

const VideoEmbedCard: React.FunctionComponent<VideoEmbedCardProps> = (
  props,
) => {
  const {
    title,
    featuredImageUrl,
    slug,
    authorName,
    authorSlug,
    authorImage,
    locale,
  } = props

  return (
    <>
      <article className="group">
        <div className="w-full">
          <Link
            aria-label={title}
            href={`/video/${slug}`}
            className="relative block aspect-video h-auto w-full overflow-hidden sm:rounded-lg"
            locale={locale}
          >
            <Image
              alt={`Image ${title}`}
              src={featuredImageUrl}
              className="!h-full !w-full object-cover transition"
              width="500"
              height="500"
            />
          </Link>
          <div className="flex gap-2 p-2">
            {authorImage && authorSlug && authorSlug && (
              <Link
                locale={locale}
                aria-label={title}
                href={`/user/${authorSlug}`}
                className="relative block h-[36px] w-[36px] overflow-hidden rounded-full"
              >
                <Image
                  src={authorImage}
                  alt={authorName!}
                  width={"36"}
                  height={"36"}
                />
              </Link>
            )}
            <div className="flex-1">
              <Link locale={locale} aria-label={title} href={`/video/${slug}`}>
                <h3 className="line-clamp-4 text-base font-bold leading-[20px] hover:text-primary">
                  {title}
                </h3>
              </Link>
              {authorSlug && authorSlug && (
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
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default VideoEmbedCard

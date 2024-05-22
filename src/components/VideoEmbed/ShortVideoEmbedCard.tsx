import * as React from "react"

import Image from "@/components/Image"
import { cn } from "@/lib/utils/style"
import Link from "@/components/Link"
import type { LanguageType } from "@/lib/validation/language"

interface ShortVideoEmbedCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  featuredImageUrl: string
  slug: string
  authorName: string
  authorSlug: string
  authorImage: string
  className?: string
  locale: LanguageType
}

const ShortVideoEmbedCard: React.FunctionComponent<ShortVideoEmbedCardProps> = (
  props,
) => {
  const { title, featuredImageUrl, slug, className, locale } = props
  return (
    <>
      <article className={cn("group", className)}>
        <div className="w-full">
          <Link
            locale={locale}
            aria-label={title}
            href={`/video/short/${slug}`}
            className="relative block aspect-[9/16] h-auto w-full overflow-hidden rounded-lg"
          >
            <Image
              alt={`Image ${title}`}
              src={featuredImageUrl}
              className="!h-full !w-full object-cover transition group-hover:grayscale-[50%]"
              width={"500"}
              height={"500"}
            />
            <div className="absolute bottom-0 flex gap-2 p-4">
              <Link
                role="link"
                aria-label={title}
                href={`/video/short/${slug}`}
                locale={locale}
              >
                <h3 className="line-clamp-4 text-base font-bold leading-[20px] text-white hover:text-primary">
                  {title}
                </h3>
              </Link>
            </div>
          </Link>
        </div>
      </article>
    </>
  )
}

export default ShortVideoEmbedCard

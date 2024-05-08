import * as React from "react"

import BadgeIcon from "@/components/BadgeIcon"
import Image from "@/components/Image"
import Link from "@/components/Link"
import { Icon } from "@/components/UI/Icon"
import "@/lib/internationalization/route"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"

import BadgeIcon from "@/components/BadgeIcon"
import Image from "@/components/Image"
import Link from "@/components/Link"
import { Icon } from "@/components/UI/Icon"
import "@/lib/internationalization/route"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"

interface WpPostCardFeaturedProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  post: {
    title: string
    slug: string
    publishedTime: Date | string
    thumbnail: string
    primaryCategory: string
    primaryCategorySlug: string
    authorName: string
    authorSlug: string
    authorImage: string
  }
  locale: LanguageType
}

const WpPostCardFeatured: React.FunctionComponent<WpPostCardFeaturedProps> = (
  props,
) => {
  const { post, index, locale } = props

  const {
    title,
    slug,
    publishedTime,
    thumbnail,
    primaryCategory,
    primaryCategorySlug,
    authorName,
    authorSlug,
    authorImage,
  } = post
  const stylesIcons = `absolute z-[5] right-[15px] top-[10px] md:top-[-10px] h-[32px] w-[32px] md:h-[44px] md:w-[44px] rounded-full p-1.5 md:p-3 text-[26px] leading-[32px] md:leading-[44px]`

  return (
    <article className="whitspace-normal group relative h-full w-full">
      <BadgeIcon
        name={primaryCategory as never as string}
        slug={primaryCategorySlug as never as string}
        className={stylesIcons}
        locale={locale}
      />
      <div className="h-full w-full overflow-hidden rounded-xl">
        <Link
          locale={locale}
          role="link"
          aria-label={title}
          className="transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:bg-gradient-to-t after:from-[#2828289c] after:to-transparent after:transition-all after:group-hover:from-[#282828e0]"
          href={`/${primaryCategorySlug}/${slug}`}
        >
          <div className="relative box-border h-full w-full">
            <Image
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
              src={thumbnail}
              className="!h-full !w-full overflow-hidden object-cover transition-all duration-300 group-hover:scale-125"
              alt={title}
              width={"300"}
              height={"300"}
            />
          </div>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 z-[7] max-h-[100%] w-full p-[20px] transition-all duration-300 md:px-4 md:py-5 min-[992px]:p-[30px]">
        <Link
          locale={locale}
          role="link"
          aria-label={title}
          href={`/${primaryCategorySlug}/${slug}`}
        >
          <h3
            className={`${
              index && index <= 1
                ? "line-clamp-4 translate-y-6"
                : "line-clamp-3 translate-y-6"
            } hover:text-white-900 font-bold leading-[1.2] text-white transition-all duration-300 group-hover:translate-y-0 ${
              index && index <= 1
                ? "text-[25px] lg:text-[30px] lg:leading-8"
                : "text-[20px] lg:text-[22px] lg:leading-6"
            }`}
          >
            {title}
          </h3>
        </Link>
        <div
          className={`flex translate-y-6 flex-row items-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100`}
        >
          {authorName && (
            <>
              <div className="mt-1 flex flex-row items-center">
                {authorImage && (
                  <div className="relative h-[20px] w-[20px]">
                    <img
                      src={authorImage}
                      className="!h-[20px] !w-[20px] overflow-hidden rounded-full object-cover"
                      alt={authorName}
                      sizes="(max-width: 768px) 20px, 50px"
                    />
                  </div>
                )}
                <Link
                  locale={locale}
                  role="link"
                  aria-label={authorName}
                  href={`/author/${authorSlug}`}
                >
                  <h4 className="ml-2 line-clamp-1 text-[10px] text-white md:text-[12px]">
                    {authorName}
                  </h4>
                </Link>
              </div>
            </>
          )}
          {index === 1 && publishedTime && (
            <>
              <Icon.AccessTime
                aria-label="Date"
                className="ml-2 h-3 w-3 text-white"
              />
              <time
                className="pl-0.5 text-[10px] text-white md:text-xs"
                dateTime={publishedTime as unknown as string}
                suppressHydrationWarning={true}
              >
                {formatDateFromNow(publishedTime, locale)}
              </time>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default WpPostCardFeatured

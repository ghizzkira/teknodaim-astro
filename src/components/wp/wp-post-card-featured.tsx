import * as React from "react"

import { Icon } from "@/components/ui/icon"
import BadgeIcon from "../badge-icon"

interface WpPostCardFeaturedProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  post: {
    title: string
    slug: string
    published_time: Date | string
    thumbnail: string
    primary_category: string
    primary_category_slug: string
    author_name: string
    author_slug: string
    author_image: string
  }
  locale: string
}

const WpPostCardFeatured: React.FunctionComponent<WpPostCardFeaturedProps> = (
  props,
) => {
  const { post, index, locale } = props

  const {
    title,
    slug,
    published_time,
    thumbnail,
    primary_category,
    primary_category_slug,
    author_name,
    author_slug,
    author_image,
  } = post
  const stylesIcons = `absolute z-[5] right-[15px] top-[10px] md:top-[-10px] h-[32px] w-[32px] md:h-[44px] md:w-[44px] rounded-full p-1.5 md:p-3 text-[26px] leading-[32px] md:leading-[44px]`

  return (
    <article className="whitspace-normal group relative h-full w-full">
      <BadgeIcon
        name={primary_category as never as string}
        slug={primary_category_slug as never as string}
        className={stylesIcons}
      />
      <div className="h-full w-full overflow-hidden rounded-xl">
        <a
          role="link"
          aria-label={title}
          className="transition-all duration-300 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-xl after:bg-gradient-to-t after:from-[#2828289c] after:to-transparent after:transition-all after:group-hover:from-[#282828e0]"
          href={`/${primary_category_slug}/${slug}`}
        >
          <div className="relative box-border h-full w-full">
            <img
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
              src={thumbnail}
              className="overflow-hidden object-cover transition-all duration-300 group-hover:scale-125"
              alt={title}
            />
          </div>
        </a>
      </div>
      <div className="absolute bottom-0 left-0 z-[7] max-h-[100%] w-full p-[20px] transition-all duration-300 md:px-4 md:py-5 min-[992px]:p-[30px]">
        <a
          role="link"
          aria-label={title}
          href={`/${primary_category_slug}/${slug}`}
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
        </a>
        <div
          className={`flex translate-y-6 flex-row items-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100`}
        >
          {author_name && (
            <>
              <div className="mt-1 flex flex-row items-center">
                {author_image && (
                  <div className="relative h-[20px] w-[20px]">
                    <img
                      src={author_image}
                      className="overflow-hidden rounded-full object-cover"
                      alt={author_name}
                      sizes="(max-width: 768px) 20px, 50px"
                    />
                  </div>
                )}
                <a
                  role="link"
                  aria-label={author_name}
                  href={`/author/${author_slug}`}
                >
                  <h4 className="ml-2 line-clamp-1 text-[10px] text-white md:text-[12px]">
                    {author_name}
                  </h4>
                </a>
              </div>
            </>
          )}
          {index === 1 && published_time && (
            <>
              <Icon.AccessTime
                aria-label="Date"
                className="ml-2 h-3 w-3 text-white"
              />
              <time
                className="pl-0.5 text-[10px] text-white md:text-xs"
                dateTime={published_time as unknown as string}
                suppressHydrationWarning={true}
              >
                {published_time as unknown as string}
              </time>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export default WpPostCardFeatured

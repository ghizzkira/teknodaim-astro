import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"
import BadgeIcon from "../badge-icon"
import Image from "../image"
import WpPostView from "./wp-post-view"

// const DateWrapper = dynamic(
//   async () => {
//     const DateWrapper = await import("@/components/date-wrapper")
//     return DateWrapper.default
//   },
//   {
//     ssr: false,
//     loading: () => (
//       <span className="inline-block h-4 w-8 animate-pulse rounded-md bg-muted" />
//     ),
//   },
// )

interface WpPostCardProps {
  src: string
  alt: string
  slug: string
  excerpt: string
  uri: string
  title: string
  authorName: string
  authorUri: string
  authorAvatarUrl: string
  date: string
  categoryName: string
  locale: LanguageType
  type?: "horizontal" | "vertical"
  categoryUri: string
  srcSet?: string
}

const WpPostCard: React.FunctionComponent<WpPostCardProps> = React.memo(
  (props) => {
    const {
      src,
      alt,
      uri,
      slug,
      excerpt,
      title,
      authorName,
      authorUri,
      authorAvatarUrl,
      date,
      locale,
      categoryName,
      categoryUri,
      type = "horizontal",
      srcSet,
    } = props

    const stylesIcons = `md:right-unset absolute right-[5px] top-[5px] z-[5] h-[32px] w-[32px] rounded-full p-1.5 text-[13px] leading-[32px] md:left-[-10px] md:top-[-10px] md:h-[44px] md:w-[44px] md:p-3 md:text-[26px] md:leading-[44px]`

    if (type === "vertical") {
      return (
        <article className="mb-[40px] flex grow border-separate flex-row rounded-lg">
          <div className=""></div>
          <div className="relative flex w-full flex-col">
            <div className="w-full">
              <div className="relative aspect-[16/9] h-auto w-full">
                <a
                  role="link"
                  href={uri}
                  aria-label={`Go To ${title} Page`}
                  className="relative block h-full w-full"
                >
                  <Image
                    sizes="(max-width: 768px) 80vw, 60vw"
                    src={src}
                    alt={`Image ${alt}`}
                    className="!h-full !w-full overflow-hidden rounded-lg object-cover"
                    width={"500"}
                    height={"500"}
                  />
                </a>
                <BadgeIcon
                  name={categoryName}
                  slug={categoryUri}
                  className={stylesIcons}
                />
                <a
                  role="link"
                  aria-label={categoryName}
                  className="absolute bottom-0 left-0 block bg-main px-1 py-0.5 text-white"
                  href={categoryUri}
                >
                  {categoryName}
                </a>
              </div>
            </div>
            <div className="mt-[15px] flex flex-col">
              <a role="link" aria-label={`Go To ${title} Page`} href={uri}>
                <h2 className="line-clamp-3 text-[25px] font-bold leading-[1.35] hover:text-primary md:text-[1.55em] md:leading-8">
                  {title}
                </h2>
              </a>
              <div className="flex-column mt-2.5 flex">
                <div className="flex flex-row items-center">
                  {authorName && (
                    <>
                      <div className="hidden flex-row items-center md:flex">
                        {authorAvatarUrl && (
                          <div className="relative h-[20px] w-[20px]">
                            <img
                              src={authorAvatarUrl}
                              className="overflow-hidden rounded-full object-cover"
                              alt={authorName}
                              sizes="(max-width: 768px) 20px, 50px"
                            />
                          </div>
                        )}
                        <a role="link" aria-label={authorName} href={authorUri}>
                          <h3 className="ml-2 text-[12px]">{authorName}</h3>
                        </a>
                      </div>
                    </>
                  )}
                  {date && (
                    <div className="flex items-center">
                      <Icon.AccessTime
                        aria-label="Date"
                        className="h-3 w-3 text-foreground/80 md:ml-2"
                      />
                      <time
                        className="pl-[5px] text-xs text-foreground/80"
                        dateTime={date}
                        suppressHydrationWarning={true}
                      >
                        {formatDateFromNow(date, locale)}
                      </time>
                    </div>
                  )}
                  <WpPostView
                    className="ml-2 flex items-center"
                    post_slug={slug}
                  />
                </div>
              </div>
              <div
                className="text-muted-900 mb-[30px] hidden text-[15px] md:my-2.5 md:line-clamp-4"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </div>
          </div>
        </article>
      )
    }

    return (
      <article className="mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col">
        <div className="relative flex w-full flex-row justify-between lg:justify-start">
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/3] h-auto w-[125px] md:w-[220px] lg:w-[270px]">
              <a
                href={uri}
                role="link"
                aria-label={`Go To ${title} Page`}
                className="relative block h-full w-full"
              >
                <Image
                  src={src}
                  alt={`Image ${alt}`}
                  className="!h-full !w-full overflow-hidden rounded-lg object-cover"
                  width={"500"}
                  height={"500"}
                />
              </a>
              <BadgeIcon
                name={categoryName}
                slug={categoryUri}
                className={stylesIcons}
              />
            </div>
          </div>
          <div className="order-1 mr-3 flex flex-col md:order-2 md:ml-[30px] md:mr-[unset]">
            <div className="hidden md:block">
              <a
                role="link"
                aria-label={categoryName}
                href={categoryUri}
                className="text-[12px] font-bold text-main"
              >
                {categoryName}
              </a>
            </div>
            <a role="link" aria-label={title} href={uri}>
              <h2 className="line-clamp-4 text-[18px] font-bold leading-[20px] hover:text-primary md:text-xl md:leading-[27px] lg:text-2xl">
                {title}
              </h2>
              <div
                className="text-muted-900 hidden text-[15px] md:my-2.5 md:line-clamp-2 lg:line-clamp-4"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </a>
            <div className="flex flex-row items-center  max-md:mt-[10px]">
              {authorName && (
                <>
                  <div className="hidden flex-row items-center md:flex">
                    {authorAvatarUrl && (
                      <div className="relative h-[20px] w-[20px]">
                        <img
                          src={authorAvatarUrl}
                          className="overflow-hidden rounded-full object-cover"
                          alt={authorName}
                          sizes="(max-width: 768px) 20px, 50px"
                        />
                      </div>
                    )}
                    <a role="link" aria-label={authorName} href={authorUri}>
                      <h3 className="ml-2 text-[12px]">{authorName}</h3>
                    </a>
                  </div>
                </>
              )}
              {date && (
                <div className="flex items-center md:ml-2">
                  <Icon.AccessTime
                    aria-label="Date"
                    className="h-3 w-3 text-foreground/80"
                  />
                  <time
                    className="pl-[5px] text-xs text-foreground/80"
                    dateTime={date}
                    suppressHydrationWarning={true}
                  >
                    {formatDateFromNow(date, locale)}
                  </time>
                </div>
              )}
              <WpPostView className="ml-2 flex items-center" post_slug={slug} />
            </div>
          </div>
        </div>
      </article>
    )
  },
)

export default WpPostCard

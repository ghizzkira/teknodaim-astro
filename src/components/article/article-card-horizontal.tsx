import * as React from "react"

import BadgeIcon from "@/components/badge-icon"
import Image from "@/components/image"
import { Icon } from "@/components/ui/icon"
import { Skeleton } from "@/components/ui/skeleton"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"
import { type SelectTopic as TopicProps } from "@/lib/db/schema/topic"
import { type SelectUser as UserProps } from "@/lib/db/schema/user"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"

export interface ArticleCardHorizontalProps {
  article: Pick<ArticleProps, "title" | "slug" | "excerpt" | "createdAt"> & {
    featured_image: Pick<MediaProps, "url">
  } & {
    topics: Pick<TopicProps, "title" | "slug">[]
  } & {
    authors: Pick<UserProps, "name" | "image" | "username">[]
  }
  locale: LanguageType
}

const ArticleCardHorizontal: React.FunctionComponent<
  ArticleCardHorizontalProps
> = (props) => {
  const { article, locale } = props

  const { featured_image, slug, excerpt, title, createdAt, topics, authors } =
    article

  const stylesIcons =
    "absolute z-[5] right-[5px] top-[5px] md:right-unset md:left-[-10px] md:top-[-10px] md:h-[44px] md:w-[44px] rounded-full p-1.5 md:p-3 text-[13px] md:text-[26px] w-[32px] h-[32px] leading-[32px] md:leading-[44px]"

  const mainAuthor = authors[0]

  return (
    <article className="mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col">
      <div className="relative flex w-full flex-row justify-between lg:justify-start">
        <div className="order-2 md:order-1">
          <div className="relative aspect-[4/3] h-auto w-[125px] md:w-[220px] lg:w-[270px]">
            <a
              role="link"
              href={`/article/${slug}`}
              aria-label={title}
              className="relative block h-full w-full"
            >
              <Image
                src={featured_image.url}
                alt={`Image ${title}`}
                className="overflow-hidden rounded-lg object-cover"
              />
            </a>
            <BadgeIcon
              name={topics[0]?.title!}
              slug={topics[0]?.slug!}
              className={stylesIcons}
            />
          </div>
        </div>
        <div className="order-1 mr-3 flex flex-col md:order-2 md:ml-[30px] md:mr-[unset]">
          <div className="hidden md:block">
            <a
              role="link"
              aria-label={topics[0]?.title}
              href={`/topic/${topics[0]?.slug ?? ""}`}
              className="text-[12px] font-bold text-main"
            >
              {topics[0]?.title}
            </a>
          </div>
          <a aria-label={title} role="link" href={`/article/${slug}`}>
            <h2 className="line-clamp-4 text-[18px] font-bold leading-[20px] hover:text-primary md:text-xl md:leading-[27px]">
              {title}
            </h2>
            <div
              className="text-muted-900 hidden text-[15px] md:my-2.5 md:line-clamp-2 lg:line-clamp-4"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </a>
          <div className="flex-column flex">
            <div className="flex flex-row items-center">
              {mainAuthor && (
                <>
                  <div className="hidden flex-row items-center md:flex">
                    {mainAuthor.image && (
                      <div className="relative h-[20px] w-[20px]">
                        <Image
                          src={mainAuthor.image}
                          className="overflow-hidden rounded-full object-cover"
                          alt={mainAuthor.name ?? title}
                          sizes="(max-width: 768px) 20px, 50px"
                        />
                      </div>
                    )}
                    <a
                      role="link"
                      aria-label={mainAuthor?.name ?? ""}
                      href={`/user/${mainAuthor.username}`}
                    >
                      <h3 className="ml-2 text-[12px]">{mainAuthor.name}</h3>
                    </a>
                  </div>
                </>
              )}
              <Icon.AccessTime
                aria-label="Date"
                className="h-3 w-3 text-foreground/80 md:ml-2"
              />
              {createdAt && (
                <time
                  className="pl-0.5 text-xs text-foreground/80"
                  dateTime={createdAt as unknown as string}
                  suppressHydrationWarning={true}
                >
                  {formatDateFromNow(createdAt, locale)}
                </time>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArticleCardHorizontal

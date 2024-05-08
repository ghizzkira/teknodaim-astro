import * as React from "react"

import BadgeIcon from "@/components/BadgeIcon"
import Image from "@/components/Image"
import Link from "@/components/Link"
import { Icon } from "@/components/UI/Icon"
import type { SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import type { SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { SelectTopic as TopicsProps } from "@/lib/db/schema/topic"
import type { SelectUser as UserProps } from "@/lib/db/schema/user"
import { formatDateFromNow } from "@/lib/utils/date"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"

import BadgeIcon from "@/components/BadgeIcon"
import Image from "@/components/Image"
import Link from "@/components/Link"
import { Icon } from "@/components/UI/Icon"
import type { SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import type { SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { SelectTopic as TopicsProps } from "@/lib/db/schema/topic"
import type { SelectUser as UserProps } from "@/lib/db/schema/user"
import { formatDateFromNow } from "@/lib/utils/date"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"

interface ArticleCardVerticalProps {
  article: Pick<ArticleProps, "slug" | "title" | "createdAt" | "excerpt"> & {
    featured_image?: Pick<MediaProps, "url">
  } & {
    topics: Pick<TopicsProps, "title" | "slug">[]
  } & {
    authors: Pick<UserProps, "name" | "image" | "username">[]
  }
  locale: LanguageType
}

const ArticleCardVertical: React.FunctionComponent<ArticleCardVerticalProps> = (
  props,
) => {
  const { article, locale } = props

  const { featured_image, slug, title, createdAt, excerpt, topics, authors } =
    article

  const mainAuthor = authors[0]

  const stylesIcons = `absolute right-[5px] top-[5px] md:right-unset z-[5] md:left-[-10px] md:top-[-10px] md:h-[44px] md:w-[44px] rounded-full p-1.5 md:p-3 text-[13px] md:text-[26px] w-[32px] h-[32px] leading-[32px] md:leading-[44px]`

  return (
    <article className="mb-[40px] flex grow border-separate flex-row rounded-lg">
      <div className="relative flex w-full flex-col">
        <div className="w-full">
          <div className="relative aspect-[16/9] h-auto w-full">
            <Link
              locale={locale}
              href={`/article/${slug}`}
              role="link"
              aria-label={title}
              className="relative block h-full w-full"
            >
              <Image
                src={featured_image?.url!}
                sizes="(max-width: 768px) 80vw, 60vw"
                alt={`Image ${title}`}
                className="overflow-hidden rounded-lg object-cover"
                width={"300"}
                height={"300"}
              />
            </Link>
            <BadgeIcon
              name={topics[0]?.title!}
              slug={topics[0]?.slug!}
              className={stylesIcons}
              locale={locale}
            />
            <Link
              locale={locale}
              role="link"
              aria-label={topics[0]?.title}
              className={cn(
                "absolute bottom-0 left-0 block bg-main px-1 py-0.5 text-white",
              )}
              href={`/topic/${topics[0]?.slug}`}
            >
              {topics[0]?.title}
            </Link>
          </div>
        </div>
        <div className="mt-[15px] flex flex-col">
          <Link
            locale={locale}
            aria-label={title}
            role="link"
            href={`/article/${slug}`}
          >
            <h2 className="line-clamp-3 text-[20px] font-bold leading-[1.35] hover:text-primary md:text-[1.55em] md:leading-7">
              {title}
            </h2>
          </Link>
          <div className="flex-column mt-2.5 flex">
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
                          width={"300"}
                          height={"300"}
                        />
                      </div>
                    )}
                    <Link
                      locale={locale}
                      role="link"
                      aria-label={mainAuthor.name ?? undefined}
                      href={`/user/${mainAuthor.username as unknown as string}`}
                    >
                      <h3 className="ml-2 text-[12px]">{mainAuthor.name}</h3>
                    </Link>
                  </div>
                </>
              )}
              <Icon.AccessTime
                aria-label="Date"
                className="text-foreground-800 h-3 w-3 md:ml-2"
              />
              {createdAt && (
                <time
                  className="text-foreground-800 pl-0.5 text-xs"
                  dateTime={createdAt as unknown as string}
                  suppressHydrationWarning={true}
                >
                  {formatDateFromNow(createdAt, locale)}
                </time>
              )}
            </div>
          </div>
          <div
            className="text-muted-900 mb-[30px] hidden text-[19px] md:my-2.5 md:line-clamp-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>
    </article>
  )
}

export default ArticleCardVertical

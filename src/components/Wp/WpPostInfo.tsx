import * as React from "react"

import { rewriteUrlLocale } from "@/lib/internationalization/route"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"
import { wpAuthorPathBySlug } from "@/lib/wp/helper"

interface WpPostInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string
  authorAvatarUrl: string
  authorSlug: string
  date: string
  locale: LanguageType
}

const WpPostInfo: React.FunctionComponent<WpPostInfoProps> = (props) => {
  const { authorName, authorAvatarUrl, authorSlug, locale, date } = props

  return (
    <div className="flex-column flex">
      <div className="my-2 flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          {authorAvatarUrl && (
            <div className="relative mr-[15px] h-[40px] w-[40px]">
              <img
                src={authorAvatarUrl}
                className="overflow-hidden rounded-full"
                alt={authorName}
                sizes="(max-width: 768px) 50px, 50px"
              />
            </div>
          )}
          <div className="flex flex-col">
            <a
              aria-label={authorName}
              href={rewriteUrlLocale(locale, wpAuthorPathBySlug(authorSlug))}
            >
              <h2 className="text-base text-primary">{authorName}</h2>
            </a>
            {date && (
              <div>
                <time
                  className="text-foreground-700 text-[14p]"
                  dateTime={date}
                  suppressHydrationWarning={true}
                >
                  {formatDateFromNow(date, locale)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WpPostInfo

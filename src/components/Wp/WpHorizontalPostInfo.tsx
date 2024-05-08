import * as React from "react"

import Link from "@/components/Link"
import type { LanguageType } from "@/lib/validation/language"
import { wpAuthorPathBySlug } from "@/lib/wp/helper"

import Link from "@/components/Link"
import type { LanguageType } from "@/lib/validation/language"
import { wpAuthorPathBySlug } from "@/lib/wp/helper"

interface WpHorizontalPostInfoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string

  authorSlug: string
  date: string
  locale: LanguageType
}

const WpHorizontalPostInfo: React.FunctionComponent<
  WpHorizontalPostInfoProps
> = (props) => {
  const { authorName, authorSlug, date, locale } = props

  return (
    <div className="flex-column flex">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          <Link
            locale={locale}
            className="mr-2"
            aria-label={authorName}
            href={wpAuthorPathBySlug(authorSlug)}
          >
            <h4 className="text-base text-primary">{authorName}</h4>
          </Link>
          <div className="flex flex-col">
            {date && (
              <div className="text-foreground/80 before:mr-2 before:content-['-']">
                <time
                  className="text-xs"
                  dateTime={date}
                  suppressHydrationWarning={true}
                >
                  {date}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WpHorizontalPostInfo

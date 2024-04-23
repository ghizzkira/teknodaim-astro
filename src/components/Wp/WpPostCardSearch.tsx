import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { formatDate } from "@/lib/utils/date"

interface WpPostCardSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  url: string
  imgUrl: string
  categorySlug: string
  categoryName: string
  date: string
}

const WpPostCardSearch: React.FunctionComponent<WpPostCardSearchProps> = (
  props,
) => {
  const { title, url, imgUrl, categorySlug, categoryName, date } = props

  return (
    <div className="w-full">
      <div className="flex flex-row">
        <a
          aria-label={title}
          href={url}
          className="relative block aspect-[1/1] h-[80px] w-auto max-w-[unset] overflow-hidden rounded-md"
        >
          <img
            src={imgUrl}
            className="!h-[80px] !w-auto object-cover"
            alt={title}
          />
        </a>
        <div className="ml-2 w-3/4">
          <div className="hidden md:block">
            <a
              aria-label={categoryName}
              href={`/${categorySlug}`}
              className="text-[12px] font-bold text-main"
            >
              {categoryName}
            </a>
          </div>
          <a aria-label={title} href={url}>
            <h3 className="mb-2 text-lg font-medium leading-[1.2] hover:text-main">
              {title}
            </h3>
          </a>
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
                {formatDate(date, "LL")}
              </time>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WpPostCardSearch

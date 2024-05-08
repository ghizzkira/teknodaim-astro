import * as React from "react"

import Link from "./Link"
import Image from "@/components/Image"
import { Icon } from "@/components/UI/Icon"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"

import Link from "./Link"
import Image from "@/components/Image"
import { Icon } from "@/components/UI/Icon"
import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"

interface PostInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string
  authorAvatarUrl: string
  authorSlug: string
  date: string
  locale: LanguageType
}

const PostInfo: React.FunctionComponent<PostInfoProps> = (props) => {
  const { authorName, authorAvatarUrl, authorSlug, locale, date } = props

  return (
    <div className="flex-column flex">
      <div className="my-2 flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          {authorAvatarUrl && (
            <Link
              locale={locale}
              aria-label={authorName}
              href={`/video/author/${authorSlug}`}
              className="relative block h-[40px] w-[40px] "
            >
              <Image
                src={authorAvatarUrl}
                className="overflow-hidden rounded-full"
                alt={authorName}
                sizes="(max-width: 768px) 50px, 50px"
                width={"40"}
                height={"40"}
              />
            </Link>
          )}
          <div className="ml-[5px] flex flex-col">
            <Link
              locale={locale}
              aria-label={authorName}
              href={`/video/author/${authorSlug}`}
            >
              <h2 className="ml-2 !text-base">{authorName}</h2>
            </Link>
            {date && (
              <div>
                <Icon.AccessTime
                  aria-label="Date"
                  className="inline-block h-3 w-3 text-foreground/70"
                />
                <time
                  className="ml-[6px] text-xs text-foreground/70"
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

export default PostInfo

import * as React from "react"
import type { SelectTopic as TopicProps } from "@/lib/db/schema"

import Link from "@/components/Link"
import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"

interface DownloadDropdownTopicsProps {
  title: string
  topics: Partial<TopicProps>[] | null
  locale: LanguageType
}

const DownloadDropdownTopics: React.FunctionComponent<
  DownloadDropdownTopicsProps
> = (props) => {
  const { topics, title, locale } = props

  return (
    <details className="popover relative inline-block text-left">
      <summary className="cursor-pointer list-none" role="button">
        <span
          aria-label="Open Dropdown menu"
          className="inline-flex w-full justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/10 focus:outline-none focus:ring"
        >
          <span className="mr-2">{title}</span>
          <Icon.KeyboardArrowDown aria-label="Show List" className="h-6 w-6" />
        </span>
      </summary>

      <div className="absolute right-0 z-[2] mt-2 w-[auto] origin-bottom rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="py-1">
          {topics?.map((topic) => (
            <Link
              locale={locale}
              key={topic.id}
              aria-label={topic.title}
              href={`/download/topic/${topic.slug}`}
              className="block px-4 py-2 hover:bg-muted/10"
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </div>
    </details>
  )
}

export default DownloadDropdownTopics

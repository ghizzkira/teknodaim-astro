import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"
import Link from "./Link"

interface BadgeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  slug: string
  locale: LanguageType
}

const BadgeIcon: React.FunctionComponent<BadgeIconProps> = (props) => {
  const { name, slug, className, locale } = props

  switch (name) {
    case "Tips":
      return (
        <div className="group">
          <Link aria-label="Tips" className="block" href={slug} locale={locale}>
            <div
              className={`bg-tips text-tips-foreground transition-transform hover:-translate-y-[5px] ${className}`}
            >
              <Icon.Coffe
                aria-label="Tips"
                className="h-full w-full text-inherit"
              />
            </div>
          </Link>
        </div>
      )
    case "Berita":
      return (
        <div className="group">
          <Link locale={locale} aria-label="News" className="block" href={slug}>
            <span
              className={`bg-news text-news-foreground transition-transform hover:-translate-y-[5px] ${className}`}
            >
              <Icon.News
                aria-label="News"
                className="h-full w-full text-inherit"
              />
            </span>
          </Link>
        </div>
      )
    case "Game":
      return (
        <div className="group">
          <Link locale={locale} aria-label="Game" className="block" href={slug}>
            <span
              className={`bg-game text-game-foreground transition-transform hover:-translate-y-[5px] ${className}`}
            >
              <Icon.Game
                aria-label="Game"
                className="h-full w-full text-inherit"
              />
            </span>
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default BadgeIcon

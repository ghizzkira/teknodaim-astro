import * as React from "react"

import { Icon } from "@/components/ui/icon"

interface BadgeIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  slug: string
}

const BadgeIcon: React.FunctionComponent<BadgeIconProps> = (props) => {
  const { name, slug, className } = props

  switch (name) {
    case "Tips":
      return (
        <div className="group">
          <a aria-label="Tips" className="block" href={slug}>
            <div
              className={`bg-tips text-tips-foreground transition-transform hover:-translate-y-[5px] ${className}`}
            >
              <Icon.Coffe
                aria-label="Tips"
                className="h-full w-full text-inherit"
              />
            </div>
          </a>
        </div>
      )
    case "Berita":
      return (
        <div className="group">
          <a aria-label="News" className="block" href={slug}>
            <span
              className={`bg-news text-news-foreground transition-transform hover:-translate-y-[5px] ${className}`}
            >
              <Icon.News
                aria-label="News"
                className="h-full w-full text-inherit"
              />
            </span>
          </a>
        </div>
      )
    case "Game":
      return (
        <div className="group">
          <a aria-label="Game" className="block" href={slug}>
            <span
              className={`bg-game text-game-foreground transition-transform hover:-translate-y-[5px] ${className}`}
            >
              <Icon.Game
                aria-label="Game"
                className="h-full w-full text-inherit"
              />
            </span>
          </a>
        </div>
      )
    default:
      return null
  }
}

export default BadgeIcon

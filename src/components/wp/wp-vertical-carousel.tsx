import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import { splitUriWP } from "@/lib/wp/helper"

interface WpVerticalCarouselProps {
  articles: WpSinglePostDataProps[]
  filteredQueries?: string[]
}

const WpVerticalCarousel: React.FunctionComponent<WpVerticalCarouselProps> = (
  props,
) => {
  const { articles, filteredQueries } = props

  const [currentArticleIndex, setCurrentArticleIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length)
      }, 500)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNext = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex + 1) % articles.length)
  }

  const handleBack = () => {
    setCurrentArticleIndex(
      (prevIndex) => (prevIndex - 1 + articles.length) % articles.length,
    )
  }

  return (
    <div className="flex w-full flex-row items-center justify-center border">
      <div className="mr-2 flex h-[40px] items-center bg-main px-3 text-[13px] font-bold text-white">
        <span>BREAKING</span>
      </div>
      <div className="relative h-[40px] w-full overflow-y-hidden">
        {articles.map((article, index) => {
          const newUri = splitUriWP(article.uri, article.slug)
          const isWordIncluded = filteredQueries?.some((word) =>
            article.title.toLowerCase().includes(word.toLowerCase()),
          )
          if (isWordIncluded === true) {
            return null
          }
          return (
            <a aria-label={article.title} key={index} href={newUri}>
              <h1
                className={`absolute left-0 top-0 line-clamp-1 w-full transform text-ellipsis bg-background text-[13px] text-primary opacity-100 ${
                  index === currentArticleIndex
                    ? "zIndex-[10]"
                    : index >= currentArticleIndex
                      ? "zIndez-[8] translate-y-[50px]"
                      : "zIndez-[8] -translate-y-[50px]"
                } transition-transform duration-500 ease-in-out`}
                style={{ zIndex: index === currentArticleIndex ? 1 : 0 }}
              >
                {article.title}
              </h1>
            </a>
          )
        })}
      </div>
      <div className="flex h-[40px]">
        <Button
          aria-label="Back"
          className="hover:bg-black-200 rounded-[unset] bg-transparent px-4 py-2 font-bold text-foreground"
          onClick={handleBack}
        >
          <Icon.ChevronLeft aria-label="Back" />
        </Button>
        <Button
          aria-label="Next"
          className="hover:bg-black-200 rounded-[unset] bg-transparent px-4 py-2 font-bold text-foreground"
          onClick={handleNext}
        >
          <Icon.ChevronRight aria-label="Next" />
        </Button>
      </div>
    </div>
  )
}

export default WpVerticalCarousel

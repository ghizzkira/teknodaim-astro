import * as React from "react"

import ArticleCardFeatured from "./ArticleCardFeatured"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"

import ArticleCardFeatured from "./ArticleCardFeatured"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"

type ArticleDataProps = Pick<ArticleProps, "title" | "slug"> & {
  featured_image: Pick<MediaProps, "url">
}

interface ArticleListFeaturedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  articles: ArticleDataProps[]
}

const ArticleListFeatured: React.FunctionComponent<ArticleListFeaturedProps> = (
  props,
) => {
  const { articles } = props

  const [showArrow, setShowArrow] = React.useState<boolean>(false)
  const [prevDisplay, setPrevDisplay] = React.useState<string>("md:hidden")
  const [nextDisplay, setNextDisplay] = React.useState<string>("md:flex")

  const arrowClass =
    "hidden justify-center content-center bg-background p-2 cursor-pointer absolute rounded-full"

  const contentRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null)
  const content: HTMLDivElement | null = contentRef.current

  React.useEffect(() => {
    if (content && content.scrollWidth > content.offsetWidth) {
      setShowArrow(true)
    }
  }, [content])

  function handleNextClick() {
    if (content) {
      content.scrollBy(200, 0)
      if (content.scrollLeft > 190) {
        setPrevDisplay("md:flex")
      }
      if (
        content.scrollLeft >=
        content.scrollWidth - content.offsetWidth - 200
      ) {
        setNextDisplay("md:hidden")
      }
    }
  }

  function handlePrevClick() {
    if (content) {
      content.scrollBy(-200, 0)
      if (content.scrollLeft < 200) {
        setPrevDisplay("md:hidden")
      }
      if (content.scrollLeft - 210) {
        setNextDisplay("md:flex")
      }
    }
  }

  return (
    <div className="relative mx-auto w-full max-[991px]:px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      {showArrow && (
        <>
          <Button
            aria-label="Next"
            onClick={handlePrevClick}
            id="prev"
            variant="outline"
            className={`${arrowClass} ${prevDisplay} left-0 top-[50%] z-[8] hidden -translate-y-2/4	translate-x-2/4`}
          >
            <Icon.ArrowBack aria-label="Next" />
          </Button>
          <Button
            aria-label="Next"
            onClick={handleNextClick}
            id="next"
            variant="outline"
            className={`${arrowClass} md:flex ${nextDisplay} right-[40px] top-[50%] z-[8]	-translate-y-2/4 translate-x-2/4`}
          >
            <Icon.ArrowForward aria-label="Next" />
          </Button>
        </>
      )}
      <div
        ref={contentRef}
        className="scrollbar scrollbar-hide relative mb-4 block h-auto min-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap px-3"
      >
        {articles.map((article) => {
          return (
            <div
              className={`inline-block whitespace-normal pr-[15px]`}
              key={article.slug}
            >
              <ArticleCardFeatured article={article} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ArticleListFeatured

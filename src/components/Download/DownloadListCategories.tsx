import * as React from "react"
import type {
  SelectMedia as MediaProps,
  SelectTopic as TopicProps,
} from "@/lib/db/schema"

import Image from "@/components/Image"
import Link from "@/components/Link"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"

type TopicDataProps = Partial<TopicProps> & {
  featuredImage: Pick<MediaProps, "url"> | null
}

interface DownloadListCategoriesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  categories: TopicDataProps[]
  locale: LanguageType
}

const DownloadListCategories: React.FunctionComponent<
  DownloadListCategoriesProps
> = (props) => {
  const { categories, locale } = props

  const [prevDisplay, setPrevDisplay] = React.useState<string>("md:hidden")
  const [nextDisplay, setNextDisplay] = React.useState<string>("md:flex")
  const [showArrow, setShowArrow] = React.useState<boolean>(false)

  const arrowClass =
    "hidden justify-center content-center bg-background hover:bg-muted/80 hover:text-background p-2 cursor-pointer ring-0 absolute rounded-full"

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
      content.scrollBy(250, 0)
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
      content.scrollBy(-250, 0)
      if (content.scrollLeft < 200) {
        setPrevDisplay("md:hidden")
      }
      if (content.scrollLeft - 210) {
        setNextDisplay("md:flex")
      }
    }
  }

  return (
    <div className="relative">
      {showArrow && (
        <>
          <Button
            aria-label="Prev"
            onClick={handlePrevClick}
            id="prev"
            variant="outline"
            className={`${arrowClass} ${prevDisplay} left-0 top-[50%] z-[8] hidden -translate-y-2/4	translate-x-2/4`}
          >
            <Icon.ArrowBack aria-label="Prev" />
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
        className="scrollbar scrollbar-hide relative mb-4 block h-auto min-w-full space-x-5 overflow-x-auto overflow-y-auto whitespace-nowrap py-3"
      >
        {categories?.map((category) => {
          return (
            <div
              key={category.id}
              className="inline-flex w-[200px] flex-row overflow-hidden rounded-lg bg-background shadow-lg"
            >
              {category?.featuredImage && (
                <Image
                  src={category.featuredImage.url as string}
                  className="relative h-[135px] w-[70px]"
                  alt={category.title!}
                  width={"100"}
                  height={"65"}
                />
              )}
              <div className="flex w-[inherit] flex-col items-center justify-center">
                <Link
                  locale={locale}
                  aria-label={category.title}
                  href={`/topic/${category.slug}`}
                >
                  <h3 className="mt-3 whitespace-normal px-3 text-base">
                    {category.title}
                  </h3>
                </Link>
                <div className="mb-3 px-3">
                  <p className="text-[14px]">{category?.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DownloadListCategories

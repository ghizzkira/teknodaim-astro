import * as React from "react"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { cn } from "@/lib/utils/style"
import type { SelectTopic } from "@/lib/db/schema"
import Link from "@/components/Link"
import type { LanguageType } from "@/lib/validation/language"

interface VideoNavProps extends React.HTMLAttributes<HTMLDivElement> {
  topics?: Partial<SelectTopic>[]
  locale: LanguageType
}

const VideoNav: React.FunctionComponent<VideoNavProps> = (props) => {
  const { topics, locale } = props

  const [showArrow, setShowArrow] = React.useState<boolean>(false)
  const [prevDisplay, setPrevDisplay] = React.useState<string>("hidden")
  const [nextDisplay, setNextDisplay] = React.useState<string>("flex")

  const arrowClass =
    "justify-center content-center bg-background hover:bg-foreground-800 hover:text-foreground p-2 h-8 cursor-pointer ring-0 absolute rounded-full"

  const contentRef: React.RefObject<HTMLUListElement> =
    React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    const content = contentRef.current

    if (content && content.scrollWidth > content.offsetWidth) {
      setShowArrow(true)
    }

    const handleScroll = () => {
      if (contentRef.current) {
        if (contentRef.current.scrollLeft < 100) {
          setPrevDisplay("hidden")
        } else {
          setPrevDisplay("flex")
        }
        if (
          contentRef.current.scrollLeft >=
          contentRef.current.scrollWidth - contentRef.current.offsetWidth - 100
        ) {
          setNextDisplay("hidden")
        } else {
          setNextDisplay("flex")
        }
      }
    }

    if (contentRef.current) {
      const content = contentRef.current
      content.addEventListener("scroll", handleScroll)
      window.addEventListener("resize", handleScroll)
    }

    return () => {
      if (content) {
        content.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
      }
    }
  }, [])

  function handleNextClick() {
    const content = contentRef.current

    if (content) {
      content.scrollBy(300, 0)
      if (content.scrollLeft > 90) {
        setPrevDisplay("flex")
      }
      if (
        content.scrollLeft >=
        content.scrollWidth - content.offsetWidth - 200
      ) {
        setNextDisplay("hidden")
      }
    }
  }

  function handlePrevClick() {
    const content = contentRef.current

    if (content) {
      content.scrollBy(-300, 0)
      if (content.scrollLeft < 100) {
        setPrevDisplay("hidden")
      }
      if (content.scrollLeft - 110) {
        setNextDisplay("flex")
      }
    }
  }

  return (
    <div className="relative w-full bg-background px-5 py-3">
      {showArrow && (
        <>
          <Button
            aria-label="Prev"
            onClick={handlePrevClick}
            id="prev"
            variant="outline"
            className={cn(
              `left-0 top-[50%] z-[8] -translate-y-2/4	translate-x-2/4`,
              arrowClass,
              prevDisplay,
            )}
          >
            <Icon.ArrowBack aria-label="Prev" />
          </Button>
          <Button
            aria-label="Next"
            onClick={handleNextClick}
            id="next"
            variant="outline"
            className={cn(
              `right-[40px] top-[50%] z-[8] flex -translate-y-2/4 translate-x-2/4`,
              arrowClass,
              nextDisplay,
            )}
          >
            <Icon.ArrowForward aria-label="Next" />
          </Button>
        </>
      )}
      <ul
        ref={contentRef}
        className="scrollbar scrollbar-hide relative flex max-w-full flex-nowrap gap-2 overflow-y-auto overflow-x-scroll"
      >
        <li>
          <Button
            aria-label="Show All Videos"
            className="rounded-xl bg-muted font-bold text-foreground"
            variant="outline"
            asChild
          >
            <Link locale={locale} aria-label="Show All Videos" href={`/video/`}>
              All
            </Link>
          </Button>
        </li>
        {topics?.map((topic, i) => {
          return (
            <li key={i}>
              <Button
                aria-label={topic.title}
                className="rounded-xl bg-muted font-bold text-foreground"
                variant="outline"
                asChild
              >
                <Link
                  locale={locale}
                  aria-label={topic.title}
                  href={`/video/topic/${topic.slug}`}
                >
                  {topic.title}
                </Link>
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default VideoNav

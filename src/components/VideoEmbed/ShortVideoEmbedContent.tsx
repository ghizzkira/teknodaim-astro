import * as React from "react"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import { useDisclosure } from "@/hooks/useDisclosure"
import ParseContent from "@/components/ParseContent"
import YoutubeEmbed from "@/components/Embed/YoutubeEmbed"
import Link from "@/components/Link"
import { VideoEmbedComment } from "@/components/Comment/VideoEmbedComment"

interface ShortVideoEmebedContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  link: string
  title: string
  id: string
  locale: LanguageType
  image: string
  authorImage: string
  description: string
  authorSlug: string
}

const ShortVideoEmbedContent: React.FunctionComponent<
  ShortVideoEmebedContentProps
> = (props) => {
  const { link, title, locale, authorImage, description, authorSlug, id } =
    props

  const [openDescription, setOpenDescription] = React.useState<boolean>(false)
  const [isHide, setIsHide] = React.useState<boolean>(false)

  const shortRef = React.useRef<HTMLDivElement>(null)

  const toggleVisibility = React.useCallback(() => {
    const elRef = shortRef.current
    const position = elRef ? elRef.getBoundingClientRect().top : 0
    const bottom = elRef ? elRef.getBoundingClientRect().bottom : 0
    const limit = elRef ? elRef.offsetHeight : window.innerHeight

    if (Math.abs(position) >= limit && bottom < 0) {
      setIsHide(true)
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [toggleVisibility])

  const arr = link?.split(
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
  )

  const { isOpen, onToggle } = useDisclosure()

  const descriptionData = ParseContent({
    htmlInput: description!,
    title: title!,
    locale: locale,
  })
  return (
    <>
      {!isHide && (
        <div
          ref={shortRef}
          className={cn(
            "relative mx-auto h-[100vh] w-full snap-start snap-always justify-center min-[500px]:aspect-[9/16] md:mb-[65px] md:h-[calc(100vh-130px)] md:min-h-[560px] md:w-[calc(56.25vh-72px)] md:min-w-[320px]",
          )}
        >
          <div
            className={
              "relative mx-auto flex h-[100vh] w-auto snap-start snap-always justify-center min-[500px]:aspect-[9/16] md:mb-5 md:h-[calc(100vh-130px)] md:min-h-[560px] md:w-[calc(56.25vh-72px)] md:min-w-[320px]"
            }
          >
            {arr && (
              <YoutubeEmbed
                title={title ?? ""}
                id={arr[3]! ?? arr[0]!}
                wrapperClass={cn("yt-lite z-[10] h-full w-full md:rounded-md")}
              />
            )}
            <div className="absolute bottom-4 right-4 z-[11] flex flex-col gap-4 md:-right-14 md:z-0">
              <Button
                aria-label="Toggle Comment"
                className="h-10 w-10 rounded-full bg-background/70 p-2 text-foreground md:bg-background"
                variant="ghost"
                onClick={onToggle}
              >
                <Icon.Comment
                  aria-label="Toggle Comment"
                  className="h-full w-full"
                />
              </Button>
              <Button
                aria-label="Open Description"
                className="h-10 w-10 rounded-full bg-background/70 p-2 text-foreground md:bg-background"
                variant="ghost"
                onClick={() => {
                  setOpenDescription((prev) => !prev)
                }}
              >
                <Icon.MoreVert aria-label="Open Description" />
              </Button>
              <Link
                locale={locale}
                aria-label={title}
                href={`/video/author/${authorSlug}`}
              >
                <div className="relative h-10 w-10 cursor-pointer rounded-md">
                  <Image
                    src={authorImage}
                    alt={title}
                    width={"40"}
                    height={"40"}
                  />
                </div>
              </Link>
            </div>
          </div>
          <section className="md:min-w-[320px absolute top-0 mx-auto h-full w-full items-center md:h-[calc(100vh-130px)] md:min-h-[560px] md:w-[calc(56.25vh-72px)] md:min-w-[320px]">
            <aside
              className={cn(
                `duration-400 scrollbar absolute left-0 top-0 flex h-[60vh] w-[100vw] transform flex-col overflow-y-auto rounded border bg-background p-5 transition-transform ease-in-out md:h-[calc(100vh-130px)] md:min-h-[560px] md:w-[calc(56.25vh-72px)] md:min-w-[320px]`,
                isOpen
                  ? "opacity-1 z-[12] translate-y-[40vh] md:z-0 md:translate-x-full md:translate-y-[unset]"
                  : "z-[9] translate-y-[100vh] max-md:opacity-0 md:z-0 md:hidden md:translate-x-full md:translate-y-[unset]",
              )}
            >
              <div>
                <Button
                  aria-label="Close Comments"
                  className="h-10 w-10 rounded-full p-2 text-foreground"
                  variant="ghost"
                  onClick={onToggle}
                >
                  <Icon.Close
                    aria-label="Close Comments"
                    className="h-full w-full"
                  />
                </Button>
              </div>
              <div
                className="mb-5 flex w-full flex-col justify-center"
                id="comment"
              >
                <VideoEmbedComment
                  type="shorts"
                  locale={locale}
                  videoEmbedId={id}
                />
              </div>
            </aside>
            <div
              className={cn(
                `duration-400 scrollbar absolute left-0 top-0 flex h-[60vh] w-[100vw] transform flex-col overflow-y-auto rounded border bg-background p-5 transition-transform ease-in-out md:h-[calc(100vh-130px)] md:min-h-[560px] md:w-[calc(56.25vh-72px)] md:min-w-[320px]`,
                openDescription
                  ? "opacity-1 z-[12] translate-y-[40vh] md:z-0 md:translate-x-full md:translate-y-[unset]"
                  : "z-[9] translate-y-[100vh] max-md:opacity-0 md:z-0 md:hidden md:translate-x-full md:translate-y-[unset]",
              )}
            >
              <div>
                <Button
                  aria-label="Open Description"
                  className="h-10 w-10 rounded-full p-2 text-foreground"
                  variant="ghost"
                  onClick={() => {
                    setOpenDescription((prev) => !prev)
                  }}
                >
                  <Icon.Close
                    aria-label="Close Comments"
                    className="h-full w-full"
                  />
                </Button>
              </div>

              <div className="article-body mb-5 flex w-full flex-col justify-center space-y-4">
                {descriptionData}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default ShortVideoEmbedContent

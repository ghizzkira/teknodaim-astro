import * as React from "react"

import type { LanguageType } from "@/lib/validation/language"
import ShortVideoEmbedContent from "./ShortVideoEmbedContent"
import type { SelectAd } from "@/lib/db/schema"
import Ad from "@/components/Ad"
import LoadingProgress from "@/components/LoadingProgress"
import { useGetVideoEmbedsByTopicInfinite } from "@/hooks/useVideoEmbed"

interface InfiniteScrollShortVideoEmbedByTopicProps
  extends React.HTMLAttributes<HTMLDivElement> {
  topicId: string
  mainTitle: string
  mainLink: string
  mainId: string
  mainImage: string
  mainDescription: string
  mainAuthorImage: string
  mainAuthorUsername: string
  locale: LanguageType
  adsShort?: Pick<SelectAd, "content" | "id" | "type">[]
}

const InfiniteScrollShortVideoEmbedByTopic: React.FunctionComponent<
  InfiniteScrollShortVideoEmbedByTopicProps
> = (props) => {
  const {
    topicId,
    mainTitle,
    mainLink,
    mainImage,
    mainDescription,
    mainAuthorImage,
    mainAuthorUsername,
    locale,
    mainId,
    adsShort,
  } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const { data, hasNextPage, fetchNextPage } = useGetVideoEmbedsByTopicInfinite(
    {
      topicId,
      limit: 1,
    },
  )

  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target?.isIntersecting && hasNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver])

  return (
    <div>
      <div
        ref={containerRef}
        id="short-container"
        className="short-container relative mx-auto h-auto w-full overflow-y-auto overflow-x-hidden max-md:bg-black md:mb-5"
      >
        <ShortVideoEmbedContent
          locale={locale}
          title={mainTitle}
          link={mainLink}
          id={mainId}
          image={mainImage}
          authorImage={mainAuthorImage}
          description={mainDescription}
          authorSlug={mainAuthorUsername}
        />
        {data?.map((page, index) => {
          return page?.videoEmbeds.map((video) => {
            const mainAuthor = video?.authors?.[0]
            if (video.type !== "youtube_short") {
              return null
            }
            if (video.embedLink === mainLink) {
              return null
            }
            if ((index + 1) % 3 === 0) {
              return (
                <>
                  {adsShort && adsShort.length > 0 && (
                    <div className="relative mx-auto h-[100vh] w-full snap-start snap-always justify-center min-[500px]:aspect-[9/16] md:mb-5 md:h-[calc(100vh-130px)] md:min-h-[560px] md:w-[calc(56.25vh-72px)] md:min-w-[320px]">
                      {adsShort.map((ad) => {
                        return <Ad ad={ad} key={ad.id} />
                      })}
                    </div>
                  )}
                  <ShortVideoEmbedContent
                    key={video.id}
                    locale={locale}
                    title={video.title}
                    link={video.embedLink}
                    id={video.id}
                    image={
                      video.featuredImageUrl ?? video.featuredImage?.url ?? ""
                    }
                    authorImage={mainAuthor?.image ?? ""}
                    description={video?.description ?? ""}
                    authorSlug={mainAuthor?.username ?? ""}
                  />
                </>
              )
            }
            return (
              <ShortVideoEmbedContent
                key={video.id}
                locale={locale}
                title={video.title}
                link={video.embedLink}
                id={video.id}
                image={video.featuredImageUrl ?? video.featuredImage?.url ?? ""}
                authorImage={mainAuthor?.image ?? ""}
                description={video?.description ?? ""}
                authorSlug={mainAuthor?.username ?? ""}
              />
            )
          })
        })}

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className="fixed bottom-10 z-[22] mx-auto mb-5 flex w-full justify-center"
          >
            <LoadingProgress />
          </div>
        )}
      </div>
    </div>
  )
}

export default InfiniteScrollShortVideoEmbedByTopic

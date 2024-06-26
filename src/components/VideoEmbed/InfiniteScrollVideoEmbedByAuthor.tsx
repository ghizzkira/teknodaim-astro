import * as React from "react"

import VideoEmbedCard from "./VideoEmbedCard"
import type { LanguageType } from "@/lib/validation/language"
import LoadingProgress from "@/components/LoadingProgress"
import { useGetVideoEmbedsByAuthorInfinite } from "@/hooks/useVideoEmbed"

interface InfiniteScollVideoEmbedByAuthorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  authorId: string
  locale: LanguageType
}

const InfiniteScollVideoEmbedByAuthor: React.FunctionComponent<
  InfiniteScollVideoEmbedByAuthorProps
> = (props) => {
  const { authorId, locale } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  const { data, hasNextPage, fetchNextPage } =
    useGetVideoEmbedsByAuthorInfinite({
      authorId,
      limit: 10,
    })

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3">
        {data?.map((page, indexPage) => {
          return (
            <>
              {page?.videoEmbeds?.length && page?.videoEmbeds.length > 0
                ? page?.videoEmbeds?.map((video) => {
                    const mainAuthor = video?.authors?.[0]
                    return (
                      <VideoEmbedCard
                        key={video.id}
                        title={video.title}
                        featuredImageUrl={
                          video.featuredImageUrl ??
                          video.featuredImage?.url ??
                          ""
                        }
                        slug={video.slug}
                        authorName={mainAuthor?.name ?? ""}
                        authorSlug={mainAuthor?.username ?? ""}
                        authorImage={mainAuthor?.image ?? ""}
                        locale={locale}
                      />
                    )
                  })
                : indexPage === 0 && (
                    <h3 className="my-16 text-center text-3xl">
                      No video have been posted
                    </h3>
                  )}
            </>
          )
        })}
      </div>
      {hasNextPage && (
        <div ref={loadMoreRef}>
          <div className="text-center">
            <LoadingProgress />
          </div>
        </div>
      )}
    </div>
  )
}

export default InfiniteScollVideoEmbedByAuthor

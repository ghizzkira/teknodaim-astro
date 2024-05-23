import * as React from "react"

import type { LanguageType } from "@/lib/validation/language"
import VideoEmbedCard from "./VideoEmbedCard"
import type { SelectMedia, SelectUser, SelectVideoEmbed } from "@/lib/db/schema"
import LoadingProgress from "@/components/LoadingProgress"
import { useGetVideoEmbedsByType } from "@/hooks/useVideoEmbed"

type VideoEmbeds = Pick<
  SelectVideoEmbed,
  "id" | "title" | "slug" | "featuredImageUrl"
> & {
  authors?: Pick<SelectUser, "name" | "username" | "image">[]
  featuredImage?: Pick<SelectMedia, "url" | "id">
}

interface InfiniteScrollVideoEmbedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  videoEmbeds: VideoEmbeds[]
  cursor?: string
  locale: LanguageType
}

const InfiniteScrollVideoEmbed: React.FunctionComponent<
  InfiniteScrollVideoEmbedProps
> = (props) => {
  const { videoEmbeds, locale } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  const { data, hasNextPage, fetchNextPage } = useGetVideoEmbedsByType({
    type: "youtube",
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
  }, [handleObserver, videoEmbeds])

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:px-4 md:grid-cols-3">
        {videoEmbeds?.map((video) => {
          const mainAuthor = video?.authors?.[0]
          return (
            <VideoEmbedCard
              key={video.id}
              title={video.title}
              featuredImageUrl={
                video.featuredImageUrl ?? video.featuredImage?.url ?? ""
              }
              slug={video.slug}
              authorName={mainAuthor?.name ?? ""}
              authorSlug={mainAuthor?.username ?? ""}
              authorImage={mainAuthor?.image ?? ""}
              locale={locale}
            />
          )
        })}
        {data?.map((page) => {
          return page?.videoEmbeds.map((video) => {
            const mainAuthor = video?.authors?.[0]
            return (
              <VideoEmbedCard
                key={video.id}
                title={video.title}
                featuredImageUrl={
                  video.featuredImageUrl ?? video.featuredImage?.url ?? ""
                }
                slug={video.slug}
                authorName={mainAuthor?.name ?? ""}
                authorSlug={mainAuthor?.username ?? ""}
                authorImage={mainAuthor?.image ?? ""}
                locale={locale}
              />
            )
          })
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

export default InfiniteScrollVideoEmbed

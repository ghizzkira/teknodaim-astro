import * as React from "react"

import { Button } from "@/components/UI/Button"
import { useGetDownloadsByLanguageByTopicInfinite } from "@/hooks/useDownload"
import type { LanguageType } from "@/lib/validation/language"
import DownloadCard from "./DownloadCard"

interface InfiniteScrollDownloadByTopicProps
  extends React.HTMLAttributes<HTMLDivElement> {
  topicId: string
  language: LanguageType
}

const InfiniteScrollDownloadByTopic: React.FunctionComponent<
  InfiniteScrollDownloadByTopicProps
> = (props) => {
  const { topicId, language } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  const { data, hasNextPage, fetchNextPage } =
    useGetDownloadsByLanguageByTopicInfinite({
      topicId: topicId,
      limit: 10,
      language,
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

    if (lmRef) observer.observe(lmRef)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, loadMoreRef, topicId])

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data?.map((page, indexPage) => {
          return (
            <React.Fragment key={indexPage}>
              {page?.downloads?.length && page?.downloads?.length > 0
                ? page?.downloads?.map((download) => {
                    return (
                      <DownloadCard
                        locale={language}
                        download={download}
                        key={download.id}
                      />
                    )
                  })
                : indexPage === 0 && (
                    <h3 className="my-16 text-center text-3xl">
                      No Downloads have been posted
                    </h3>
                  )}
            </React.Fragment>
          )
        })}
      </div>
      {hasNextPage && (
        <div ref={loadMoreRef}>
          <Button
            aria-label="No More Posts"
            loading={hasNextPage}
            className="w-full cursor-default"
          >
            No More Posts
          </Button>
        </div>
      )}
    </div>
  )
}

export default InfiniteScrollDownloadByTopic

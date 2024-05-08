import * as React from "react"

import LoadingProgress from "@/components/LoadingProgress"
// import { api } from "@/lib/trpc/react"
import type { LanguageType } from "@/lib/validation/language"
import ArticleCardHorizontal from "./article-card-horizontal"
import ArticleCardVertical from "./article-card-vertical"

interface InfiniteScrollTopicArticlesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  pageType: string
  locale: LanguageType
}

export const InfiniteScrollTopicArticles: React.FunctionComponent<
  InfiniteScrollTopicArticlesProps
> = (props) => {
  const { id, locale, pageType } = props

  // const loadMoreRef = React.useRef<HTMLDivElement>(null)
  // const { data, hasNextPage, fetchNextPage } =
  //   api.topic.articlesByTopicSlugInfinite.useInfiniteQuery(
  //     {
  //       slug: id,
  //       limit: 10,
  //     },
  //     {
  //       getNextPageParam: (lastPage) => lastPage?.nextCursor,
  //     },
  //   )

  // const handleObserver = React.useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     const [target] = entries
  //     if (target?.isIntersecting && hasNextPage) {
  //       fetchNextPage()
  //     }
  //   },
  //   [fetchNextPage, hasNextPage],
  // )

  // React.useEffect(() => {
  //   const lmRef = loadMoreRef.current
  //   const observer = new IntersectionObserver(handleObserver, {
  //     root: null, // viewport
  //     rootMargin: "-500px 0px 0px 0px",
  //     threshold: 0,
  //   })

  //   if (loadMoreRef.current) observer.observe(loadMoreRef.current)
  //   return () => {
  //     if (lmRef) {
  //       observer.unobserve(lmRef)
  //     }
  //   }
  // }, [handleObserver, pageType])

  return (
    <div>
      {/* {data?.pages.map((page, indexPage) => {
        return (
          <>
            {page?.topic?.articles?.length && page?.topic?.articles?.length > 0
              ? page.topic?.articles.map((article, index) => {
                  if ((index + 1) % 5 === 0) {
                    return (
                      <ArticleCardVertical
                        locale={locale}
                        article={article}
                        key={article.slug}
                      />
                    )
                  } else {
                    return (
                      <ArticleCardHorizontal
                        locale={locale}
                        article={article}
                        key={article.slug}
                      />
                    )
                  }
                })
              : indexPage === 0 && (
                  <h3 className="my-16 text-center text-3xl">
                    No articles have been posted
                  </h3>
                )}
          </>
        )
      })}
      {hasNextPage && (
        <div ref={loadMoreRef}>
          <div className="text-center">
            <LoadingProgress />
          </div>
        </div>
      )} */}
    </div>
  )
}

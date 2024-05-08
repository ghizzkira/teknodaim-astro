import * as React from "react"

import ArticleCardHorizontal from "./article-card-horizontal"
import ArticleCardVertical from "./article-card-vertical"
import LoadingProgress from "@/components/LoadingProgress"
import PlaceholderPostCard from "@/components/Placeholder/PlaceholderPostCard"
// import { api } from "@/lib/trpc/react"
import type { LanguageType } from "@/lib/validation/language"

import ArticleCardHorizontal from "./article-card-horizontal"
import ArticleCardVertical from "./article-card-vertical"
import LoadingProgress from "@/components/LoadingProgress"
import PlaceholderPostCard from "@/components/Placeholder/PlaceholderPostCard"
import type { LanguageType } from "@/lib/validation/language"

interface InfiniteScrollArticleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pageType: string
  locale: LanguageType
}

const InfiniteScrollArticle: React.FunctionComponent<
  InfiniteScrollArticleProps
> = (props) => {
  const { pageType, locale } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  // // // const { data, hasNextPage, isLoading, fetchNextPage } =
  // // //   api.article.byLanguageInfinite.useInfiniteQuery(
  // // //     {
  // // //       language: locale,
  // // //       limit: 10,
  // // //     },
  // // //     {
  // // //       getNextPageParam: (lastPage) => lastPage?.nextCursor,
  // // //     },
  // // //   )

  // // const handleObserver = React.useCallback(
  // //   ([target]: IntersectionObserverEntry[]) => {
  // //     if (target?.isIntersecting && hasNextPage) {
  // //       fetchNextPage()
  // //     }
  // //   },
  // //   [fetchNextPage, hasNextPage],
  // // )

  // React.useEffect(() => {
  //   const lmRef = loadMoreRef.current
  //   const observer = new IntersectionObserver(handleObserver, {
  //     root: null, // viewport
  //     rootMargin: "-500px 0px 0px 0px",
  //     threshold: 0,
  //   })

  //   if (loadMoreRef.current) observer.observe(loadMoreRef.current)

  //   return () => {
  //     if (lmRef) observer.unobserve(lmRef)
  //   }
  // }, [handleObserver, pageType])

  // if (isLoading) {
  //   return (
  //     <>
  //       <div className="px-4">
  //         <PlaceholderPostCard />
  //         <PlaceholderPostCard />
  //         <PlaceholderPostCard />
  //         <PlaceholderPostCard />
  //       </div>
  //     </>
  //   )
  // }

  return (
    <div>
      {/* {data?.pages.map((page, indexPage) => {
        return (
          <>
            {page?.articles?.length && page?.articles?.length > 0
              ? page?.articles.map((article, index) => {
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

export default InfiniteScrollArticle

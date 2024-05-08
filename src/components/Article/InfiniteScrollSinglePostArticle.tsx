import * as React from "react"

import ArticleScroll from "./article-scroll"
import LoadingProgress from "@/components/LoadingProgress"
import ParseContent from "@/components/ParseContent"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"
import { type SelectTopic as TopicProps } from "@/lib/db/schema/topic"
import { type SelectUser as UserProps } from "@/lib/db/schema/user"
// import { api } from "@/lib/trpc/react"
import { splitReactNodes } from "@/lib/utils/content"
import type { AdType } from "@/lib/validation/ad"
import type { LanguageType } from "@/lib/validation/language"

import ArticleScroll from "./article-scroll"
import LoadingProgress from "@/components/LoadingProgress"
import ParseContent from "@/components/ParseContent"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { type SelectMedia as MediaProps } from "@/lib/db/schema/media"
import { type SelectTopic as TopicProps } from "@/lib/db/schema/topic"
import { type SelectUser as UserProps } from "@/lib/db/schema/user"
import { splitReactNodes } from "@/lib/utils/content"
import type { AdType } from "@/lib/validation/ad"
import type { LanguageType } from "@/lib/validation/language"

interface ParsedContentProps {
  firstContent: React.ReactNode[]
}

interface InfiniteScrollSinglePostArticleProps {
  posts: Partial<ArticleProps>[] | null
  post: Partial<ArticleProps> & { topics: Partial<TopicProps>[] } & {
    authors: Partial<UserProps>[]
  } & { featured_image: Partial<MediaProps> }

  locale: LanguageType
  topic_slug: string
  adsSingleArticleAbove: {
    id: string
    content: string
    type: AdType
  }[]
  adsSingleArticleBelow: {
    id: string
    content: string
    type: AdType
  }[]
  adsSingleArticleInline: {
    id: string
    content: string
    type: AdType
  }[]
  adsSingleArticlePopUp: {
    id: string
    content: string
    type: AdType
  }[]
}

const InfiniteScrollSinglePostArticle: React.FunctionComponent<
  InfiniteScrollSinglePostArticleProps
> = (props) => {
  const {
    posts,
    post,
    adsSingleArticleAbove,
    adsSingleArticleBelow,
    adsSingleArticleInline,
    adsSingleArticlePopUp,
    locale,
    topic_slug,
  } = props

  // const [articles, setArticles] = React.useState<
  //   Partial<
  //     ArticleProps & { topics: Partial<TopicProps>[] } & {
  //       authors: Partial<UserProps>[]
  //     } & { featured_image: Partial<MediaProps> }
  //   >[]
  // >([])
  // const [parsedContents, SetParsedContents] = React.useState<
  //   ParsedContentProps[]
  // >([])
  // const LoaderRef = React.useRef(null)
  // const articleRef = React.useRef(null)
  // const { data, hasNextPage, fetchNextPage, isSuccess } =
  //   api.topic.articlesByTopicSlugInfinite.useInfiniteQuery(
  //     {
  //       limit: 1,
  //       slug: topic_slug,
  //     },
  //     {
  //       enabled: !!topic_slug,
  //       getNextPageParam: (lastPage) => lastPage?.nextCursor,
  //     },
  //   )

  // React.useEffect(() => {
  //   if (isSuccess && data) {
  //     const parsedContent = ParseContent({
  //       htmlInput: data?.pages[0]?.topic?.articles[0]?.content!,
  //       title: data?.pages[0]?.topic?.articles[0]?.title!,
  //     })

  //     const { firstContent } = splitReactNodes(
  //       React.Children.toArray(parsedContent),
  //     )
  //     document.title = data?.pages[0]?.topic?.articles[0]?.title!

  //     const newPath = `/article/${data?.pages[0]?.topic?.articles[0]?.slug}/`

  //     window.history.pushState(
  //       {},
  //       data?.pages[0]?.topic?.articles[0]?.title!,
  //       newPath,
  //     )

  //     SetParsedContents((list) => [...list, { firstContent }])
  //     setArticles((list) => [...list, ...data?.pages[0]?.topic?.articles!])
  //   }
  // }, [isSuccess, data])

  // const handleObserver = React.useCallback(
  //   (entries: IntersectionObserverEntry[]) => {
  //     const [target] = entries
  //     if (target?.isIntersecting && hasNextPage == true) {
  //       fetchNextPage()
  //     }
  //   },
  //   [fetchNextPage, hasNextPage],
  // )

  // React.useEffect(() => {
  //   const observer = new IntersectionObserver(handleObserver)

  //   if (LoaderRef.current) {
  //     observer.observe(LoaderRef.current)
  //   }

  //   return () => {
  //     if (observer) {
  //       observer.disconnect()
  //     }
  //   }
  // }, [handleObserver])
  return (
    <>
      {/* {articles.map((article, i: number, arr) => {
        if (arr[i]?.slug == post.slug) {
          return null
        }
        return (
          <ArticleScroll
            key={i}
            locale={locale}
            posts={posts}
            ref={articleRef}
            article={article}
            adsSingleArticleAbove={adsSingleArticleAbove}
            adsSingleArticleBelow={adsSingleArticleBelow}
            adsSingleArticleInline={adsSingleArticleInline}
            adsSingleArticlePopUp={adsSingleArticlePopUp}
            firstContent={parsedContents[i]?.firstContent}
          />
        )
      })}
      {hasNextPage && (
        <div ref={LoaderRef}>
          <div className="text-center">
            <LoadingProgress />
          </div>
        </div>
      )} */}
    </>
  )
}

export default InfiniteScrollSinglePostArticle

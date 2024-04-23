import * as React from "react"

// import type { AdProps } from "@/components/ad/ad"
import LoadingProgress from "@/components/LoadingProgress"
import ParseContent from "@/components/ParseContent"
import { splitReactNodes } from "@/lib/utils/content"
import type { LanguageType } from "@/lib/validation/language"
import { wpGetInfiniteScollArticlesAction } from "@/lib/wp/action/wp-post"
import type {
  WpInfinitePostsProps,
  WpSinglePostDataProps,
} from "@/lib/wp/action/wp-types"
import { splitUriWP, wpPrimaryCategorySlug } from "@/lib/wp/helper"
import WpPostScroll from "./WpPostScroll"

interface ParsedContentProps {
  firstContent: React.ReactNode[]
}

interface InfiniteScrollWpSinglePost {
  posts: WpSinglePostDataProps[]
  post: WpSinglePostDataProps
  //fix
  adsBelowHeader: any[]
  locale: LanguageType
  adsSingleArticleAbove: any[]
  adsSingleArticleBelow: any[]
  adsSingleArticleInline: any[]
  adsSingleArticlePopUp: any[]
  filteredQueries?: string[]
}

const InfiniteScrollWpSinglePost: React.FunctionComponent<
  InfiniteScrollWpSinglePost
> = (props) => {
  const {
    posts,
    post,
    adsSingleArticleAbove,
    adsSingleArticleBelow,
    adsSingleArticleInline,
    adsSingleArticlePopUp,
    locale,
    filteredQueries,
  } = props

  const { categories } = post
  const { primaryCategory } = wpPrimaryCategorySlug(categories)
  const [articles, setArticles] = React.useState<WpSinglePostDataProps[]>([])
  const [parsedContents, SetParsedContents] = React.useState<
    ParsedContentProps[]
  >([])
  const [hasNextPage, setHasNextPage] = React.useState(true)
  const [endCursor, setEndCursor] = React.useState("")
  const LoaderRef = React.useRef(null)
  const articleRef = React.useRef(null)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target?.isIntersecting && hasNextPage == true) {
        const data = (await wpGetInfiniteScollArticlesAction(
          primaryCategory?.id as never as string,
          endCursor,
        )) as unknown as WpInfinitePostsProps
        const parsedContent = ParseContent({
          htmlInput: data?.posts[0]?.content!,
          title: data?.posts[0]?.title!,
        })

        const { firstContent } = splitReactNodes(
          React.Children.toArray(parsedContent),
        )

        document.title = `${data.posts[0]?.title}/`

        const newPath = splitUriWP(
          data.posts[0]?.uri!,
          `${data.posts[0]?.slug!}/`,
        )

        window.history.pushState({}, data.posts[0]?.title!, newPath)

        SetParsedContents((list) => [...list, { firstContent }])
        setArticles((list) => [...list, ...data.posts])
        setEndCursor(data.pageInfo.endCursor)
        setHasNextPage(data.pageInfo.hasNextPage)
      }
    },
    [endCursor, hasNextPage, primaryCategory],
  )

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "-500px 0px 0px 0px",
      threshold: 0,
    })

    if (LoaderRef.current) {
      observer.observe(LoaderRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [handleObserver])
  return (
    <>
      {articles.map((postData, i: number, arr) => {
        const isWordIncluded = filteredQueries?.some((word) =>
          postData.title.toLowerCase().includes(word.toLowerCase()),
        )
        if (isWordIncluded === true) {
          return null
        }
        const postDatas = {
          id: postData.id,
          postId: postData.postId,
          content: postData.content,
          title: postData.title,
          authorName: postData.author.name,
          authorUrl: postData.author.slug,
          authorImg: postData.author.avatar.url,
          categories: postData.categories,
          featuredImageUrl: postData.featuredImage.sourceUrl,
          featuredImageAlt: postData.featuredImage.altText,
          featuredImageCaption: postData.featuredImage.caption,
          date: postData.date,
          slug: postData.slug,
          tags: postData.tags,
        }
        if (arr[i]?.slug == post.slug) {
          return null
        }
        return (
          <WpPostScroll
            key={i}
            locale={locale}
            posts={posts}
            ref={articleRef}
            postData={postDatas}
            adsSingleArticleAbove={adsSingleArticleAbove}
            adsSingleArticleBelow={adsSingleArticleBelow}
            adsSingleArticleInline={adsSingleArticleInline}
            adsSingleArticlePopUp={adsSingleArticlePopUp}
            isWP={true}
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
      )}
    </>
  )
}

export default InfiniteScrollWpSinglePost

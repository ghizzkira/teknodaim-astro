import * as React from "react"

import PlaceholderPostCard from "@/components/Placeholder/PlaceholderPostCard"
import type { LanguageType } from "@/lib/validation/language"
// import type { LanguageType } from "@/lib/validation/language"
import { wpGetPostsByCategorySlugAction } from "@/lib/wp/action/wp-post"
import type {
  WpInfinitePostsProps,
  WPPageInfoProps,
  WpSinglePostDataProps,
} from "@/lib/wp/action/wp-types"
import { splitUriWP, wpPrimaryCategorySlug } from "@/lib/wp/helper"
import WpPostCard from "./WpPostCard"

interface InfiniteScrollWpPostsCategoryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  posts: WpSinglePostDataProps[]
  pageInfo: WPPageInfoProps
  language: LanguageType
  filteredQueries?: string[]
}

const InfiniteScrollWpPostsCategory: React.FunctionComponent<
  InfiniteScrollWpPostsCategoryProps
> = (props) => {
  const { id, posts, pageInfo, filteredQueries, language } = props

  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [page, setPage] = React.useState<WPPageInfoProps>(pageInfo)
  const [list, setList] = React.useState<WpSinglePostDataProps[]>(posts)

  const handleObserver = React.useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target?.isIntersecting && page.hasNextPage == true) {
        const data = (await wpGetPostsByCategorySlugAction(
          id!,
          page.endCursor,
          language.toLocaleUpperCase(),
        )) as unknown as WpInfinitePostsProps
        setList((list) => [...list, ...data.posts])
        setPage(data.pageInfo)
      }
    },
    [id, language, page.endCursor, page.hasNextPage],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // viewport
      rootMargin: "-500px 0px 0px 0px",
      threshold: 0,
    })

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver, posts])

  return (
    <div>
      {list.map((post, index) => {
        const newUri = splitUriWP(post.uri, post.slug)
        const { primaryCategory } = wpPrimaryCategorySlug(post.categories)
        const isWordIncluded = filteredQueries?.some((word) =>
          post.title.toLowerCase().includes(word.toLowerCase()),
        )
        if (isWordIncluded === true) {
          return null
        }
        if ((index + 1) % 5 === 0) {
          return (
            <WpPostCard
              type="vertical"
              locale={language}
              key={post.id}
              src={post.featuredImage?.sourceUrl}
              alt={post.featuredImage?.altText}
              slug={post.slug}
              uri={newUri}
              title={post.title}
              excerpt={post.excerpt}
              authorName={post.author.name}
              authorAvatarUrl={post.author.avatar.url}
              authorUri={`/author/${post.author.slug}`}
              date={post.date}
              categoryName={primaryCategory?.name as never as string}
              categoryUri={`/${primaryCategory?.slug as never as string}`}
            />
          )
        } else {
          return (
            <WpPostCard
              type="horizontal"
              locale={language}
              key={post.id}
              src={post.featuredImage?.sourceUrl}
              alt={post.featuredImage?.altText}
              slug={post.slug}
              uri={newUri}
              title={post.title}
              excerpt={post.excerpt}
              authorName={post.author.name}
              authorAvatarUrl={post.author.avatar.url}
              authorUri={`/author/${post.author.slug}`}
              date={post.date}
              categoryName={primaryCategory?.name as never as string}
              categoryUri={`/${primaryCategory?.slug as never as string}`}
            />
          )
        }
      })}
      {page.hasNextPage && (
        <div ref={loadMoreRef}>
          <PlaceholderPostCard />
          <PlaceholderPostCard />
        </div>
      )}
    </div>
  )
}

export default InfiniteScrollWpPostsCategory

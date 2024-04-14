import * as React from "react"

// import type { LanguageType } from "@/lib/validation/language"
import type { WpSinglePostDataProps } from "@/lib/wp/action/wp-types"
import { splitUriWP, wpPrimaryCategorySlug } from "@/lib/wp/helper"
import WpPostCard from "./wp-post-card"

interface WpListPostProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: WpSinglePostDataProps[]
  locale: string
  filteredQueries?: string[]
}

const WpListPost: React.FunctionComponent<WpListPostProps> = (props) => {
  const { posts, locale, filteredQueries } = props
  return (
    <div>
      {posts.map((post, index) => {
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
              locale={locale}
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
              locale={locale}
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
    </div>
  )
}

export default WpListPost

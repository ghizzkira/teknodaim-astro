import * as React from "react"

import { toast } from "@/components/ui/toast/use-toast"
import type { UpsertWpPopularPost } from "@/lib/validation/wp-popular-post"

const WpPostViewCounter: React.FunctionComponent<UpsertWpPopularPost> = (
  props,
) => {
  const {
    title,
    slug,
    excerpt,
    publishedTime,
    thumbnail,
    primaryCategory,
    primaryCategorySlug,
    authorName,
    authorSlug,
    authorImage,
    language,
  } = props

  React.useEffect(() => {
    const postView = async () => {
      await fetch("/api/wp-popular-post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          publishedTime,
          thumbnail,
          primaryCategory,
          primaryCategorySlug,
          authorName,
          authorSlug,
          authorImage,
          language,
        }),
      })
    }

    const timeout = setTimeout(
      () => {
        postView()
      },
      3 * 60 * 1000,
    )
    return () => {
      clearTimeout(timeout)
    }
  }, [
    title,
    slug,
    excerpt,
    publishedTime,
    thumbnail,
    primaryCategory,
    primaryCategorySlug,
    authorName,
    authorSlug,
    authorImage,
    language,
  ])

  return null
}

export default WpPostViewCounter

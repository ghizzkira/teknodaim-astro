import * as React from "react"

import type { LanguageType } from "@/lib/validation/language"
import WpPostCardFeatured from "./WpPostCard-featured"

interface WpListPostFeaturedProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: {
    title: string
    slug: string
    published_time: Date | string
    thumbnail: string
    primary_category: string
    primary_category_slug: string
    author_name: string
    author_slug: string
    author_image: string
  }[]
  locale: LanguageType
}

export const WpListPostFeatured: React.FunctionComponent<
  WpListPostFeaturedProps
> = (props) => {
  const { posts, locale } = props
  return (
    <div className="grid h-[600px] w-full lg:h-[400px] lg:grid-cols-4 lg:grid-rows-2">
      <div className="col-span-2 row-span-2 mb-[10px] lg:mb-0 lg:mr-[10px]">
        <div className="h-full w-full">
          {posts[0] && (
            <WpPostCardFeatured locale={locale} post={posts[0]} index={1} />
          )}
        </div>
      </div>
      <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2">
        <div className="col-span-1 row-span-2 mr-[10px]">
          <div className="h-full w-full">
            {posts[1] && (
              <WpPostCardFeatured locale={locale} post={posts[1]!} index={2} />
            )}
          </div>
        </div>
        <div className="col-span-1 row-span-2 grid grid-cols-1 grid-rows-2">
          <div className="col-span-1 row-span-1 mb-[10px]">
            <div className="h-full w-full">
              {posts[2] && (
                <WpPostCardFeatured
                  locale={locale}
                  post={posts[2]!}
                  index={3}
                />
              )}
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <div className="h-full w-full">
              {posts[3] && (
                <WpPostCardFeatured
                  locale={locale}
                  post={posts[3]!}
                  index={4}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WpListPostFeatured

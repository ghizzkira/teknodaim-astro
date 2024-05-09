import * as React from "react"

// import type { AdProps } from "@/components/ad/ad"
import Image from "@/components/Image"
import Link from "@/components/Link"
import PostInfo from "@/components/PostInfo"
import StaticShare from "@/components/Share/StaticShare"
import { Button } from "@/components/UI/Button"
import { ButtonGroup } from "@/components/UI/ButtonGroup"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import type {
  WpCategoriesDataProps,
  WpSinglePostDataProps,
  WpTagsDataProps,
} from "@/lib/wp/action/wp-types"
import { wpPrimaryCategorySlug } from "@/lib/wp/helper"
import type { SelectAd } from "@/lib/db/schema"

// const Ad = React.lazy(async () => await import("@/components/ad"))

interface WpPostScrollProps {
  postData: {
    id: string
    postId?: number
    title: string
    content: string
    authorName: string
    authorUrl: string
    authorImg: string
    slug: string
    categories: {
      title: string | undefined
      slug: string
      name?: string
    }[]
    tags?: WpTagsDataProps[]
    date: string
    featuredImageCaption: string
    featuredImageUrl: string
    featuredImageAlt: string
  }
  posts: WpSinglePostDataProps[]
  isWP?: boolean
  adsSingleArticleAbove?: SelectAd
  adsSingleArticleBelow?: SelectAd
  adsSingleArticleInline?: SelectAd
  adsSingleArticlePopUp?: SelectAd
  locale: LanguageType
  firstContent: React.ReactNode | null
}

const WpPostScroll = React.memo(
  React.forwardRef<HTMLDivElement, WpPostScrollProps>((props, ref) => {
    const {
      postData,

      locale,
      firstContent,
    } = props

    const {
      title,
      authorName,
      authorUrl,
      authorImg,
      categories,
      featuredImageCaption,
      featuredImageUrl,
      featuredImageAlt,
      date,
      slug,
    } = postData

    const { primaryCategory } = wpPrimaryCategorySlug(
      categories as WpCategoriesDataProps[],
    )
    const primaryData = primaryCategory

    return (
      <article id={postData?.slug} ref={ref} className="article-divider px-4">
        <ButtonGroup className="space-x-2">
          {categories?.map((category, i) => {
            if (i < 2) {
              return (
                <Button
                  key={category.name}
                  aria-label={category.name}
                  className={cn(
                    "mb-2 h-auto rounded-full bg-muted !px-[9px] !py-[5px] uppercase text-foreground transition-all duration-300 ease-in-out hover:bg-main hover:text-white",
                  )}
                  asChild
                >
                  <Link
                    locale={locale}
                    aria-label={category.name}
                    className="text-[11px] leading-[1]"
                    href={`/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </Button>
              )
            }
            return null
          })}
        </ButtonGroup>
        <h1 className="mb-2 mt-4 line-clamp-none border-b border-border pb-2 text-[25px] font-bold leading-[1.7] md:border-none md:text-[40px] md:leading-[43px]">
          {title}
        </h1>
        <div className="mb-2">
          <PostInfo
            locale={locale}
            authorName={authorName}
            authorAvatarUrl={authorImg}
            authorSlug={authorUrl}
            date={date}
          />
        </div>
        {featuredImageUrl && (
          <>
            <div className="relative aspect-video w-full">
              <Image
                src={featuredImageUrl}
                className="max-w-auto relative aspect-video w-full overflow-hidden rounded object-cover"
                alt={featuredImageAlt}
                sizes="(max-width: 768px) 300px, 500px"
                width={"1200"}
                height={"800"}
              />
            </div>
            {featuredImageCaption && (
              <div
                className="text-center text-xs italic text-foreground"
                dangerouslySetInnerHTML={{ __html: featuredImageCaption }}
              />
            )}
          </>
        )}
        <div className="mt-[10px] flex flex-col">
          <StaticShare
            locale={locale}
            title={title}
            categorySlug={primaryData?.slug as never as string}
            postSlug={slug}
          />
          <section className="wp-body mb-4 max-h-[300px] space-y-4 overflow-y-hidden pt-4">
            {/* {adsSingleArticleAbove &&
              adsSingleArticleAbove.length > 0 &&
              adsSingleArticleAbove.map((ad) => {
                return <Ad key={ad.id} ad={ad} />
              })} */}
            {firstContent}
            {/* {adsSingleArticleInline &&
              adsSingleArticleInline.length > 0 &&
              adsSingleArticleInline.map((ad) => {
                return <Ad key={ad.id} ad={ad} />
              })} */}
            {/* {adsSingleArticleBelow &&
              adsSingleArticleBelow.length > 0 &&
              adsSingleArticleBelow.map((ad) => {
                return <Ad key={ad.id} ad={ad} />
              })} */}
          </section>
          <div className="relative my-4 flex justify-center from-60% to-40% before:absolute before:bottom-[99%] before:right-0 before:block before:h-[150px] before:w-full before:bg-gradient-to-t before:from-background  before:to-transparent">
            <Button asChild aria-label="Read more" type="button">
              <Link
                locale={locale}
                aria-label="Read more"
                href={`/${primaryData?.slug}/${slug}`}
              >
                Read more
              </Link>
            </Button>
          </div>
        </div>
      </article>
    )
  }),
)

export default WpPostScroll

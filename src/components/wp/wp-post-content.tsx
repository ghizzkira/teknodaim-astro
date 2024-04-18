import * as React from "react"

import BadgeIcon from "@/components/badge-icon"
// import Image from "@/components/image"
// import StaticShare from "@/components/share/static-share"
import { Button } from "@/components/ui/button"
// import { ButtonGroup } from "@/components/ui/button-group"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import type {
  WpCategoriesDataProps,
  WpSinglePostDataProps,
  WpTagsDataProps,
} from "@/lib/wp/action/wp-types"
import {
  splitUriWP,
  wpPrimaryCategorySlug,
  wpTagPathBySlug,
} from "@/lib/wp/helper"
import WpPostBody from "./wp-post-body"
import WpPostInfo from "./wp-post-info"
import WpPostView from "./wp-post-view"

// import WpPostViewCounter from "./wp-post-view-counter"

// const Ad = React.lazy(async () => await import("@/components/ad"))
// const WpComment = React.lazy(
//   async () => await import("@/components/comment/wp-comment"),
// )

// type GadgetDataProps = Pick<GadgetProps, "id" | "title" | "slug"> & {
//   featured_image?: {
//     url: string
//   } | null
// }

interface WpPostContentProps {
  postData: {
    id: string
    postId?: number
    title: string
    content: string
    authorName: string
    authorUrl: string
    authorImg: string
    excerpt: string
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
  isMain?: boolean
  // adsSingleArticleAbove: Pick<AdProps, "content" | "id" | "type">[]
  // adsSingleArticleBelow: Pick<AdProps, "content" | "id" | "type">[]
  // adsSingleArticleInline: Pick<AdProps, "content" | "id" | "type">[]
  // adsSingleArticlePopUp: Pick<AdProps, "content" | "id" | "type">[]
  firstContent: React.ReactNode | null
  secondContent: React.ReactNode | null
  locale: LanguageType
  relatedPosts?: WpSinglePostDataProps[] | null
  // gadgets?: GadgetDataProps[]
}

const WpPostContent: React.FunctionComponent<WpPostContentProps> = React.memo(
  (props) => {
    const {
      isMain,
      postData,
      // adsSingleArticleAbove,
      // adsSingleArticleBelow,
      // adsSingleArticleInline,
      firstContent,
      secondContent,
      locale,
      relatedPosts,
      // gadgets,
    } = props

    const {
      title,
      authorName,
      authorUrl,
      authorImg,
      categories,
      excerpt,
      featuredImageCaption,
      featuredImageUrl,
      featuredImageAlt,
      date,
      slug,
      tags,
    } = postData

    const { primaryCategory } = wpPrimaryCategorySlug(
      categories as WpCategoriesDataProps[],
    )

    const primaryData = primaryCategory

    const stylesIcons = `z-[5] block md:h-[44px] md:w-[44px] rounded-full p-1.5 md:p-2 text-[13px] md:text-[26px] w-[32px] h-[32px] leading-[32px] md:leading-[44px]`

    return (
      <>
        {/* <WpPostViewCounter
          title={title}
          slug={slug}
          excerpt={excerpt}
          published_time={new Date(date).toISOString()}
          thumbnail={featuredImageUrl}
          primary_category={primaryCategory?.name!}
          primary_category_slug={primaryCategory?.slug!}
          author_name={authorName}
          author_slug={authorUrl}
          language={locale}
          author_image={authorImg}
        /> */}
        <article id={postData?.slug} className="article-divider px-4">
          <div className="flex justify-between">
            <div className="space-x-2">
              {categories?.map((category, i) => {
                if (i < 2) {
                  return (
                    <Button
                      key={category.name}
                      aria-label={`Open ${category.name}`}
                      asChild
                      className={cn(
                        "mb-2 h-auto rounded-full bg-muted !px-[9px] !py-[5px] uppercase text-foreground transition-all duration-300 ease-in-out hover:bg-main hover:text-white",
                      )}
                    >
                      <a
                        aria-label={`Open ${category.name}`}
                        className="text-[11px] leading-[1]"
                        href={`/${category.slug}`}
                      >
                        {category.name}
                      </a>
                    </Button>
                  )
                }
                return
              })}
            </div>
            <BadgeIcon
              name={primaryData?.name!}
              slug={`/${primaryData?.slug!}`}
              className={stylesIcons}
            />
          </div>
          <h1 className="mb-[10px] mt-4 line-clamp-none text-[1.8em] font-bold leading-[1.2] md:border-none md:text-[40px] md:leading-[43px]">
            {title}
          </h1>
          <div className="mb-2 flex justify-between">
            <WpPostInfo
              authorName={authorName}
              authorSlug={authorUrl}
              date={date}
              locale={locale}
              authorAvatarUrl={authorImg}
            />
            <WpPostView className="ml-2 flex items-center" post_slug={slug} />
          </div>
          <div
            className="text-muted-900 mb-[25px] text-[18px] leading-[1.5em] lg:text-[22px]"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          {featuredImageUrl && (
            <>
              <div className="relative aspect-video w-full">
                <img
                  // priority={true}
                  src={featuredImageUrl}
                  className="max-w-auto relative aspect-video w-full overflow-hidden rounded-xl object-cover"
                  alt={featuredImageAlt}
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
            {/* <StaticShare
              locale={locale}
              title={title}
              categorySlug={primaryData?.slug as never as string}
              postSlug={slug}
            /> */}
            <WpPostBody className="wp-body w-full">
              <React.Fragment>
                {/* {adsSingleArticleAbove &&
                  adsSingleArticleAbove.length > 0 &&
                  adsSingleArticleAbove.map((ad) => {
                    return (
                      <div
                        key={ad.id}
                        className="-ml-4 w-[100vw] md:ml-0 md:w-full"
                      >
                        <Ad ad={ad} />
                      </div>
                    )
                  })} */}
                {firstContent}
                {/* {adsSingleArticleInline &&
                  adsSingleArticleInline.length > 0 &&
                  adsSingleArticleInline.map((ad) => {
                    return (
                      <div
                        key={ad.id}
                        className="-ml-4 w-[100vw] md:ml-0 md:w-full"
                      >
                        <Ad ad={ad} />
                      </div>
                    )
                  })} */}
                {secondContent}
                {/* {adsSingleArticleBelow &&
                  adsSingleArticleBelow.length > 0 &&
                  adsSingleArticleBelow.map((ad) => {
                    return (
                      <div
                        key={ad.id}
                        className="-ml-4 w-[100vw] md:ml-0 md:w-full"
                      >
                        <Ad ad={ad} />
                      </div>
                    )
                  })} */}
              </React.Fragment>
            </WpPostBody>
          </div>
          <section className="my-6 flex flex-wrap gap-3" id="tag">
            {tags?.map((tag: { slug: string; name: string }) => {
              return (
                <Button
                  aria-label={`Open ${tag.name}`}
                  key={tag.slug}
                  asChild
                  className={cn(
                    "h-auto rounded-md bg-main !px-[9px] !py-[5px] text-[11px] uppercase text-info-foreground hover:bg-main",
                  )}
                >
                  <a
                    aria-label={`Open ${tag.name}`}
                    href={wpTagPathBySlug(tag.slug)}
                  >
                    {tag.name}
                  </a>
                </Button>
              )
            })}
          </section>
          {/* <StaticShare
            locale={locale}
            title={title}
            categorySlug={primaryData?.slug as never as string}
            postSlug={slug}
          /> */}
          {/* <React.Suspense
            fallback={<Skeleton className="h-20 w-full rounded" />}
          >
            <section className="my-5" id="comment">
              <div className="mb-5 flex flex-col justify-center">
                <WpComment locale={locale} wp_post_slug={slug} />
              </div>
            </section>
          </React.Suspense> */}
          {/* {gadgets?.length && gadgets?.length > 0 ? (
            <div className="my-5">
              <h2 className="mb-2 border-b-4 text-primary">In This Article</h2>
              <section className="w-full rounded-lg bg-background text-foreground shadow-lg"> */}
          {/* {gadgets?.map((game) => {
                  return (
                    <div
                      key={game.id}
                      className="object-info page-content relative mx-auto my-0 flex h-auto gap-[18px] p-6"
                    >
                      <div className="object-thumbnail mini relative m-0 aspect-[1] h-auto w-[56px] self-center p-0 lg:w-[114px]">
                        <Image
                          className="absolute !top-1.5 h-full w-full overflow-hidden rounded-xl bg-muted/60 object-cover opacity-60 blur-[4px]"
                          src={game?.featured_image?.url!}
                          title={game.title}
                          alt={game.title}
                        />
                        <Image
                          className="!relative h-full w-full overflow-hidden rounded-xl bg-muted/60 object-cover"
                          src={game?.featured_image?.url!}
                          title={game.title}
                          alt={game.title}
                        />
                      </div>
                      <div className="object-details grid grid-rows-[min-content_1fr] items-end">
                        <div className="meta text-sm">
                          <h2 className="object-title m-0 p-0 leading-[1.25]">
                            <NextLink
                              title={game.title}
                              className="evidence opt-internal"
                              href={`/gadgets/${game.slug}`}
                            >
                              {game.title}
                            </NextLink> */}
          {/* </h2> */}
          {/* <span className="txt spacing-1 text-[11px] font-bold uppercase tracking-wide">
                            {game.publishers}
                          </span> */}
          {/* </div>
                      </div>
                    </div>
                  )
                })}
              </section>
            </div>
          ) : null} */}
          <section className="mb-20">
            {isMain === true && (
              <>
                <div className="mb-2">
                  <h2 className="border-primary-400 border-b-4 text-primary">
                    Related Posts
                  </h2>
                </div>
                <div className="grid grid-cols-[repeat(1,1fr)] gap-4 md:grid-cols-2">
                  {relatedPosts?.slice(0, 4).map((post) => {
                    return (
                      <article
                        className="border-b-2 border-border"
                        key={post.title}
                      >
                        <a
                          aria-label={post.title}
                          href={splitUriWP(post.uri, post.slug)}
                        >
                          <p className="font-semibold hover:text-primary">
                            {post.title}
                          </p>
                        </a>
                      </article>
                    )
                  })}
                </div>
              </>
            )}
          </section>
        </article>
      </>
    )
  },
)

export default WpPostContent
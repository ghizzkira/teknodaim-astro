import * as React from "react"

import Ad from "@/components/Ad"
import Image from "@/components/Image"
import Link from "@/components/Link"
import StaticShare from "@/components/Share/StaticShare"
import { Button } from "@/components/UI/Button"
import { ButtonGroup } from "@/components/UI/ButtonGroup"
import { type SelectAd as AdProps } from "@/lib/db/schema/ad"
import { type SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"

interface ArticleContentProps {
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
    date: string
    featuredImageCaption: string
    featuredImageUrl: string
    featuredImageAlt: string
  }

  posts?:
    | Pick<ArticleProps, "id" | "slug" | "language" | "title" | "excerpt">[]
    | null
  isMain?: boolean
  adsSingleArticleAbove: Partial<AdProps>[]
  adsSingleArticleBelow: Partial<AdProps>[]
  adsSingleArticleInline: Partial<AdProps>[]
  adsSingleArticlePopUp: Partial<AdProps>[]
  firstContent: React.ReactNode | null
  secondContent: React.ReactNode | null
  locale: LanguageType
}

export const ArticleContent: React.FunctionComponent<ArticleContentProps> = (
  props,
) => {
  const {
    posts,
    isMain,
    postData,
    adsSingleArticleAbove,
    adsSingleArticleBelow,
    adsSingleArticleInline,
    firstContent,
    secondContent,
    locale,
  } = props

  const {
    title,
    categories,
    featuredImageCaption,
    featuredImageUrl,
    featuredImageAlt,
    slug,
  } = postData

  return (
    <>
      <article id={postData?.slug} className="article-divider px-4">
        <ButtonGroup className="space-x-2">
          {categories?.map((category, i) => {
            if (i < 2) {
              return (
                <Button
                  size={null}
                  key={category.name}
                  aria-label={category.title}
                  className={cn(
                    "mb-2 h-auto rounded-full bg-muted !px-[9px] !py-[5px] uppercase text-foreground transition-all duration-300 ease-in-out hover:bg-main hover:text-white",
                  )}
                  asChild
                >
                  <Link
                    locale={locale}
                    aria-label={category.title}
                    className="text-[11px]"
                    href={`/article/topic/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                </Button>
              )
            }
            return
          })}
        </ButtonGroup>
        <h1 className="mb-2 mt-4 line-clamp-none border-b border-border pb-2 text-[25px] font-bold leading-[1.7] md:border-none md:text-[40px] md:leading-[43px]">
          {title}
        </h1>

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
            categorySlug={"article"}
            postSlug={slug}
          />
          <section className="article-body w-full space-y-4">
            {adsSingleArticleAbove &&
              adsSingleArticleAbove.length > 0 &&
              adsSingleArticleAbove.map((ad) => {
                return <Ad ad={ad} key={ad.id} />
              })}
            {firstContent}

            {adsSingleArticleInline &&
              adsSingleArticleInline.length > 0 &&
              adsSingleArticleInline.map((ad) => {
                return <Ad ad={ad} key={ad.id} />
              })}
            {secondContent}
            {adsSingleArticleBelow &&
              adsSingleArticleBelow.length > 0 &&
              adsSingleArticleBelow.map((ad) => {
                return <Ad ad={ad} key={ad.id} />
              })}
          </section>
        </div>

        {/* <React.Suspense>
          <section className="my-5" id="comment">
            <div className="mb-5 flex flex-col justify-center">
              <ArticleComment locale={locale} article_id={postData.id} />
            </div>
          </section>
        </React.Suspense> */}
        <section className="mb-20">
          {isMain === true && (
            <>
              <div className="mb-2">
                <div className="border-b-4 border-primary/40 text-primary">
                  Related Posts
                </div>
              </div>
              <div className="grid grid-cols-[repeat(1,1fr)] gap-4 md:grid-cols-2">
                {posts?.map((post) => {
                  return (
                    <article
                      className="border-b-2 border-border"
                      key={post.title}
                    >
                      <Link
                        locale={locale}
                        aria-label={post.title}
                        href={"/article/" + post.slug}
                      >
                        <p className="font-semibold hover:text-primary">
                          {post.title}
                        </p>
                      </Link>
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
}

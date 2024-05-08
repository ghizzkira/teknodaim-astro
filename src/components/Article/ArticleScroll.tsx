import * as React from "react"

import Ad from "@/components/Ad"
import Image from "@/components/Image"
import Link from "@/components/Link"
import PostInfo from "@/components/PostInfo"
import StaticShare from "@/components/Share/StaticShare"
import { Button } from "@/components/UI/Button"
import { ButtonGroup } from "@/components/UI/ButtonGroup"
import type { SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import type { SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { SelectTopic as TopicProps } from "@/lib/db/schema/topic"
import type { SelectUser as UserProps } from "@/lib/db/schema/user"
import type { AdType } from "@/lib/validation/ad"
import type { LanguageType } from "@/lib/validation/language"

import Ad from "@/components/Ad"
import Image from "@/components/Image"
import Link from "@/components/Link"
import PostInfo from "@/components/PostInfo"
import StaticShare from "@/components/Share/StaticShare"
import { Button } from "@/components/UI/Button"
import { ButtonGroup } from "@/components/UI/ButtonGroup"
import type { SelectArticle as ArticleProps } from "@/lib/db/schema/article"
import type { SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { SelectTopic as TopicProps } from "@/lib/db/schema/topic"
import type { SelectUser as UserProps } from "@/lib/db/schema/user"
import type { AdType } from "@/lib/validation/ad"
import type { LanguageType } from "@/lib/validation/language"

interface ArticleScrollProps {
  article: Partial<
    ArticleProps & { topics: Partial<TopicProps>[] } & {
      authors: Partial<UserProps>[]
    } & { featured_image: Partial<MediaProps> }
  >
  posts: Partial<ArticleProps>[] | null
  adsSingleArticleAbove:
    | {
        id: string
        content: string
        type: AdType
      }[]
    | null
  adsSingleArticleBelow:
    | {
        id: string
        content: string
        type: AdType
      }[]
    | null
  adsSingleArticleInline:
    | {
        id: string
        content: string
        type: AdType
      }[]
    | null
  adsSingleArticlePopUp:
    | {
        id: string
        content: string
        type: AdType
      }[]
    | null
  locale: LanguageType
  firstContent: React.ReactNode | null
}

const ArticleScroll = React.forwardRef<HTMLDivElement, ArticleScrollProps>(
  (props, ref) => {
    const {
      article,
      adsSingleArticleAbove,
      adsSingleArticleBelow,
      adsSingleArticleInline,
      locale,
      firstContent,
    } = props

    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    const main_author = article.authors && article.authors[0]

    return (
      <>
        <article id={article.slug} ref={ref} className="article-divider px-4">
          <ButtonGroup className="space-x-2">
            {article.topics?.map((category, i) => {
              if (i < 2) {
                return (
                  <Button
                    size={null}
                    key={category.title}
                    aria-label={category.title}
                    className="mb-2 rounded-full px-3 py-1 uppercase"
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
            {article.title}
          </h1>
          <div className="mb-2">
            <PostInfo
              locale={locale}
              authorName={main_author?.name!}
              authorAvatarUrl={main_author?.image!}
              authorSlug={main_author?.username!}
              date={article?.createdAt as unknown as string}
            />
          </div>
          <div className="relative aspect-video w-full">
            <Image
              src={article?.featured_image?.url!}
              className="max-w-auto relative aspect-video w-full overflow-hidden rounded object-cover"
              alt={article.title!}
              sizes="(max-width: 768px) 300px, 500px"
              width={"500"}
              height={"500"}
            />
          </div>
          {article.title && (
            <div
              className="text-center text-xs italic text-foreground"
              dangerouslySetInnerHTML={{ __html: article.title }}
            />
          )}
          <div className="mt-[30px] flex flex-col">
            <StaticShare
              locale={locale}
              title={article.title!}
              categorySlug="article"
              postSlug={article?.slug!}
            />
            <section className="article-body mb-4 max-h-[300px] space-y-4 overflow-y-hidden pt-4">
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

              {adsSingleArticleBelow &&
                adsSingleArticleBelow.length > 0 &&
                adsSingleArticleBelow.map((ad) => {
                  return <Ad ad={ad} key={ad.id} />
                })}
            </section>
            <div className="relative my-4 flex justify-center from-60% to-40% before:absolute before:bottom-[99%] before:right-0 before:block before:h-[150px] before:w-full before:bg-gradient-to-t before:from-background  before:to-transparent">
              <Button aria-label="Read more" type="button" asChild>
                <Link
                  locale={locale}
                  aria-label="Read more"
                  href={`/article/${article.slug}`}
                >
                  Read more
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </>
    )
  },
)

export default ArticleScroll

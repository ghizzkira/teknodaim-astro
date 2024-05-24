import * as React from "react"

import type {
  SelectAd,
  SelectTopic,
  SelectUser,
  SelectVideoEmbed,
} from "@/lib/db/schema"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import Ad from "@/components/Ad"
import { VideoEmbedComment } from "@/components/Comment/VideoEmbedComment"
import VideoNav from "@/components/Layout/VideoNav"
import ParseContent from "@/components/ParseContent"
import PostInfo from "@/components/PostInfo"
import VideoEmbedCardHorizontal from "./VideoEmbedCardHorizontal"
import YoutubeEmbedAutoPlay from "@/components/Embed/YoutubeEmbedAutoPlay"
import { formatDateFromNow } from "@/lib/utils/date"
import Link from "@/components/Link"
import Image from "@/components/Image"
import StickyVideoNavWrapper from "@/components/Layout/StickyVideoNavWrapper"

interface VideoContentProps {
  videoEmbed: Partial<SelectVideoEmbed> & {
    authors?: Partial<SelectUser>[]
    topics: Partial<SelectTopic>[]
  }
  locale: LanguageType
  className?: string
  videos?: (Partial<SelectVideoEmbed> & {
    authors?: Partial<SelectUser>[]
    topics?: Partial<SelectTopic>[]
  })[]
  topics?: Partial<SelectTopic>[]
  adsSingleVideoAbove?: Pick<SelectAd, "content" | "id" | "type">[]
  adsSingleVideoBelow?: Pick<SelectAd, "content" | "id" | "type">[]
}

export const VideoContent = (props: VideoContentProps) => {
  const {
    videoEmbed,
    locale,
    className,
    adsSingleVideoBelow,
    adsSingleVideoAbove,
    topics,
    videos,
  } = props

  const [openDetails, setOpenDetails] = React.useState(false)

  const arr = videoEmbed?.embedLink?.split(
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
  )
  const mainAuthor = videoEmbed?.authors?.[0]
  const mainTopic = videoEmbed?.topics?.[0]

  const description = ParseContent({
    htmlInput: videoEmbed?.description!,
    title: videoEmbed?.title!,
    locale: locale,
  })

  return (
    <div className={cn(className)}>
      {videoEmbed?.embedLink?.includes("tiktok") ? (
        <div className="mx-auto mb-5 flex w-full justify-center lg:float-left lg:w-8/12">
          {/* TO DO Fix Tiktok embed */}
          {/* <TikTokEmbed width="100%" url={videoEmbed.embedLink} /> */}
        </div>
      ) : videoEmbed?.embedLink?.includes("youtube") ? (
        <section className="justify-centershadow-[0px_-20px_0px_20px_rgb(255_255_255)] sticky top-[65px] z-[51] mx-auto flex w-full max-sm:mb-5 sm:static sm:px-4 sm:shadow-none lg:float-left lg:w-8/12">
          {arr && (
            <YoutubeEmbedAutoPlay
              title={videoEmbed?.title ?? ""}
              src={arr[3]! ?? arr[0]!}
              className="yt-lite aspect-video h-full w-full md:rounded-md"
              image={videoEmbed.featuredImageUrl ?? ""}
            />
          )}
        </section>
      ) : null}
      <aside className="hidden w-full sm:px-4 lg:float-right lg:block lg:w-4/12">
        <div className="sticky top-4 rounded-xl border border-border sm:p-4">
          {topics && (
            <div>
              <VideoNav locale={locale} topics={topics} />
            </div>
          )}
          <div className="flex flex-col gap-3">
            {videos?.map((video) => {
              const mainAuthor = video?.authors?.[0] && video.authors[0]
              return (
                <VideoEmbedCardHorizontal
                  key={video.id}
                  title={video.title ?? ""}
                  featuredImageUrl={video.featuredImageUrl ?? ""}
                  slug={video.slug ?? ""}
                  authorSlug={mainAuthor?.username ?? ""}
                  authorName={mainAuthor?.name ?? ""}
                  date={
                    (video.createdAt as unknown as Date) ??
                    ("" as unknown as Date)
                  }
                  locale={locale}
                />
              )
            })}
          </div>
        </div>
      </aside>
      <div className="mt-5 w-full lg:float-left lg:w-8/12">
        <h1 className="mb-[10px] line-clamp-none px-4 text-[23px] font-bold leading-[1.2]">
          {videoEmbed?.title}
        </h1>
        <section className="px-4">
          {mainAuthor && (
            <PostInfo
              authorName={mainAuthor.name ?? ""}
              authorAvatarUrl={mainAuthor.image ?? ""}
              authorSlug={mainAuthor.username ?? ""}
              date={(videoEmbed.createdAt ?? "") as unknown as string}
              locale={locale}
            />
          )}
        </section>
        {adsSingleVideoAbove &&
          adsSingleVideoAbove.length > 0 &&
          adsSingleVideoAbove.map((ad) => {
            return <Ad key={ad.id} ad={ad} />
          })}
        <section
          onClick={() => {
            if (!openDetails) setOpenDetails((prev) => !prev)
          }}
          className={cn(
            "relative mx-4 mb-[25px] mt-5 rounded bg-muted p-2 text-[16px] leading-[1.3] text-foreground transition-all duration-300 ease-in",
            !openDetails && "cursor-pointer",
          )}
        >
          <span className="mb-2 font-bold">
            <span>{formatDateFromNow(videoEmbed?.createdAt!, locale)}</span>
            {videoEmbed?.topics?.map((topic) => {
              return (
                <span key={topic.id} className="ml-2 text-primary">
                  <Link
                    locale={locale}
                    aria-label={`Open ${topic.title}`}
                    href={`/video/topic/${topic.slug}`}
                  >
                    #{topic.title}
                  </Link>
                </span>
              )
            })}
          </span>
          <span
            className={cn(
              "article-body space-y-4 transition-all duration-300 ease-in",
              openDetails ? "" : "line-clamp-4",
            )}
          >
            {description}
          </span>
          <section
            className={cn("flex-column my-5", openDetails ? "flex" : "hidden")}
          >
            <div className="my-2 flex flex-row items-center gap-2">
              <div className="flex flex-row items-center">
                {mainAuthor?.image && (
                  <Link
                    locale={locale}
                    aria-label={mainAuthor?.name ?? ""}
                    href={`/video/author/${mainAuthor?.username}`}
                    className="relative block h-[72px] w-[72px] "
                  >
                    <Image
                      src={mainAuthor.image}
                      className="overflow-hidden rounded-full"
                      alt={mainAuthor?.name ?? ""}
                      sizes="(max-width: 768px) 50px, 50px"
                      width="72"
                      height="72"
                    />
                  </Link>
                )}
                <div className="ml-[5px] flex flex-col">
                  <Link
                    locale={locale}
                    aria-label={mainAuthor?.name ?? ""}
                    href={`/video/author/${mainAuthor?.username}`}
                  >
                    <h4 className="ml-2 !text-lg">{mainAuthor?.name ?? ""}</h4>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          {!openDetails ? (
            <span className="font-bold">More</span>
          ) : (
            <p
              onClick={() => {
                if (openDetails) setOpenDetails((prev) => !prev)
              }}
              className="mt-10 cursor-pointer font-bold"
            >
              Less
            </p>
          )}
        </section>
        {mainTopic && (
          <div className="mx-4 mb-[25px] flex h-[100px] w-[280px] items-center rounded-md bg-muted p-2 text-base leading-[1.3]">
            <Link
              locale={locale}
              aria-label={mainTopic?.title}
              className="flex flex-col gap-3"
              href={`/video/topic/${mainTopic?.slug}`}
            >
              <span className="text-base">{mainTopic?.title}</span>
              <span className="text-[14px] font-[500]">{`More ${mainTopic?.title}`}</span>
            </Link>
          </div>
        )}
        {adsSingleVideoBelow &&
          adsSingleVideoBelow.length > 0 &&
          adsSingleVideoBelow.map((ad) => {
            return <Ad key={ad.id} ad={ad} />
          })}

        {videoEmbed.id && (
          <React.Suspense>
            <section className="my-5 px-4" id="comment">
              <div className="mb-5 flex flex-col justify-center">
                <VideoEmbedComment
                  locale={locale}
                  videoEmbedId={videoEmbed.id}
                />
              </div>
            </section>
          </React.Suspense>
        )}
      </div>
      <aside className="w-full sm:px-4 lg:hidden">
        <div className="sticky top-4 rounded-xl border border-border sm:p-4">
          {topics && (
            <StickyVideoNavWrapper>
              <VideoNav topics={topics} locale={locale} />
            </StickyVideoNavWrapper>
          )}
          <div className="flex flex-col gap-3">
            {videos?.map((video) => {
              const mainAuthor = video?.authors?.[0] && video.authors[0]
              return (
                <VideoEmbedCardHorizontal
                  key={video.id}
                  title={video.title ?? ""}
                  featuredImageUrl={video.featuredImageUrl ?? ""}
                  slug={video.slug ?? ""}
                  authorSlug={mainAuthor?.username ?? ""}
                  authorName={mainAuthor?.name ?? ""}
                  date={
                    (video.createdAt as unknown as Date) ??
                    ("" as unknown as Date)
                  }
                  locale={locale}
                />
              )
            })}
          </div>
        </div>
      </aside>
      <div className="lg:clear-both" />
    </div>
  )
}

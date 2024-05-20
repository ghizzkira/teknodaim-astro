import * as React from "react"

import type { LanguageType } from "@/lib/validation/language"
import type {
  SelectDownload,
  SelectMedia,
  SelectDownloadFile,
} from "@/lib/db/schema"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/UI/Breadcrumb"
import DownloadCard from "./DownloadCard"
import DownloadCardSide from "./DownloadCardSide"
import DownloadSearch from "./DownloadSearch"
import { useGetDownloadsSearch } from "@/hooks/useDownload"

type DownloadDataProps = Partial<SelectDownload> & {
  featuredImage: Pick<SelectMedia, "url">
  downloadFiles?: Partial<SelectDownloadFile>[]
}

interface SearchProps {
  downloads: DownloadDataProps[] | null
  locale: LanguageType
}

export function DownloadSearchContent(props: SearchProps) {
  const { downloads, locale } = props
  const [currentQuery, setCurrentQuery] = React.useState("")

  React.useEffect(() => {
    const handleLocationChange = () => {
      const url = new URL(window.location.href)
      const searchParams = new URLSearchParams(url.search)
      const search = searchParams?.get("q")

      setCurrentQuery(search!)
    }

    handleLocationChange()
  }, [])

  const { data: resultsData } = useGetDownloadsSearch({
    query: currentQuery!,
    locale: locale,
  })

  return (
    <section className="fade-up-element flex w-full flex-col">
      <div className="relative mb-10 flex flex-col bg-gradient-to-r from-main to-main/80 py-10">
        <div className="absolute top-1 px-4">
          <Breadcrumb className="inline-flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[12px] text-foreground" href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="inline-flex list-none text-foreground" />
            <BreadcrumbLink
              className="text-[12px] text-foreground"
              href="/download/"
            >
              Download
            </BreadcrumbLink>
            <BreadcrumbSeparator className="inline-flex list-none text-foreground" />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-[12px] text-foreground">
                {currentQuery}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="self-center">
          <h2>
            {currentQuery !== undefined || null
              ? `Search results for "${currentQuery}"`
              : "Search"}
          </h2>
        </div>
      </div>
      <div className="mx-4 flex w-full flex-row px-4 md:mx-auto md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col lg:mr-4">
          <div className="mb-4 rounded-md p-2">
            <DownloadSearch />
          </div>
          <div className="w-full px-4">
            {resultsData !== undefined ? (
              <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {resultsData?.map((download) => {
                  return (
                    <DownloadCard
                      locale={locale}
                      key={download.id}
                      download={download}
                    />
                  )
                })}
              </div>
            ) : (
              <>
                <div>
                  {currentQuery} not found. Please try with another keyword
                </div>
              </>
            )}
          </div>
        </div>
        <aside className="hidden w-4/12 lg:block">
          <div className="sticky top-8 rounded-xl border border-border p-4">
            <div className="mb-4">
              <h4 className="text-transparent">
                <span className="after:absolute after:left-1/2 after:top-[40px] after:ml-[-25px] after:h-[3px] after:w-[50px] after:border after:border-main after:bg-main">
                  Trending
                </span>
              </h4>
            </div>
            {downloads !== undefined &&
              downloads?.map((download) => {
                return (
                  <DownloadCardSide
                    locale={locale}
                    key={download.id}
                    src={download.featuredImage?.url!}
                    title={download.title!}
                    slug={`/download/${download?.type?.toLowerCase()}/${
                      download.slug
                    }`}
                  />
                )
              })}
          </div>
        </aside>
      </div>
    </section>
  )
}

import DownloadTable from "./DashboardDownloadTable"
import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"
import type { SelectDownload, SelectMedia } from "@/lib/db/schema"
import { Button } from "@/components/UI/Button"
import { cn } from "@/lib/utils/style"
import DashboardAddNew from "@/components/Dashboard/DashboardAddNew"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"
import React from "react"

interface DownloadsProps extends SelectDownload {
  downloadTranslation: {
    downloads: Partial<SelectDownload>[]
  }
  featuredImage: Partial<SelectMedia>
}

interface DashboardDownloadContentProps {
  currentLanguage: LanguageType
  page: number
  lastPage: number
  downloads: DownloadsProps[]
}

export default function DashboardDownloadContent(
  props: DashboardDownloadContentProps,
) {
  const { currentLanguage, downloads, lastPage, page } = props
  React.useEffect(() => {
    if (lastPage && page !== 1 && page > lastPage) {
      const currentUrl = new URL(window.location.href)
      const params = new URLSearchParams(currentUrl.searchParams)
      params.set("page", lastPage.toString())
      window.location.replace(`/dashboard/download/?${params.toString()}`)
    }
  }, [lastPage, page])

  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Downloads</DashboardHeading>
        <DashboardAddNew url="/dashboard/download/new" />
      </div>
      <div>
        <div className="inline-block space-x-2 rounded-md bg-muted p-1">
          <Button
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
              currentLanguage === "id" &&
                "bg-background text-foreground hover:bg-background hover:text-foreground",
            )}
            onClick={() =>
              window.location.replace("/dashboard/download/?language=id")
            }
          >
            <Icon.IndonesiaFlag className="mr-2 size-4" />
            Indonesia
          </Button>
          <Button
            className={cn(
              "inline-flex h-8 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground hover:bg-muted hover:text-muted-foreground",
              currentLanguage === "en" &&
                "bg-background text-foreground hover:bg-background hover:text-foreground",
            )}
            onClick={() =>
              window.location.replace("/dashboard/download/?language=en")
            }
          >
            <Icon.USAFlag className="mr-2 size-4" />
            English
          </Button>
        </div>
        {downloads !== undefined && downloads.length > 0 ? (
          <DownloadTable
            downloads={downloads ?? 1}
            paramsName="page"
            page={page ? page : 1}
            lastPage={lastPage ?? 1}
          />
        ) : (
          <div className="my-64 flex items-center justify-center">
            <h3 className="text-center text-4xl font-bold">Not found</h3>
          </div>
        )}
      </div>
    </div>
  )
}

import ArticleTable from "./DashboardArticleTable"
import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"
import type { SelectArticle, SelectMedia } from "@/lib/db/schema"
import { Button } from "@/components/UI/Button"
import { cn } from "@/lib/utils/style"
import DashboardAddNew from "@/components/Dashboard/DashboardAddNew"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"
import * as React from "react"

interface ArticlesProps extends SelectArticle {
  articleTranslation: {
    articles: Partial<SelectArticle>[]
  }
  featuredImage: Partial<SelectMedia>
}

interface DashboardArticleContentProps {
  currentLanguage: LanguageType
  page: number
  lastPage: number
  articles: ArticlesProps[]
}

export default function DashboardArticleContent(
  props: DashboardArticleContentProps,
) {
  const { currentLanguage, articles, lastPage, page } = props
  React.useEffect(() => {
    if (lastPage && page !== 1 && page > lastPage) {
      const currentUrl = new URL(window.location.href)
      const params = new URLSearchParams(currentUrl.searchParams)
      params.set("page", lastPage.toString())
      window.location.replace(`/dashboard/article/?${params.toString()}`)
    }
  }, [lastPage, page])

  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Articles</DashboardHeading>
        <DashboardAddNew url="/dashboard/article/new" />
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
              window.location.replace("/dashboard/article/?language=id")
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
              window.location.replace("/dashboard/article/?language=en")
            }
          >
            <Icon.USAFlag className="mr-2 size-4" />
            English
          </Button>
        </div>
        {articles !== undefined && articles.length > 0 ? (
          <ArticleTable
            articles={articles ?? 1}
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

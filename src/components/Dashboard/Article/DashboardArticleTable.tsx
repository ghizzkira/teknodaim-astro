import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { toast } from "@/components/UI/Toast/useToast"
import { useDeleteArticle } from "@/hooks/useArticle"
import type { SelectArticle } from "@/lib/db/schema/article"
import { formatDate } from "@/lib/utils/date"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import DashboardStatusBadge from "@/components/Dashboard/DashboardStatusBadge"
import DashboardArticleVisibilityBadge from "@/components/Dashboard/DashboardArticleVisibilityBadge"
import type { SelectMedia } from "@/lib/db/schema"

interface ArticlesProps extends SelectArticle {
  articleTranslation: {
    articles: Partial<SelectArticle>[]
  }
  featuredImage: Partial<SelectMedia>
}

interface ArticleTableProps {
  articles: ArticlesProps[]
  paramsName: string
  page: number
  lastPage: number
}

export default function ArticleTable(props: ArticleTableProps) {
  const { articles, paramsName, page, lastPage } = props

  const { handleDeleteArticle: deleteArticle } = useDeleteArticle({
    onSuccess: () => {
      toast({ variant: "success", description: "Article has been deleted" })
      window.location.reload()
    },
    onError: () => {
      toast({
        description: "Error when deleting article, try again",
        variant: "warning",
      })
    },
  })

  return (
    <div className="relative w-full overflow-auto">
      <Table className="table-fixed border-collapse border-spacing-0">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Slug
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Status
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Visibility
            </TableHead>
            <TableHead className="hidden whitespace-nowrap lg:table-cell">
              Published Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => {
            return (
              <TableRow key={article.id}>
                <TableCell className="max-w-[120px] align-middle">
                  <div className="flex flex-col">
                    <span className="line-clamp-3 font-medium">
                      {article.title}
                    </span>
                    <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                      <span>{article.slug}</span>
                      <span className="pr-1">,</span>
                      <span>{article.visibility}</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <span className="overflow-hidden text-ellipsis font-medium">
                      {article.slug}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <DashboardStatusBadge status={article.status}>
                      {article.status}
                    </DashboardStatusBadge>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <DashboardArticleVisibilityBadge
                      visibility={article.visibility}
                    >
                      {article.visibility}
                    </DashboardArticleVisibilityBadge>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    {formatDate(article.createdAt!, "LL")}
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle">
                  {article.articleTranslation.articles.length > 1 ? (
                    <DashboardShowOptions
                      onDelete={() => {
                        void deleteArticle(article.id)
                      }}
                      editUrl={`/dashboard/article/edit/${article.id}`}
                      viewUrl={`/article/${article.slug}`}
                      description={article.title}
                    />
                  ) : (
                    <DashboardShowOptions
                      onDelete={() => {
                        void deleteArticle(article.id)
                      }}
                      editUrl={`/dashboard/article/edit/${article.id}`}
                      translateUrl={
                        article.language === "id"
                          ? `/dashboard/article/translate/en/${article.articleTranslationId}`
                          : `/dashboard/article/translate/id/${article.articleTranslationId}`
                      }
                      viewUrl={`/article/${article.slug}`}
                      description={article.title}
                    />
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {lastPage ? (
        <DashboardPagination
          currentPage={page}
          lastPage={lastPage ?? 1}
          paramsName={paramsName}
        />
      ) : null}
    </div>
  )
}

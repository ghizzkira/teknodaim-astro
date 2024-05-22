import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { toast } from "@/components/UI/Toast/useToast"
import { useDeleteDownload } from "@/hooks/useDownload"
import type { SelectDownload } from "@/lib/db/schema/download"
import { formatDate } from "@/lib/utils/date"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import DashboardStatusBadge from "@/components/Dashboard/DashboardStatusBadge"
import type { SelectMedia } from "@/lib/db/schema"

interface DownloadsProps extends SelectDownload {
  downloadTranslation: {
    downloads: Partial<SelectDownload>[]
  }
  featuredImage: Partial<SelectMedia>
}

interface DownloadTableProps {
  downloads: DownloadsProps[]
  paramsName: string
  page: number
  lastPage: number
}

export default function DownloadTable(props: DownloadTableProps) {
  const { downloads, paramsName, page, lastPage } = props

  const { handleDeleteDownload: deleteDownload } = useDeleteDownload({
    onSuccess: () => {
      toast({ variant: "success", description: "Download has been deleted" })
      window.location.reload()
    },
    onError: () => {
      toast({
        description: "Error when deleting download, try again",
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
              Published Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {downloads.map((download) => {
            return (
              <TableRow key={download.id}>
                <TableCell className="max-w-[120px] align-middle">
                  <div className="flex flex-col">
                    <span className="line-clamp-3 font-medium">
                      {download.title}
                    </span>
                    <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                      <span>{download.slug}</span>
                      <span className="pr-1">,</span>
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <span className="overflow-hidden text-ellipsis font-medium">
                      {download.slug}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    <DashboardStatusBadge status={download.status}>
                      {download.status}
                    </DashboardStatusBadge>
                  </div>
                </TableCell>
                <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                  <div className="flex">
                    {formatDate(download.createdAt!, "LL")}
                  </div>
                </TableCell>
                <TableCell className="p-4 align-middle">
                  {download.downloadTranslation.downloads.length > 1 ? (
                    <DashboardShowOptions
                      onDelete={() => {
                        void deleteDownload(download.id)
                      }}
                      editUrl={`/dashboard/download/edit/${download.id}`}
                      viewUrl={`/download/${download.slug}`}
                      description={download.title}
                    />
                  ) : (
                    <DashboardShowOptions
                      onDelete={() => {
                        void deleteDownload(download.id)
                      }}
                      editUrl={`/dashboard/download/edit/${download.id}`}
                      translateUrl={
                        download.language === "id"
                          ? `/dashboard/download/translate/en/${download.downloadTranslationId}`
                          : `/dashboard/download/translate/id/${download.downloadTranslationId}`
                      }
                      viewUrl={`/download/${download.type}/${download.slug}`}
                      description={download.title}
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

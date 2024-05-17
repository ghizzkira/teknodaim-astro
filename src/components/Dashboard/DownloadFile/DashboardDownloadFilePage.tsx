import { type SelectDownloadFile } from "@/lib/db/schema"

import {
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TableHeader,
} from "@/components/UI/Table"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import { toast } from "@/components/UI/Toast/useToast"
import { useDeleteDownloadFile } from "@/hooks/useDownloadFile"
import { formatDate } from "@/lib/utils/date"

interface DashboardDownloadFilePageProps {
  downloadFiles?: SelectDownloadFile[]
  paramsName: string
  page: number
  lastPage: number
}

const DashboardDownloadFilePage = (props: DashboardDownloadFilePageProps) => {
  const { downloadFiles, lastPage, page, paramsName } = props
  const { handleDeleteDownloadFile: deleteDownloadFile } =
    useDeleteDownloadFile({
      onSuccess: () => {
        toast({ variant: "success", description: "Success deleting file" })
        window.location.reload()
      },
    })
  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Download Files</DashboardHeading>
      </div>
      {downloadFiles !== undefined && downloadFiles.length > 0 ? (
        <div className="relative w-full overflow-auto">
          <Table className="table-fixed border-collapse border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Size
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Version
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Date Updated
                </TableHead>
                <TableHead className="hidden  whitespace-nowrap lg:table-cell">
                  Date Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {downloadFiles.map((downloadFile) => {
                return (
                  <TableRow key={downloadFile.id}>
                    <TableCell className="max-w-[120px] align-middle">
                      <div className="flex flex-col">
                        <span className="line-clamp-3 font-medium">
                          {downloadFile.title}
                        </span>
                        <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                          <span>{downloadFile.fileSize}</span>
                          <span className="pr-1">,</span>
                          <span className="uppercase">
                            {downloadFile.version}
                          </span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {downloadFile.fileSize}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {downloadFile.version}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        {formatDate(downloadFile?.updatedAt!, "LL")}
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex max-w-[50px]">
                        {formatDate(downloadFile?.createdAt!, "LL")}
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] p-4 align-middle">
                      <DashboardShowOptions
                        onDelete={() => deleteDownloadFile(downloadFile.id)}
                        editUrl={`/dashboard/download/file/edit/${downloadFile.id}`}
                        description={downloadFile.title!}
                      />
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
      ) : (
        <div className="my-64 flex items-center justify-center">
          <h3 className="text-center text-4xl font-bold">
            No user has been created
          </h3>
        </div>
      )}
    </div>
  )
}

export default DashboardDownloadFilePage

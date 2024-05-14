import { type SelectVideoEmbed } from "@/lib/db/schema"

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
import { useDeleteVideoEmbed } from "@/hooks/useVideoEmbed"
import { Badge } from "@/components/UI/Badge"
import { formatDate } from "@/lib/utils/date"

interface DashboardVideoEmbedPageProps {
  videoEmbeds?: SelectVideoEmbed[]
  paramsName: string
  page: number
  lastPage: number
}

const DashboardVideoEmbedPage = (props: DashboardVideoEmbedPageProps) => {
  const { videoEmbeds, lastPage, page, paramsName } = props
  const { handleDeleteVideoEmbed: deleteVideoEmbed } = useDeleteVideoEmbed({
    onSuccess: () => {
      toast({ variant: "success", description: "Success deleting video embed" })
      window.location.reload()
    },
  })
  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Video Embeds</DashboardHeading>
      </div>
      {videoEmbeds !== undefined && videoEmbeds.length > 0 ? (
        <div className="relative w-full overflow-auto">
          <Table className="table-fixed border-collapse border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Type
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Status
                </TableHead>
                <TableHead className="hidden  whitespace-nowrap lg:table-cell">
                  Date Joined
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videoEmbeds.map((videoEmbed) => {
                return (
                  <TableRow key={videoEmbed.id}>
                    <TableCell className="max-w-[120px] align-middle">
                      <div className="flex flex-col">
                        <span className="line-clamp-3 font-medium">
                          {videoEmbed.title}
                        </span>
                        <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                          <span>{videoEmbed.type}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {videoEmbed.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <Badge>{videoEmbed.status}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex max-w-[50px]">
                        {formatDate(videoEmbed?.createdAt!, "LL")}
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] p-4 align-middle">
                      <DashboardShowOptions
                        onDelete={() => deleteVideoEmbed(videoEmbed.id)}
                        editUrl={`/dashboard/video-embed/edit/${videoEmbed.id}`}
                        description={videoEmbed.title!}
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

export default DashboardVideoEmbedPage

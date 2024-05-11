import { type SelectAd } from "@/lib/db/schema"

import {
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TableHeader,
} from "@/components/UI/Table"
import DashboardAdPositionBadge from "@/components/Dashboard/DashboardAdPositionBadge"
import DashboardAddNew from "@/components/Dashboard/DashboardAddNew"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import { useDeleteAd } from "@/hooks/useAd"
import { toast } from "@/components/UI/Toast/useToast"

interface DashboardAdPageProps {
  ads?: SelectAd[]
  paramsName: string
  page: number
  lastPage: number
}

const DashboardAdPage = (props: DashboardAdPageProps) => {
  const { ads, lastPage, page, paramsName } = props
  const { handleDeleteAd: deleteAd } = useDeleteAd({
    onSuccess: () => {
      toast({ variant: "success", description: "Success deleting ad" })
      window.location.reload()
    },
    onError: () => {
      toast({
        description: "Error when deleting ad, try again",
        variant: "warning",
      })
    },
  })
  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Ads</DashboardHeading>
        <DashboardAddNew url="/dashboard/ad/new" />
      </div>
      {ads !== undefined && ads.length > 0 ? (
        <div className="relative w-full overflow-auto">
          <Table className="table-fixed border-collapse border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden w-[100px] whitespace-nowrap lg:table-cell">
                  Type
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Position
                </TableHead>
                <TableHead className="hidden w-[80px] whitespace-nowrap lg:table-cell">
                  Active
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => {
                return (
                  <TableRow key={ad.id}>
                    <TableCell className="max-w-[120px] align-middle">
                      <div className="flex flex-col">
                        <span className="line-clamp-3 font-medium">
                          {ad.title}
                        </span>
                        <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                          <span className="uppercase">{ad.position}</span>
                          <span className="pr-1">,</span>
                          <span>{ad.active}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {ad.type.replace(/_/g, " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <DashboardAdPositionBadge position={ad.position!}>
                          {ad.position.replace(/_/g, " ")}
                        </DashboardAdPositionBadge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex max-w-[50px]">
                        {JSON.stringify(ad.active)}
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] p-4 align-middle">
                      <DashboardShowOptions
                        onDelete={() => deleteAd(ad.id)}
                        editUrl={`/dashboard/ad/edit/${ad.id}`}
                        description={ad.title!}
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
            No ads has been created
          </h3>
        </div>
      )}
    </div>
  )
}

export default DashboardAdPage

import { type SelectGadget } from "@/lib/db/schema"

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
import { useDeleteGadget } from "@/hooks/useGadget"
import { formatDate } from "@/lib/utils/date"
import DashboardAddNew from "@/components/Dashboard/DashboardAddNew"
import DashboardStatusBadge from "@/components/Dashboard/DashboardStatusBadge"

interface DashboardGadgetPageProps {
  gadgets?: SelectGadget[]
  paramsName: string
  page: number
  lastPage: number
}

const DashboardGadgetPage = (props: DashboardGadgetPageProps) => {
  const { gadgets, lastPage, page, paramsName } = props
  const { handleDeleteGadget: deleteGadget } = useDeleteGadget({
    onSuccess: () => {
      toast({ variant: "success", description: "Success deleting gadget" })
      window.location.reload()
    },
  })
  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Gadgets</DashboardHeading>
        <DashboardAddNew url="/dashboard/gadget/new" />
      </div>
      {gadgets !== undefined && gadgets.length > 0 ? (
        <div className="relative w-full overflow-auto">
          <Table className="table-fixed border-collapse border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Wp Tag Slug
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Wp Category Slug
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Status
                </TableHead>
                <TableHead className="hidden  whitespace-nowrap lg:table-cell">
                  Date Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gadgets.map((gadget) => {
                return (
                  <TableRow key={gadget.id}>
                    <TableCell className="max-w-[120px] align-middle">
                      <div className="flex flex-col">
                        <span className="line-clamp-3 font-medium">
                          {gadget.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {gadget.wpTagSlug ?? "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {gadget.wpCategorySlug ?? "-"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <DashboardStatusBadge status={gadget.status}>
                          {gadget.status}
                        </DashboardStatusBadge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex max-w-[50px]">
                        {formatDate(gadget?.createdAt!, "LL")}
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] p-4 align-middle">
                      <DashboardShowOptions
                        onDelete={() => deleteGadget(gadget.id)}
                        editUrl={`/dashboard/gadget/edit/${gadget.id}`}
                        description={gadget.title!}
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
            No video embed has been created
          </h3>
        </div>
      )}
    </div>
  )
}

export default DashboardGadgetPage

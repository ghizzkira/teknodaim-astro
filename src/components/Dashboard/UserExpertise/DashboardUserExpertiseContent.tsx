import {
  TableHead,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TableHeader,
} from "@/components/UI/Table"

import DashboardAddNew from "@/components/Dashboard/DashboardAddNew"
import DashboardHeading from "@/components/Dashboard/DashboardHeading"
import DashboardPagination from "@/components/Dashboard/DashboardPagination"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import { toast } from "@/components/UI/Toast/useToast"
import type { UpdateUserLink as UserLinkProps } from "@/lib/validation/user-link"
import { useDeleteUserExpertise } from "@/hooks/useUserExpertise"

interface DashboardUserExpertisePageProps {
  userExpertises?: UserLinkProps[]
  paramsName: string
  page: number
  lastPage: number
}

const DashboardUserExpertisePage = (props: DashboardUserExpertisePageProps) => {
  const { userExpertises, lastPage, page, paramsName } = props
  const { handleDeleteUserExpertise: deleteUserExpertise } =
    useDeleteUserExpertise({
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Success deleting user expertise",
        })
        window.location.reload()
      },
      onError: () => {
        toast({
          description: "Error when deleting user expertise, try again",
          variant: "warning",
        })
      },
    })
  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>User expertises</DashboardHeading>
        <DashboardAddNew url="/dashboard/user-expertise/new" />
      </div>
      {userExpertises !== undefined && userExpertises.length > 0 ? (
        <div className="relative w-full overflow-auto">
          <Table className="table-fixed border-collapse border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden w-auto whitespace-nowrap lg:table-cell">
                  Url
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userExpertises.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className="max-w-[120px] align-middle">
                      <div className="flex flex-col">
                        <span className="line-clamp-3 font-medium">
                          {item.title}
                        </span>
                        <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                          <span className="lowercase">{item.url}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {item.url}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] p-4 align-middle">
                      <DashboardShowOptions
                        onDelete={() => deleteUserExpertise(item.id)}
                        editUrl={`/dashboard/user-expertise/edit/${item.id}`}
                        description={item.title!}
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
            No user expertises has been created
          </h3>
        </div>
      )}
    </div>
  )
}

export default DashboardUserExpertisePage

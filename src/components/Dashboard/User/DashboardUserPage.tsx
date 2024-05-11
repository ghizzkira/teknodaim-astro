import { type SelectUser } from "@/lib/db/schema"

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
import { useDeleteUser } from "@/hooks/useUser"
import { Badge } from "@/components/UI/Badge"
import { formatDate } from "@/lib/utils/date"

interface DashboardUserPageProps {
  users?: SelectUser[]
  paramsName: string
  page: number
  lastPage: number
  currentUserRole: UserRole
}

const DashboardUserPage = (props: DashboardUserPageProps) => {
  const { users, lastPage, page, paramsName, currentUserRole } = props
  const { handleDeleteUser: deleteUser } = useDeleteUser({
    onSuccess: () => {
      toast({ variant: "success", description: "Success deleting user" })
      window.location.reload()
    },
  })
  return (
    <div className="mx-4 mt-10 flex w-full flex-col">
      <div className="mb-8 flex justify-between">
        <DashboardHeading>Users</DashboardHeading>
      </div>
      {users !== undefined && users.length > 0 ? (
        <div className="relative w-full overflow-auto">
          <Table className="table-fixed border-collapse border-spacing-0">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Username
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Email
                </TableHead>
                <TableHead className="hidden whitespace-nowrap lg:table-cell">
                  Role
                </TableHead>
                <TableHead className="hidden  whitespace-nowrap lg:table-cell">
                  Date Joined
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell className="max-w-[120px] align-middle">
                      <div className="flex flex-col">
                        <span className="line-clamp-3 font-medium">
                          {user.name}
                        </span>
                        <span className="table-cell text-[10px] text-muted-foreground lg:hidden">
                          <span>{user.username}</span>
                          <span className="pr-1">,</span>
                          <span className="uppercase">{user.role}</span>
                          <span className="pr-1">,</span>
                          <span>{user.email}</span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden whitespace-nowrap align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {user.username}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <span className="overflow-hidden text-ellipsis font-medium">
                          {user.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex">
                        <Badge>{user.role}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      <div className="flex max-w-[50px]">
                        {formatDate(user?.createdAt!, "LL")}
                      </div>
                    </TableCell>
                    <TableCell className="w-[100px] p-4 align-middle">
                      <DashboardShowOptions
                        onDelete={
                          currentUserRole === "admin"
                            ? () => deleteUser(user.id)
                            : undefined
                        }
                        editUrl={`/dashboard/user/edit/${user.id}`}
                        description={user.name!}
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

export default DashboardUserPage

import type { UrlObject } from "url"
import * as React from "react"

import { AlertDelete } from "@/components/AlertDelete"
import { Button } from "@/components/UI/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/DropdownMenu"
import { Icon } from "@/components/UI/Icon"
import Link from "@/components/Link"

interface DashboardShowOptionsProps {
  onDelete?: () => void
  editUrl: string | UrlObject
  translateUrl?: string | UrlObject
  viewUrl?: string | UrlObject
  description?: string
}

const DashboardShowOptions: React.FC<DashboardShowOptionsProps> = (props) => {
  const { onDelete, editUrl, translateUrl, viewUrl, description } = props

  const [openDialog, setOpenDialog] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="ml-auto flex h-8">
            <Icon.MoreHorizontal className="mr-2 size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px] p-2">
          {onDelete && (
            <>
              <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                <Icon.Delete className="mr-2 size-4" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem asChild>
            <Link href={editUrl as string} locale={"id"}>
              <Icon.Edit className="mr-2 size-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {translateUrl && (
            <>
              <DropdownMenuItem asChild>
                <Link href={translateUrl as string} locale={"id"}>
                  <Icon.Add className="mr-2 size-4" />
                  Translate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {viewUrl && (
            <DropdownMenuItem asChild>
              <Link locale="id" href={viewUrl as string}>
                <Icon.ViewSidebar className="mr-2 size-4" />
                View
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {onDelete && (
        <AlertDelete
          description={description}
          isOpen={openDialog}
          className="max-w-[366px]"
          onDelete={onDelete}
          onClose={() => setOpenDialog(false)}
        />
      )}
    </>
  )
}

export default DashboardShowOptions

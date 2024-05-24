import * as React from "react"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table"
import { toast } from "@/components/UI/Toast/useToast"
import type { MenuPosition } from "@/lib/validation/menu"
import { useDeleteMenu } from "@/hooks/useMenu"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog"
import type { SelectMenu } from "@/lib/db/schema"
import { CreateMenuForm, EditMenuForm } from "./DashboardEditMenuForm"

interface MenuContentProps {
  initialMenus?:
    | Pick<
        SelectMenu,
        | "id"
        | "title"
        | "link"
        | "position"
        | "icon"
        | "iconDark"
        | "order"
        | "active"
      >[]
    | null
  position: MenuPosition
}

const MenuContent: React.FunctionComponent<MenuContentProps> = (props) => {
  const { initialMenus, position } = props
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false)
  const [openEditDialog, setOpenEditDialog] = React.useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState("")

  const [menus, setMenus] = React.useState<
    Pick<
      SelectMenu,
      | "id"
      | "title"
      | "link"
      | "position"
      | "icon"
      | "iconDark"
      | "order"
      | "active"
    >[]
  >(initialMenus ? initialMenus : [])

  const { handleDeleteMenu: deleteMenuAction } = useDeleteMenu({
    onSuccess: (data) => {
      if (data) {
        setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== data.id))
        toast({ variant: "success", description: "Menu has been deleted!" })
        window.location.reload()
      }
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Failed to delete! Please try again later",
      })
    },
  })

  const handleDeleteMenu = (id: string) => {
    deleteMenuAction(id)
  }

  const title = position.toUpperCase().replace(/_/g, " ")

  return (
    <div className="min-h-screen w-full px-2 py-5">
      <h1 className="mb-4 text-xl">{title}</h1>

      <Dialog onOpenChange={setOpenCreateDialog} open={openCreateDialog}>
        <DialogTrigger aria-label="Add Menu">Add Menu</DialogTrigger>
        <DialogContent>
          <div className="scrollbar-hide h-[80vh] w-full overflow-y-auto">
            <div className="px-4">
              <DialogTitle>Add Menu</DialogTitle>
              <CreateMenuForm
                position={position}
                onSuccess={() => setOpenCreateDialog(false)}
                setMenus={setMenus}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div>
        {menus && menus.length > 0 ? (
          <>
            <Table className="border-collapse border-spacing-0 overflow-x-scroll">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Order</TableHead>
                  <TableHead className="hidden md:table-cell">Link</TableHead>
                  <TableHead className="hidden md:table-cell">Active</TableHead>
                  <TableHead className="hidden md:table-cell">Icon</TableHead>
                  <TableHead className="table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus
                  .sort((a, b) => a.order - b.order)
                  .map((menu) => (
                    <TableRow key={menu.id}>
                      <TableCell className="line-clamp-3 max-w-[120px]">
                        <div className="flex flex-col space-y-2">
                          <span className="font-medium">{menu.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {menu.order}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {menu.link}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {menu.active ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {menu.icon?.includes("http") && (
                          <div className="relative mr-2 aspect-[1/1] h-5 w-5">
                            <Image
                              src={menu.icon}
                              alt={menu.title}
                              sizes={`(max-width: 1200px) 16px, 16px`}
                              width={"20"}
                              height={"20"}
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="table-cell space-x-2">
                        <Button
                          variant="outline"
                          aria-label="Edit Menu"
                          size={null}
                          className="rounded-full p-2"
                          onClick={() => setOpenEditDialog(menu.id)}
                        >
                          <Icon.Edit aria-label="Edit Menu" />
                        </Button>
                        <Dialog
                          onOpenChange={(open) => {
                            if (!open) {
                              setOpenEditDialog("")
                            }
                          }}
                          open={openEditDialog === menu.id}
                        >
                          <DialogContent>
                            <DialogTitle>Edit Menu</DialogTitle>
                            <div className="scrollbar-hide h-[80vh] overflow-y-auto">
                              <div className="px-4">
                                <EditMenuForm
                                  onSuccess={() => setOpenEditDialog(``)}
                                  setMenus={setMenus}
                                  menu={menu}
                                />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          type="button"
                          variant="outline"
                          aria-label="Delete Menu"
                          size={null}
                          className="rounded-full p-2"
                          onClick={() =>
                            setOpenDeleteDialog(`delete-${menu.id}`)
                          }
                        >
                          <Icon.Delete aria-label="Delete Menu" />
                        </Button>
                        <Dialog
                          onOpenChange={(open) => {
                            if (!open) {
                              setOpenDeleteDialog("")
                            }
                          }}
                          open={openDeleteDialog === `delete-${menu.id}`}
                        >
                          <DialogContent>
                            <DialogTitle>{`Are you sure to delete ${menu.title} ?`}</DialogTitle>
                            <div className="flex w-full justify-between">
                              <Button
                                type="button"
                                aria-label="Delete Menu"
                                onClick={() =>
                                  handleDeleteMenu(menu.id as string)
                                }
                              >
                                Delete
                              </Button>
                              <Button
                                type="button"
                                aria-label="Cancel Delete"
                                onClick={() => setOpenDeleteDialog(``)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="my-48 flex items-center justify-center">
            <h3 className="text-center font-bold">No Menus</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuContent

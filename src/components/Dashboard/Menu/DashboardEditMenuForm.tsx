import * as React from "react"
import { useForm } from "react-hook-form"
import {
  type CreateMenu,
  type MenuPosition,
  type UpdateMenu,
} from "@/lib/validation/menu"
import { type SelectMenu } from "@/lib/db/schema"
import { toast } from "@/components/UI/Toast/useToast"
import { useCreateMenu, useUpdateMenu } from "@/hooks/useMenu"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Form"
import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import SelectMediaDialog from "@/components/Media/SelectMediaDialog"
import { Button } from "@/components/UI/Button"
import { Input } from "@/components/UI/Input"

import Image from "@/components/Image"

interface CreateMenuFormProps {
  position: MenuPosition
  setMenus: (
    _value: React.SetStateAction<
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
    >,
  ) => void
  onSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const CreateMenuForm: React.FunctionComponent<CreateMenuFormProps> = (
  props,
) => {
  const { position, setMenus, onSuccess } = props

  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [openDialogDark, setOpenDialogDark] = React.useState<boolean>(false)
  const [selectedIconUrl, setSelectedIconUrl] = React.useState<string | null>(
    "",
  )
  const [selectedIconUrlDark, setSelectedIconUrlDark] = React.useState<
    string | null
  >("")

  const form = useForm<CreateMenu>({ defaultValues: { position: position } })

  const { handleCreateMenu: createMenuAction } = useCreateMenu({
    onSuccess: (data) => {
      toast({ variant: "success", description: "Menu has been created" })
      onSuccess(true)
      setMenus((prevMenus) => [...prevMenus, data])
      window.location.reload()
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Failed to update! Please try again later",
      })
    },
  })

  const onSubmit = (values: CreateMenu) => {
    if (!selectedIconUrl && !selectedIconUrlDark) {
      toast({ variant: "danger", description: "icons is required" })
      return
    } else {
      const mergedValues = {
        ...values,
        order: parseInt(values.order as unknown as string),
        icon: selectedIconUrl!,
        iconDark: selectedIconUrlDark!,
      }
      createMenuAction(mergedValues)
    }
  }
  const handleUpdateMedia = (res: { id: string; url: string }) => {
    setSelectedIconUrl(res?.url as string)
    setOpenDialog(false)
    toast({ variant: "success", description: "Image has been selected" })
  }
  const handleUpdateMediaDark = (res: { id: string; url: string }) => {
    setSelectedIconUrlDark(res?.url as string)
    setOpenDialogDark(false)
    toast({ variant: "success", description: "Image has been selected" })
  }

  const handleDeleteIcon = () => {
    setSelectedIconUrl("")
    toast({
      variant: "success",
      description: "Icon deleted successfully",
    })
  }
  const handleDeleteIconDark = () => {
    setSelectedIconUrlDark("")
    toast({
      variant: "success",
      description: "Icon deleted successfully",
    })
  }

  return (
    <div className="mx-0 w-full space-y-4 lg:p-5">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h1 className="pb-2 lg:pb-5">Add Icon</h1>
          <div className="lg:border-1 flex flex-col lg:flex-row lg:space-x-4 lg:border-border">
            <div className="w-full space-y-4">
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Title is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                rules={{
                  required: "Order is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Order" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                rules={{
                  required: "Link is Required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "Embed Link invalid",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embed Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://domain.com/path"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Icon</FormLabel>
              {selectedIconUrl ? (
                <div className="relative overflow-hidden rounded-[18px]">
                  <DeleteMediaButton
                    description="Featured Image"
                    onDelete={() => handleDeleteIcon()}
                  />
                  <SelectMediaDialog
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openDialog}
                    setOpen={setOpenDialog}
                  >
                    <div className="relative aspect-video h-20 w-20 cursor-pointer rounded-sm border-2 border-muted/30 lg:h-full lg:max-h-[400px]">
                      <Image
                        src={selectedIconUrl}
                        className="h-full w-full rounded-lg object-cover"
                        alt="featured_image"
                        onClick={() => setOpenDialog(true)}
                        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                        width={"200"}
                        height={"200"}
                      />
                    </div>
                  </SelectMediaDialog>
                </div>
              ) : (
                <SelectMediaDialog
                  handleSelectUpdateMedia={handleUpdateMedia}
                  open={openDialog}
                  setOpen={setOpenDialog}
                >
                  <div
                    onClick={() => setOpenDialog(true)}
                    className="relative mr-auto flex aspect-video h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-border bg-muted text-foreground"
                  >
                    <p>icon</p>
                  </div>
                </SelectMediaDialog>
              )}
              <FormLabel>Dark Icon</FormLabel>
              {selectedIconUrlDark ? (
                <div className="relative overflow-hidden rounded-[18px]">
                  <DeleteMediaButton
                    description="Featured Image"
                    onDelete={() => handleDeleteIconDark()}
                  />
                  <SelectMediaDialog
                    handleSelectUpdateMedia={handleUpdateMediaDark}
                    open={openDialogDark}
                    setOpen={setOpenDialogDark}
                  >
                    <div className="relative aspect-video h-20 w-20 cursor-pointer rounded-sm border-2 border-muted/30 lg:h-full lg:max-h-[400px]">
                      <Image
                        src={selectedIconUrlDark}
                        className="h-full w-full rounded-lg object-cover"
                        alt="featured_image"
                        onClick={() => setOpenDialogDark(true)}
                        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                        width={"200"}
                        height={"200"}
                      />
                    </div>
                  </SelectMediaDialog>
                </div>
              ) : (
                <SelectMediaDialog
                  handleSelectUpdateMedia={handleUpdateMediaDark}
                  open={openDialogDark}
                  setOpen={setOpenDialogDark}
                >
                  <div
                    onClick={() => setOpenDialogDark(true)}
                    className="relative mr-auto flex aspect-video h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-border bg-muted text-foreground"
                  >
                    <p>icon</p>
                  </div>
                </SelectMediaDialog>
              )}
              <Button
                aria-label="submit"
                type="submit"
                onClick={() => {
                  form.handleSubmit(onSubmit)()
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface EditMenuFormProps {
  setMenus: (
    _value: React.SetStateAction<
      Pick<
        SelectMenu,
        | "id"
        | "title"
        | "link"
        | "position"
        | "icon"
        | "order"
        | "active"
        | "iconDark"
      >[]
    >,
  ) => void

  menu: Pick<
    SelectMenu,
    | "id"
    | "title"
    | "link"
    | "position"
    | "icon"
    | "order"
    | "active"
    | "iconDark"
  >
  onSuccess: React.Dispatch<React.SetStateAction<string | null>>
}

export const EditMenuForm: React.FunctionComponent<EditMenuFormProps> = (
  props,
) => {
  const { menu, onSuccess } = props
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [openDialogDark, setOpenDialogDark] = React.useState<boolean>(false)
  const [selectedIconUrl, setSelectedIconUrl] = React.useState<string | null>(
    menu ? menu.icon : "",
  )
  const [selectedIconUrlDark, setSelectedIconUrlDark] = React.useState<
    string | null
  >(menu ? menu.iconDark : "")

  const form = useForm<UpdateMenu>({
    defaultValues: {
      position: menu.position,
      title: menu.title,
      link: menu?.link!,
      order: menu.order,
      active: menu.active,
    },
  })

  const { handleUpdateMenu: updateMenuAction } = useUpdateMenu({
    onSuccess: () => {
      toast({ variant: "success", description: "Menu has been edited" })
      onSuccess(null)
      window.location.reload()
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Failed to update! Please try again later",
      })
    },
  })

  const onSubmit = (values: CreateMenu) => {
    if (!selectedIconUrl && !selectedIconUrlDark) {
      toast({ variant: "danger", description: "icons is required" })
      return
    } else {
      const mergedValues = {
        ...values,
        order: parseInt(values.order as unknown as string),
        icon: selectedIconUrl!,
        iconDark: selectedIconUrlDark!,
        id: menu.id!,
      }
      updateMenuAction(mergedValues)
    }
  }
  const handleUpdateMedia = (res: { id: string; url: string }) => {
    setSelectedIconUrl(res?.url as string)
    setOpenDialog(false)
    toast({ variant: "success", description: "Image has been selected" })
  }
  const handleUpdateMediaDark = (res: { id: string; url: string }) => {
    setSelectedIconUrlDark(res?.url as string)
    setOpenDialogDark(false)
    toast({ variant: "success", description: "Image has been selected" })
  }

  const handleDeleteIcon = () => {
    setSelectedIconUrl("")
    toast({
      variant: "success",
      description: "Icon deleted successfully",
    })
  }
  const handleDeleteIconDark = () => {
    setSelectedIconUrlDark("")
    toast({
      variant: "success",
      description: "Icon deleted successfully",
    })
  }
  return (
    <div className="mx-0 w-full space-y-4 lg:p-5">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h1 className="pb-2 lg:pb-5">Edit Video Embed</h1>
          <div className="lg:border-1 flex flex-col lg:flex-row lg:space-x-4 lg:border-border">
            <div className="w-full space-y-4">
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Title is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="order"
                rules={{
                  required: "Order is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Order" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                rules={{
                  required: "Link is Required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "Embed Link invalid",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embed Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://domain.com/path"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormLabel>Icon</FormLabel>
              {selectedIconUrl ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-[18px]">
                  <DeleteMediaButton
                    description="Featured Image"
                    onDelete={() => handleDeleteIcon()}
                  />
                  <SelectMediaDialog
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openDialog}
                    setOpen={setOpenDialog}
                  >
                    <div className="relative h-full w-full cursor-pointer rounded-sm border-2 border-muted/30">
                      <Image
                        src={selectedIconUrl}
                        className="h-full w-full rounded-lg object-cover"
                        alt="featured_image"
                        onClick={() => setOpenDialog(true)}
                        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                        width={"200"}
                        height={"200"}
                      />
                    </div>
                  </SelectMediaDialog>
                </div>
              ) : (
                <SelectMediaDialog
                  handleSelectUpdateMedia={handleUpdateMedia}
                  open={openDialog}
                  setOpen={setOpenDialog}
                >
                  <div
                    onClick={() => setOpenDialog(true)}
                    className="relative mr-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-border bg-muted text-foreground"
                  >
                    <p>icon</p>
                  </div>
                </SelectMediaDialog>
              )}
              <FormLabel>Dark Icon</FormLabel>
              {selectedIconUrlDark ? (
                <div className="relative h-20 w-20 overflow-hidden rounded-[18px]">
                  <DeleteMediaButton
                    description="Featured Image"
                    onDelete={() => handleDeleteIconDark()}
                  />
                  <SelectMediaDialog
                    handleSelectUpdateMedia={handleUpdateMediaDark}
                    open={openDialogDark}
                    setOpen={setOpenDialogDark}
                  >
                    <div className="relative aspect-video h-full w-full cursor-pointer rounded-sm border-2 border-muted/30">
                      <Image
                        src={selectedIconUrlDark}
                        className="h-full w-full rounded-lg object-cover"
                        alt="featured_image"
                        onClick={() => setOpenDialogDark(true)}
                        sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                        width={"200"}
                        height={"200"}
                      />
                    </div>
                  </SelectMediaDialog>
                </div>
              ) : (
                <SelectMediaDialog
                  handleSelectUpdateMedia={handleUpdateMediaDark}
                  open={openDialogDark}
                  setOpen={setOpenDialogDark}
                >
                  <div
                    onClick={() => setOpenDialogDark(true)}
                    className="relative mr-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border-border bg-muted text-foreground"
                  >
                    <p>icon</p>
                  </div>
                </SelectMediaDialog>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              aria-label="submit"
              type="submit"
              onClick={() => {
                form.handleSubmit(onSubmit)()
              }}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

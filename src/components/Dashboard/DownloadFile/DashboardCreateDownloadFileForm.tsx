import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"

import { Input } from "@/components/UI/Input"

import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/UI/Form"
import { useCreateDownloadFile } from "@/hooks/useDownloadFile"
import Image from "@/components/Image"
import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import SelectMediaDialog from "@/components/Media/SelectMediaDialog"
import DashboardAddAuthors from "@/components/Dashboard/DashboardAddAuthors"
import type { CreateDownloadFile } from "@/lib/validation/download-file"

type FormValues = CreateDownloadFile

interface DashboardCreateDownloadFilesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initialAuthors: { id: string; name: string }[]
}

const DashboardCreateDownloadFiles: React.FunctionComponent<
  DashboardCreateDownloadFilesProps
> = (props) => {
  const { initialAuthors } = props

  const [authors, setAuthors] = React.useState<string[]>(
    initialAuthors
      ? initialAuthors.map((author) => {
          return author.id
        })
      : [],
  )
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >(
    initialAuthors
      ? initialAuthors.map((author) => {
          return { id: author.id as string, name: author.name as string }
        })
      : [],
  )
  const [loading, setLoading] = React.useState<boolean>(false)
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [showMetaData, setShowMetaData] = React.useState<boolean>(false)

  const form = useForm<FormValues>()

  const { handleCreateDownloadFile: createDownloadFileAction } =
    useCreateDownloadFile({
      onSuccess: (data) => {
        if (data) {
          setSelectedFeaturedImageUrl("")
          setSelectedFeaturedImageId("")
          toast({
            variant: "success",
            description: "Download File Successfully created",
          })
          form.reset()
          window.location.replace("/dashboard/download/file")
        }
      },
      onError: () => {
        toast({
          variant: "danger",
          description: "Failed to create! Please try again later",
        })
      },
    })

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      featuredImageId: selectedFeaturedImageId,
      authors: authors,
    }

    createDownloadFileAction(mergedValues)

    setLoading(false)
  }
  const handleUpdateMedia = (data: {
    id: React.SetStateAction<string>
    url: React.SetStateAction<string>
  }) => {
    setSelectedFeaturedImageId(data.id)
    setSelectedFeaturedImageUrl(data.url)
    setOpenDialog(false)
    toast({
      variant: "success",
      description: "Featured image has been selected",
    })
  }

  const handleDeleteFeaturedImage = () => {
    setSelectedFeaturedImageId("")
    setSelectedFeaturedImageUrl("")
    toast({
      variant: "success",
      description: "Featured image has been deleted",
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h1 className="pb-2 lg:pb-5">Add Download File</h1>
          <div className="lg:border-1 flex flex-col lg:flex-row lg:space-x-4 lg:border-border">
            <div className="w-full lg:w-6/12 lg:space-y-4">
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
              <DashboardAddAuthors
                authors={authors}
                addAuthors={setAuthors}
                selectedAuthors={selectedAuthors}
                addSelectedAuthors={setSelectedAuthors}
              />
              <FormField
                control={form.control}
                name="version"
                rules={{
                  required: "Version is Required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Version</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter version" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="downloadLink"
                rules={{
                  required: "Download link is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Download link</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Enter download link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                rules={{
                  required: "Price is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fileSize"
                rules={{
                  required: "File size is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File size</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter file size" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                rules={{
                  required: "Currency is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter currency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full lg:w-6/12 lg:space-y-4">
              <FormLabel>Featured image</FormLabel>
              {selectedFeaturedImageUrl ? (
                <div className="relative overflow-hidden rounded-[18px]">
                  <DeleteMediaButton
                    description="Featured Image"
                    onDelete={() => handleDeleteFeaturedImage()}
                  />
                  <SelectMediaDialog
                    handleSelectUpdateMedia={handleUpdateMedia}
                    open={openDialog}
                    setOpen={setOpenDialog}
                  >
                    <div className="relative aspect-video h-[150px] w-full cursor-pointer rounded-sm border-2 border-muted/30 lg:h-full lg:max-h-[400px]">
                      <Image
                        src={selectedFeaturedImageUrl}
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
                    className="relative mr-auto flex aspect-video h-[150px] w-full cursor-pointer items-center justify-center rounded-lg border-border bg-muted text-foreground lg:h-full lg:max-h-[250px]"
                  >
                    <p>Select featured image</p>
                  </div>
                </SelectMediaDialog>
              )}
            </div>
          </div>
          <div className="my-4 rounded-lg bg-muted p-3 lg:p-5">
            <div className="flex justify-between">
              <div className={showMetaData ? "pb-4" : "pb-0"}>
                <span className="flex align-top text-base font-semibold">
                  Meta Data
                </span>
                <span className="text-xs">Extra content search engine</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowMetaData(!showMetaData)}
              >
                {showMetaData ? "close" : "expand"}
              </Button>
            </div>
            <div className={showMetaData ? "flex flex-col" : "hidden"}>
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter meta title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter meta description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              aria-label="submit"
              type="submit"
              onClick={() => {
                form.setValue("status", "published")
                form.handleSubmit(onSubmit)()
              }}
              loading={loading}
            >
              Submit
            </Button>
            <Button
              aria-label="save_as_draft"
              type="submit"
              onClick={() => {
                form.setValue("status", "draft")
                form.handleSubmit(onSubmit)()
              }}
              loading={loading}
            >
              Save as draft
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default DashboardCreateDownloadFiles

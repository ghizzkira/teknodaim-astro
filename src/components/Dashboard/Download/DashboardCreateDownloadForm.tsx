//FIX: change topic type download or all not only download type

import * as React from "react"

import { useForm } from "react-hook-form"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Form"
import { Icon } from "@/components/UI/Icon"
import { Input } from "@/components/UI/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useDisclosure } from "@/hooks/useDisclosure"
import type { SelectUser } from "@/lib/db/schema/user"
import { useCreateDownload } from "@/hooks/useDownload"
import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import SelectMediaDialog from "@/components/Media/SelectMediaDialog"
import TextEditorExtended from "@/components/TextEditor/TextEditorExtended"
import DashboardAddAuthors from "@/components/Dashboard/DashboardAddAuthors"
import DashboardAddEditors from "@/components/Dashboard/DashboardAddEditors"
import DashboardAddTopics from "@/components/Dashboard/DashboardAddTopics"
import {
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Table,
} from "@/components/UI/Table"
import { DashboardAddDownloadFiles } from "@/components/Dashboard/DashboardAddDownloadFiles"
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/UI/Dialog"
import DashboardShowOptions from "@/components/Dashboard/DashboardShowOptions"
import DashboardSearchDownloadFiles from "@/components/Dashboard/DashboardSearchDownloadFiles"
import {
  DOWNLOAD_SCHEMA_JSON,
  type CreateDownload,
} from "@/lib/validation/download"

type FormValues = CreateDownload

interface SelectedDownloadFileProps {
  id: string
  title: string
  version: string
  fileSize: string
  price: string
}

interface CreateDownloadFormProps {
  session: Partial<SelectUser> | null
}

const CreateDownloadForm: React.FunctionComponent<CreateDownloadFormProps> = (
  props,
) => {
  const { session } = props

  const [loading, setLoading] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [showMetaData, setShowMetaData] = React.useState<boolean>(false)
  const [clearContent, setClearContent] = React.useState<boolean>(false)
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>("")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>("")
  const [topics, setTopics] = React.useState<string[]>([])
  const [selectedTopics, setSelectedTopics] = React.useState<
    { id: string; title: string }[] | []
  >([])
  const [authors, setAuthors] = React.useState<string[]>(
    session ? [session?.id!] : [],
  )
  const [editors, setEditors] = React.useState<string[]>(
    session ? [session?.id!] : [],
  )
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >(
    session
      ? [
          {
            id: session?.id!,
            name: session?.name!,
          },
        ]
      : [],
  )
  const [selectedEditors, setSelectedEditors] = React.useState<
    { id: string; name: string }[] | []
  >(
    session
      ? [
          {
            id: session?.id!,
            name: session?.name!,
          },
        ]
      : [],
  )
  const [selectedDownloadFile, setSelectedDownloadFile] = React.useState<
    SelectedDownloadFileProps[]
  >([])
  const [selectedDownloadFileId, setSelectedDownloadFileId] = React.useState<
    string[]
  >([])

  const { isOpen: isOpenSidebar, onToggle: onToggleSidebar } = useDisclosure()

  const handleUpdateFile = React.useCallback(
    (values: SelectedDownloadFileProps[]) => {
      setSelectedDownloadFile((prev) => [
        ...(prev as SelectedDownloadFileProps[]),
        ...values,
      ])
      const listId = values.map((value) => {
        return value.id
      })
      setSelectedDownloadFileId((prev) => [...prev, ...listId])
    },
    [],
  )

  const handleDeleteFile = React.useCallback(
    (value: SelectedDownloadFileProps) => {
      const filteredResult = selectedDownloadFile?.filter(
        (item) => item.id !== value.id,
      )
      const filteredData = selectedDownloadFileId.filter(
        (item) => item !== value.id,
      )
      setSelectedDownloadFile(filteredResult)
      setSelectedDownloadFileId(filteredData)
    },
    [selectedDownloadFile, selectedDownloadFileId],
  )

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      language: "id",
    },
  })

  const valueLanguage = form.watch("language")

  const { handleCreateDownload: createDownload } = useCreateDownload({
    onSuccess: () => {
      form.reset()
      setClearContent((prev) => !prev)
      setSelectedTopics([])
      setSelectedFeaturedImageUrl("")
      toast({
        variant: "success",
        description: "Create success",
      })
      window.location.replace("/dashboard/download")
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Create failed",
      })
    },
  })

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      featuredImageId: selectedFeaturedImageId,
      downloadFiles: selectedDownloadFileId,
      authors: authors,
      editors: editors,
    }
    createDownload(mergedValues)
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
    <div className="flex w-full flex-col">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
          className="space-y-4"
        >
          <div className="sticky top-0 z-20 w-full">
            <div className="flex items-center justify-between bg-background px-3 py-5">
              <Button aria-label="Back To Downloads" variant="ghost">
                <a
                  className="flex items-center"
                  aria-label="Back To Downloads"
                  href="/dashboard/download"
                >
                  <Icon.ChevronLeft aria-label="downloads" />
                  Downloads
                </a>
              </Button>
              <div>
                <Button
                  aria-label="save as draft"
                  type="submit"
                  onClick={() => {
                    form.setValue("status", "draft")
                    form.handleSubmit(onSubmit)()
                  }}
                  variant="ghost"
                  loading={loading}
                >
                  Save as draft
                </Button>
                <Button
                  aria-label="submit"
                  type="submit"
                  onClick={() => {
                    form.setValue("status", "published")
                    form.handleSubmit(onSubmit)()
                  }}
                  variant="ghost"
                  loading={loading}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  aria-label="View Sidebar"
                  variant="ghost"
                  onClick={onToggleSidebar}
                >
                  <Icon.ViewSidebar />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex min-h-screen flex-row flex-wrap">
            <div className="order-1 w-full lg:w-10/12">
              <div className="relative mt-4 flex items-center justify-center">
                <div className="flex-1 space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    rules={{
                      required: "Title is required",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            onInput={(event) => {
                              const textarea = event.currentTarget
                              const currentFocus = document.activeElement
                              const totalHeight =
                                textarea.scrollHeight -
                                parseInt(
                                  getComputedStyle(textarea).paddingTop,
                                ) -
                                parseInt(
                                  getComputedStyle(textarea).paddingBottom,
                                )
                              textarea.style.height = totalHeight + "px"
                              if (textarea.value === "") {
                                textarea.style.height = "45px"
                                textarea.focus()
                              }
                              if (currentFocus === textarea) {
                                textarea.focus()
                              }
                            }}
                            variant="plain"
                            className="h-12 resize-none overflow-hidden text-[40px] font-bold leading-10"
                            placeholder="Enter title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <TextEditorExtended
                    control={form.control}
                    name="content"
                    isClear={clearContent}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                isOpenSidebar == false
                  ? "hidden"
                  : "pt-15 relative z-20 mt-16 flex flex-row overflow-x-auto bg-background py-4 opacity-100"
              } `}
            >
              <div className="fixed bottom-[95px] right-0 top-[90px]">
                <div className="scrollbar-hide h-[calc(100vh-180px)] max-w-[300px] overflow-y-auto rounded border py-4 max-sm:max-w-full lg:w-[400px] lg:max-w-[400px]">
                  <div className="flex flex-col bg-background px-2 py-2">
                    <div className="my-2 flex flex-col space-y-4 px-4">
                      <FormField
                        control={form.control}
                        name="developer"
                        rules={{
                          required: "Developer is Required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Developer</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter developer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="officialWebsite"
                        rules={{
                          required: "Website is Required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Official Website</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="Enter official website"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="operatingSystem"
                        rules={{
                          required: "Operating system is Required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operating System</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter operating system"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="license"
                        rules={{
                          required: "License is Required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>License</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter license" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="schemaType"
                        rules={{
                          required: "Schema is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schema</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Schema" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DOWNLOAD_SCHEMA_JSON.map((item) => {
                                  return (
                                    <SelectItem value={item}>{item}</SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="language"
                        rules={{
                          required: "Language is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="id">Indonesia</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        rules={{
                          required: "Type is required",
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="game">Game</SelectItem>
                                <SelectItem value="app">Application</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter excerpt"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {valueLanguage && (
                        <div className="my-2 max-w-xl">
                          <DashboardAddTopics
                            mode="edit"
                            fieldName="topics"
                            locale={valueLanguage}
                            control={form.control}
                            topics={topics}
                            addTopics={setTopics}
                            selectedTopics={selectedTopics}
                            addSelectedTopics={setSelectedTopics}
                            topicType="all"
                          />
                        </div>
                      )}
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
                                className="rounded-lg object-cover"
                                width="300"
                                height="300"
                                alt="Featured image"
                                onClick={() => setOpenDialog(true)}
                                sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
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
                            <p>Featured image</p>
                          </div>
                        </SelectMediaDialog>
                      )}
                      <DashboardAddAuthors
                        authors={authors}
                        addAuthors={setAuthors}
                        selectedAuthors={selectedAuthors}
                        addSelectedAuthors={setSelectedAuthors}
                      />
                      <DashboardAddEditors
                        editors={editors}
                        addEditors={setEditors}
                        selectedEditors={selectedEditors}
                        addSelectedEditors={setSelectedEditors}
                      />
                      <div className="rouded-lg bg-muted p-3 lg:p-5">
                        <div className="flex justify-between">
                          <div className={showMetaData ? "pb-4" : "pb-0"}>
                            <span className="flex align-top text-base font-semibold">
                              Meta Data
                            </span>
                            <span className="text-xs">
                              Extra content search engine
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            className="border-none p-0"
                            onClick={() => setShowMetaData(!showMetaData)}
                          >
                            {showMetaData ? (
                              <Icon.Close />
                            ) : (
                              <Icon.ChevronDown />
                            )}
                          </Button>
                        </div>
                        <div
                          className={showMetaData ? "flex flex-col" : "hidden"}
                        >
                          <FormField
                            control={form.control}
                            name="metaTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Meta title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter meta title"
                                    {...field}
                                  />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <FilesSection
        selectedDownloadFile={selectedDownloadFile}
        handleUpdateFile={handleUpdateFile}
        handleDeleteFile={handleDeleteFile}
        selectedAuthors={selectedAuthors}
      />
    </div>
  )
}

interface FilesSectionProps {
  selectedDownloadFile: SelectedDownloadFileProps[]
  handleUpdateFile: (_value: SelectedDownloadFileProps[]) => void
  handleDeleteFile: (_value: SelectedDownloadFileProps) => void
  selectedAuthors:
    | []
    | {
        id: string
        name: string
      }[]
}

const FilesSection: React.FunctionComponent<FilesSectionProps> = React.memo(
  (props) => {
    const {
      selectedDownloadFile,
      handleUpdateFile,
      handleDeleteFile,
      selectedAuthors,
    } = props
    const [showForm, setShowForm] = React.useState(false)
    return (
      <div className="border-t p-4">
        <div className="flex justify-between pb-2">
          <h2>Files</h2>

          <Dialog>
            <DialogTrigger aria-label="Add File">Add File</DialogTrigger>
            <DialogContent className="w-full max-w-[unset]">
              <div className="scrollbar-hide h-[90vh] overflow-y-auto max-lg:h-[80vh]">
                <div className="space-y-5 px-4">
                  <DialogTitle>Add Files</DialogTitle>
                  <DashboardSearchDownloadFiles
                    updateDownloadFiles={handleUpdateFile}
                    selectedDownloadFiles={selectedDownloadFile}
                    deleteDownloadFile={handleDeleteFile}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowForm((prev) => !prev)}
                    aria-label="Add File"
                  >
                    Create File
                  </Button>
                  {showForm && (
                    <DashboardAddDownloadFiles
                      updateDownloadFiles={(data) => {
                        handleUpdateFile(data)
                        setShowForm(false)
                      }}
                      initialAuthors={selectedAuthors}
                    />
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {selectedDownloadFile && selectedDownloadFile.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDownloadFile.map(
                  (downloadFile: SelectedDownloadFileProps) => (
                    <TableRow key={downloadFile.id}>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex">
                          <span className="font-medium">
                            {downloadFile.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex">
                          <span className="font-medium">
                            {downloadFile.version}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{downloadFile.fileSize}</TableCell>
                      <TableCell>{downloadFile.price}</TableCell>
                      <TableCell align="right">
                        <DashboardShowOptions
                          onDelete={() => {
                            void handleDeleteFile(downloadFile)
                          }}
                          editUrl={`/dashboard/download/file/edit/${downloadFile.id}`}
                          description={downloadFile.title}
                        />
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    )
  },
)

export default CreateDownloadForm

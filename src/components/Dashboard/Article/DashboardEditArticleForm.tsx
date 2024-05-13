//FIX: change topic type article or all not only article type

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
import type { SelectArticle } from "@/lib/db/schema/article"
import type { SelectMedia } from "@/lib/db/schema/media"
import type { SelectTopic } from "@/lib/db/schema/topic"
import type { SelectUser } from "@/lib/db/schema/user"
import type { LanguageType } from "@/lib/validation/language"
import type { StatusType } from "@/lib/validation/status"
import { useUpdateArticle } from "@/hooks/useArticle"
import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import SelectMediaDialog from "@/components/Media/SelectMediaDialog"
import TextEditorExtended from "@/components/TextEditor/TextEditorExtended"
import DashboardAddAuthors from "../DashboardAddAuthors"
import DashboardAddEditors from "../DashboardAddEditors"
import DashboardAddTopics from "../DashboardAddTopics"

interface FormValues {
  id: string
  title: string
  topics: string[]
  content: string
  excerpt?: string
  slug: string
  language: LanguageType
  metaTitle?: string
  metaDescription?: string
  status?: StatusType
  articleTranslationId: string
}

interface EditArticleFormProps {
  articleId: string
  article: Pick<
    SelectArticle,
    | "id"
    | "title"
    | "excerpt"
    | "content"
    | "language"
    | "slug"
    | "metaTitle"
    | "metaDescription"
    | "status"
    | "articleTranslationId"
  > & {
    featuredImage: Pick<SelectMedia, "id" | "url">
    authors: Pick<SelectUser, "id" | "name">[]
    editors: Pick<SelectUser, "id" | "name">[]
    topics: Pick<SelectTopic, "id" | "title">[]
  }
}

const EditArticleForm: React.FunctionComponent<EditArticleFormProps> = (
  props,
) => {
  const { article } = props
  const [loading, setLoading] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [showMetaData, setShowMetaData] = React.useState<boolean>(false)
  const [clearContent, setClearContent] = React.useState<boolean>(false)

  const [topics, setTopics] = React.useState<string[]>(
    article
      ? article.topics.map((topic) => {
          return topic.id
        })
      : [],
  )
  const [authors, setAuthors] = React.useState<string[]>(
    article
      ? article.authors.map((author) => {
          return author.id
        })
      : [],
  )
  const [editors, setEditors] = React.useState<string[]>(
    article
      ? article.editors.map((author) => {
          return author.id
        })
      : [],
  )
  const [selectedFeaturedImageId, setSelectedFeaturedImageId] =
    React.useState<string>(article ? article.featuredImage.id : "")
  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState<string>(article ? article.featuredImage.url : "")
  const [selectedTopics, setSelectedTopics] = React.useState<
    { id: string; title: string }[]
  >(
    article
      ? article.topics.map((topic) => {
          return { id: topic.id, title: topic.title }
        })
      : [],
  )

  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >(
    article
      ? article.authors.map((author) => {
          return { id: author.id, name: author.name! }
        })
      : [],
  )
  const [selectedEditors, setSelectedEditors] = React.useState<
    { id: string; name: string }[] | []
  >(
    article
      ? article.editors.map((author) => {
          return { id: author.id, name: author.name! }
        })
      : [],
  )

  const { isOpen: isOpenSidebar, onToggle: onToggleSidebar } = useDisclosure()

  const { handleUpdateArticle: updateArticle } = useUpdateArticle({
    onSuccess: () => {
      setClearContent((prev) => !prev)
      form.reset()
      setSelectedTopics([])
      setSelectedFeaturedImageUrl("")
      // window.location.replace("/dashboard/article")

      toast({ variant: "success", description: "Update success" })
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Update failed",
      })
    },
  })

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      id: article?.id,
      language: article?.language || "id",
      title: article?.title || "",
      topics: article
        ? article.topics.map((topic) => {
            return topic.id
          })
        : [],
      slug: article?.slug || "",
      content: article?.content || "",
      excerpt: article?.excerpt || "",
      metaTitle: article?.metaTitle ?? "",
      metaDescription: article?.metaDescription ?? "",
      status: article?.status || "draft",
      articleTranslationId: article?.articleTranslationId || "",
    },
  })

  const valueLanguage = form.watch("language") as LanguageType | undefined

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    const mergedValues = {
      ...values,
      featuredImageId: selectedFeaturedImageId,
      authors: authors,
      editors: editors,
    }
    updateArticle(mergedValues)
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
              <Button aria-label="Back To Articles" variant="ghost">
                <a
                  className="flex items-center"
                  aria-label="Back To Articles"
                  href="/dashboard/article"
                >
                  <Icon.ChevronLeft aria-label="articles" />
                  articles
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
                  aria-label="update"
                  type="submit"
                  onClick={() => {
                    form.setValue("status", "published")
                    form.handleSubmit(onSubmit)()
                  }}
                  variant="ghost"
                  loading={loading}
                >
                  update
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
            <div className="order-1 w-full md:px-64 lg:w-10/12">
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
                                textarea.style.height = "40px"
                                textarea.focus()
                              }
                              if (currentFocus === textarea) {
                                textarea.focus()
                              }
                            }}
                            variant="plain"
                            className="h-10 resize-none overflow-hidden text-[40px] font-bold leading-10"
                            placeholder="Enter title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormControl>
                    <React.Suspense>
                      <TextEditorExtended
                        control={form.control}
                        name="content"
                        isClear={clearContent}
                      />
                    </React.Suspense>
                  </FormControl>
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
                            topicType="article"
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
    </div>
  )
}

export default EditArticleForm

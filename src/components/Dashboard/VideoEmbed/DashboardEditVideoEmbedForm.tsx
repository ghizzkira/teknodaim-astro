import * as React from "react"
import { useForm } from "react-hook-form"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"

import type { UpdateVideoEmbed } from "@/lib/validation/video-embed"
import { useUpdateVideoEmbed } from "@/hooks/useVideoEmbed"

import DeleteMediaButton from "@/components/Media/DeleteMediaButton"
import SelectMediaDialog from "@/components/Media/SelectMediaDialog"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/UI/Form"
import { Input } from "@/components/UI/Input"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import type { SelectTopic, SelectUser, SelectVideoEmbed } from "@/lib/db/schema"
import DashboardAddTopics from "../DashboardAddTopics"
import DashboardAddAuthors from "../DashboardAddAuthors"
import TextEditorExtended from "@/components/TextEditor/TextEditorExtended"

type FormValues = UpdateVideoEmbed

interface EditVideoEmbedFormProps {
  currentUser: SelectUser
  videoEmbed:
    | (Pick<
        SelectVideoEmbed,
        | "id"
        | "featuredImageId"
        | "title"
        | "slug"
        | "description"
        | "embedLink"
        | "type"
        | "metaDescription"
        | "metaTitle"
        | "status"
      > & {
        authors: Pick<SelectUser, "id" | "name">[]
        topics: Pick<SelectTopic, "title" | "slug" | "id">[]
      })
    | null
}

export default function EditVideoEmbedForm(props: EditVideoEmbedFormProps) {
  const { videoEmbed } = props

  const [loading, setLoading] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [showMetaData, setShowMetaData] = React.useState<boolean>(false)

  const [selectedFeaturedImageUrl, setSelectedFeaturedImageUrl] =
    React.useState(videoEmbed?.id)
  const [authors, setAuthors] = React.useState<string[]>(
    videoEmbed?.authors
      ? videoEmbed.authors.map((author) => {
          return author.id as unknown as string
        })
      : [],
  )
  const [topics, setTopics] = React.useState<string[]>(
    videoEmbed
      ? videoEmbed.topics.map((topic) => {
          return topic.id
        })
      : [],
  )
  const [selectedTopics, setSelectedTopics] = React.useState<
    { id: string; title: string }[] | []
  >(
    videoEmbed
      ? videoEmbed.topics.map((topic) => {
          return {
            id: topic.id,
            title: topic.title,
          }
        })
      : [],
  )
  const [selectedAuthors, setSelectedAuthors] = React.useState<
    { id: string; name: string }[] | []
  >(
    videoEmbed
      ? videoEmbed.authors.map((author) => {
          return { id: author.id!, name: author.name! }
        })
      : [],
  )
  const { handleUpdateVideoEmbed: updateVideoEmbed } = useUpdateVideoEmbed({
    onSuccess: () => {
      form.reset()
      toast({ variant: "success", description: "Success" })
      window.location.replace("/dashboard/video-embed")
    },
    onError: () => {
      setLoading(false)
      toast({
        description: "Error when updating video embed, try again",
        variant: "warning",
      })
    },
  })

  const form = useForm<FormValues>()
  const currentEmbedLink = form.watch("embedLink")

  const onSubmit = (values: FormValues) => {
    const mergedValues = {
      ...values,
      featuredImageUrl: selectedFeaturedImageUrl,
      authors: authors,
      topics: topics,
    }
    setLoading(true)
    updateVideoEmbed(mergedValues)
    setLoading(false)
  }

  const handleUpdateMedia = (data: { id: string; url: string }) => {
    setSelectedFeaturedImageUrl(data?.url!)
    setOpenDialog(false)
    toast({
      variant: "success",
      description: "Feature image has been selected",
    })
  }

  const handleDeleteFeaturedImage = () => {
    setSelectedFeaturedImageUrl("")
    toast({
      variant: "success",
      description: "Feature image has been deleted",
    })
  }

  async function handleGenerateThumbnail() {
    const url = currentEmbedLink
    let embedUrl
    if (url?.includes("tiktok.com")) {
      embedUrl = `https://www.tiktok.com/oembed?url=${url}`
    } else if (url?.includes("youtube.com")) {
      embedUrl = `https://youtube.com/oembed?url=${url}`
    } else {
      embedUrl = null
    }
    if (embedUrl) {
      try {
        const response = await fetch(embedUrl)
        const data = (await response.json()) as Record<string, string>
        if (response.ok) {
          setSelectedFeaturedImageUrl(data?.thumbnail_url)
          toast({ variant: "success", description: "Image has been selected" })
        }
        return data
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="mx-0 w-full space-y-4 lg:mx-8 lg:p-5">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <h1 className="pb-2 lg:pb-5">Edit Video Embed</h1>
          <div className="lg:border-1 flex flex-col space-x-4 lg:flex-row lg:border-border">
            <div className="w-full space-y-4 lg:w-6/12">
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
              <div>
                <label>Description</label>
                <TextEditorExtended control={form.control} name="description" />
              </div>
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
                          <SelectValue placeholder="Choose one type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="youtube_short">
                          YoutTube Short
                        </SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="embedLink"
                rules={{
                  required: "Embed Link is Required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "Embed Link invalid",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Embed Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                aria-label="Generate Thumbnail"
                type="button"
                onClick={handleGenerateThumbnail}
              >
                Generate Thumbnail
              </Button>
              <DashboardAddTopics
                mode="create"
                fieldName="topics"
                locale={"id"}
                control={form.control}
                topics={topics}
                addTopics={setTopics}
                selectedTopics={selectedTopics}
                addSelectedTopics={setSelectedTopics}
                topicType="all"
              />
              <DashboardAddAuthors
                authors={authors}
                addAuthors={setAuthors}
                selectedAuthors={selectedAuthors}
                addSelectedAuthors={setSelectedAuthors}
              />
            </div>
            <div className="w-full space-y-4 lg:w-6/12">
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
                        className="rounded-lg object-cover"
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

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"

import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import type { InsertMedia } from "@/lib/db/schema/media"
import { useUpdateMedia } from "@/hooks/useMedia"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../UI/Form"
import { copyToClipboard } from "@/lib/utils/content"

interface FormValues {
  name: string
  description?: string
}

interface EditMediaProps {
  media: InsertMedia
}

export default function EditMediaForm(props: EditMediaProps) {
  const { media } = props

  const [loading, setLoading] = React.useState<boolean>(false)

  const form = useForm<FormValues>({
    defaultValues: {
      name: media?.name || "",
      description: media?.description ?? "",
    },
  })

  const { handleUpdateMedia: updateMediaAction } = useUpdateMedia({
    onSuccess: () => {
      toast({ variant: "success", description: "update_success" })
      window.location.replace(`/dashboard/media`)
    },
  })

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    updateMediaAction({ ...values, id: media.id })
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <h1 className="px-2 lg:px-4">Edit media</h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full p-2 lg:w-6/12 lg:p-4">
          <div className="relative h-[200px] w-full lg:h-[500px]">
            <Image
              src={media.url}
              alt={media.name}
              className="aspect-video h-auto w-full rounded-lg border-2 border-muted/30 object-cover"
              sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
              width="100"
              height="100"
            />
          </div>
        </div>
        <div className="w-full p-2 lg:w-6/12 lg:p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-4">
                <FormLabel>Name</FormLabel>
                <div className="relative inline-flex h-9 w-full min-w-0 max-w-sm appearance-none items-center rounded-md border border-input bg-muted/50 px-3 py-2 text-base transition-colors duration-75 ease-out focus:bg-background focus:outline-none focus:ring-2 lg:max-w-xl">
                  <p className="line-clamp-1">{media.name}</p>
                </div>
                <FormLabel>URL</FormLabel>
                <div className="flex flex-col space-y-2">
                  <div className="relative inline-flex h-9 w-full min-w-0 max-w-sm appearance-none items-center rounded-md border border-input bg-muted/50 px-3 py-2 text-base transition-colors duration-75 ease-out focus:bg-background focus:outline-none focus:ring-2 lg:max-w-xl">
                    <p className="line-clamp-1">{media.url}</p>
                  </div>
                  <Button
                    aria-label="Copy Link"
                    className="text-left font-normal"
                    variant="outline"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.preventDefault()
                      copyToClipboard(media.url)
                      toast({
                        variant: "success",
                        description: "copy_link",
                      })
                    }}
                  >
                    <Icon.Copy aria-label="Copy Link" className="mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="description_placeholder"
                        className="max-w-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="my-4"
                aria-label="Save"
                type="submit"
                loading={loading}
              >
                save
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

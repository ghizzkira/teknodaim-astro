import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"

import { Input } from "@/components/UI/Input"

import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"

import type { AdPosition, AdType } from "@/lib/validation/ad"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/UI/Form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/Select"
import { Switch } from "@/components/UI/Switch"
import { useUpdateAd } from "@/hooks/useAd"
import type { InsertAd } from "@/lib/db/schema"

interface FormValues {
  id: string
  title: string
  content: string
  position: AdPosition
  type: AdType
  active: boolean
}

interface EditAdFormProps {
  ad: InsertAd
}

export default function EditAdForm(props: EditAdFormProps) {
  const { ad } = props

  const [loading, setLoading] = React.useState<boolean>(false)

  const { handleUpdateAd: createAd } = useUpdateAd({
    onSuccess: () => {
      toast({ variant: "success", description: "Success updating ad" })
    },
  })

  const form = useForm<FormValues>({
    defaultValues: {
      id: ad.id,
      title: ad?.title ?? "",
      content: ad?.content ?? "",
      position: ad?.position ?? "home_below_header",
      type: ad?.type ?? "plain_ad",
      active: ad?.active ?? false,
    },
  })

  const adType = form.watch("type")

  const onSubmit = (values: FormValues) => {
    setLoading(true)
    createAd(values)
    setLoading(false)
  }

  return (
    <div className="mx-0 space-y-4 lg:mx-8 lg:p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="pb-2 lg:pb-5">Create Ad</h1>
          <div className="flex max-w-2xl flex-col space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Add title" {...field} />
                  </FormControl>
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
                        <SelectValue placeholder="Add ad type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="adsense">Adsense</SelectItem>
                      <SelectItem value="plain_ad">Plain Ad</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {adType !== "adsense" ? (
              <FormField
                control={form.control}
                name="content"
                rules={{
                  required: "Content is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add ad content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="content"
                rules={{
                  required: "Content is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Add ad content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="position"
              rules={{
                required: "Position is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="add ad position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="home_below_header">
                        Home (Below Header)
                      </SelectItem>
                      <SelectItem value="article_below_header">
                        Article (Below Header)
                      </SelectItem>
                      <SelectItem value="topic_below_header">
                        Topic (Below Header)
                      </SelectItem>
                      <SelectItem value="single_article_above_content">
                        Single Article (Above Content)
                      </SelectItem>
                      <SelectItem value="single_article_middle_content">
                        Single Article (Middle Content)
                      </SelectItem>
                      <SelectItem value="single_article_below_content">
                        Single Article (Below Content)
                      </SelectItem>
                      <SelectItem value="single_article_pop_up">
                        Single Article (Pop Up)
                      </SelectItem>
                      <SelectItem value="article_below_header_amp">
                        Article (AMP Below Header)
                      </SelectItem>
                      <SelectItem value="single_article_above_content_amp">
                        Single Article (AMP Above Content)
                      </SelectItem>
                      <SelectItem value="single_article_middle_content_amp">
                        Single Article (AMP Middle Content)
                      </SelectItem>
                      <SelectItem value="single_article_below_content_amp">
                        Single Article (AMP Below Content)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button aria-label="Submit" type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

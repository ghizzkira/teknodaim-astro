import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { Textarea } from "@/components/UI/Textarea"

import { cn } from "@/lib/utils/style"
import { toast } from "@/components/UI/Toast/useToast"
import { useUpdateDownloadComment } from "@/hooks/useDownloadComment"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/Form"

interface FormValues {
  content: string
}

interface EditDownloadCommentProps {
  id: string
  onSuccess: () => void
  content: string
  type?: "default" | "dashboard"
  onCancel?: () => void
  authorId: string
  byAdmin?: boolean
}

const EditDownloadComment: React.FunctionComponent<EditDownloadCommentProps> = (
  props,
) => {
  const {
    id,
    onSuccess,
    content,
    type = "default",
    onCancel,
    authorId,
    byAdmin,
  } = props

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<FormValues>({
    defaultValues: {
      content: content ?? "",
    },
  })

  const { handleUpdateComment: update } = useUpdateDownloadComment({
    onSuccess: () => {
      const textarea = document.querySelector("textarea")
      if (textarea && type === "default") {
        textarea.style.height = "31px"
      }

      form.reset()
      onSuccess()
      toast({
        variant: "success",
        description: "Comment is successfully edited",
      })
    },
    onError: () => {
      toast({
        variant: "danger",
        description: "Failed to edit! Please try again later",
      })
    },
    byAdmin: byAdmin,
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setIsLoading(true)
    update({
      id: id,
      content: values.content,
      authorId: authorId,
    })

    setIsLoading(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-2 mb-2 w-full border-b border-border">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edit Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      variant={type !== "default" ? "solid" : "plain"}
                      onInput={(event) => {
                        if (type === "default") {
                          const textarea = event.currentTarget
                          const currentFocus = document.activeElement
                          const totalHeight =
                            textarea.scrollHeight -
                            parseInt(getComputedStyle(textarea).paddingTop) -
                            parseInt(getComputedStyle(textarea).paddingBottom)
                          textarea.style.height = totalHeight + "px"
                          if (textarea.value === "") {
                            textarea.style.height = "31px"
                            textarea.focus()
                          }
                          if (currentFocus === textarea) {
                            textarea.focus()
                          }
                        }
                      }}
                      {...field}
                      className={cn(
                        "max-h-[181px] w-full border border-b",
                        type !== "dashboard"
                          ? "mx-1 h-[30px] resize-y overflow-hidden"
                          : "m1 h-[200px]",
                      )}
                      placeholder="Write comment…"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="ml-auto flex gap-3">
            {onCancel && (
              <Button
                aria-label="Cancel Delete"
                type="button"
                onClick={onCancel}
                variant="outline"
                className="ml-auto block h-auto rounded-full px-1 py-1"
              >
                Cancel
              </Button>
            )}
            <Button
              aria-label="Submit Comment"
              loading={isLoading}
              variant="outline"
              type="submit"
              className="ml-auto block h-auto rounded-full px-1 py-1"
            >
              {!isLoading && "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditDownloadComment

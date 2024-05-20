import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useWpCreateComment } from "@/hooks/useWpComments"
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

interface ReplyWpCommentProps {
  wpPostSlug: string
  reply_to_id: string
  onSuccess: () => void
  avatar?: string | null
  username?: string
  onCancel: () => void
}

const ReplyWpComment: React.FunctionComponent<ReplyWpCommentProps> = (
  props,
) => {
  const { wpPostSlug, onSuccess, avatar, username, reply_to_id, onCancel } =
    props

  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<FormValues>()

  const { handleCreateComment: createComment } = useWpCreateComment({
    onSuccess: () => {
      const textarea = document.querySelector("textarea")
      if (textarea) {
        textarea.style.height = "30px"
      }

      form.reset()
      onSuccess()
      toast({
        variant: "success",
        description: "Comment is successfully replied",
      })
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setIsLoading(true)
    createComment({
      wpPostSlug: wpPostSlug,
      content: values.content,
      replyToId: reply_to_id,
    })
    setIsLoading(false)
  }

  return (
    <div className="fade-up-element mb-5 mt-4">
      <div className="flex">
        <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted md:h-10 md:w-10">
          {avatar ? (
            <Image
              src={avatar}
              alt={username!}
              className="object-cover"
              width={"100"}
              height={"100"}
            />
          ) : (
            <Icon.User
              aria-label="User Comment"
              className="h-6 w-6 md:h-10 md:w-10"
            />
          )}
        </div>
        <div className="ml-1 flex w-full flex-1 flex-col items-center">
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mx-3 mb-2 w-full border-b border-border">
                <FormField
                  control={form.control}
                  name="content"
                  rules={{ required: "Content must be filled" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Edit Comment</FormLabel>
                      <FormControl>
                        <Textarea
                          variant="plain"
                          onInput={(event) => {
                            const textarea = event.currentTarget
                            const currentFocus = document.activeElement
                            const totalHeight =
                              textarea.scrollHeight -
                              parseInt(getComputedStyle(textarea).paddingTop) -
                              parseInt(getComputedStyle(textarea).paddingBottom)
                            textarea.style.height = totalHeight + "px"
                            if (textarea.value === "") {
                              textarea.style.height = "30px"
                              textarea.focus()
                            }
                            if (currentFocus === textarea) {
                              textarea.focus()
                            }
                          }}
                          {...field}
                          className="mx-2 h-[30px] max-h-[180px] w-full resize-none overflow-hidden border border-b"
                          placeholder="Write comment…"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="ml-auto flex gap-4">
                <Button
                  aria-label="Cancel Comment"
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="ml-auto block h-auto rounded-full px-2 py-1"
                >
                  Cancel
                </Button>
                <Button
                  aria-label="Submit Comment"
                  loading={isLoading}
                  type="submit"
                  variant="outline"
                  className="ml-auto block h-auto rounded-full px-2 py-1"
                >
                  {!isLoading && "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ReplyWpComment

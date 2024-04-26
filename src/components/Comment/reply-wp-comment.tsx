"use client"

import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

import Image from "@/components/image"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast/use-toast"
import { api } from "@/lib/trpc/react"

interface FormValues {
  content: string
}

interface ReplyWpCommentProps {
  wp_post_slug: string
  reply_to_id: string
  onSuccess: () => void
  avatar?: string | null
  username?: string
  onCancel: () => void
}

const ReplyWpComment: React.FunctionComponent<ReplyWpCommentProps> = (
  props,
) => {
  const { wp_post_slug, onSuccess, avatar, username, reply_to_id, onCancel } =
    props

  const [isLoading, setIsLoading] = React.useState(false)

  const { register, handleSubmit, reset } = useForm<FormValues>()

  const { mutate: createComment } = api.wpComment.create.useMutation({
    onSuccess: () => {
      const textarea = document.querySelector("textarea")
      if (textarea) {
        textarea.style.height = "30px"
      }

      reset()
      onSuccess()
      toast({
        variant: "success",
        description: "Comment is successfully replied",
      })
    },
    onError: (error) => {
      const errorData = error?.data?.zodError?.fieldErrors

      if (errorData) {
        for (const field in errorData) {
          if (errorData.hasOwnProperty(field)) {
            errorData[field]?.forEach((errorMessage) => {
              toast({
                variant: "danger",
                description: errorMessage,
              })
            })
          }
        }
      } else {
        toast({
          variant: "danger",
          description: "Failed to reply! Please try again later",
        })
      }
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setIsLoading(true)
    createComment({
      wp_post_slug: wp_post_slug,
      content: values.content,
      reply_to_id: reply_to_id,
    })
    setIsLoading(false)
  }

  return (
    <form
      className="fade-up-element mb-5 mt-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex">
        <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted md:h-10 md:w-10">
          {avatar ? (
            <Image fill src={avatar} alt={username!} className="object-cover" />
          ) : (
            <Icon.User
              aria-label="User Comment"
              className="h-6 w-6 md:h-10 md:w-10"
            />
          )}
        </div>
        <div className="ml-1 flex w-full flex-1 flex-col items-center">
          <div className="mx-3 mb-2 w-full border-b border-border">
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
              {...register("content", {
                required: "content must be filled",
              })}
              className="mx-2 h-[30px] max-h-[180px] w-full resize-none overflow-hidden border border-b"
              placeholder="Write comment…"
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
              variant="outline"
              className="ml-auto block h-auto rounded-full px-2 py-1"
              onClick={handleSubmit(onSubmit)}
            >
              {!isLoading && "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ReplyWpComment

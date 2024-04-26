"use client"

import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast/use-toast"
import { api } from "@/lib/trpc/react"
import { cn } from "@/lib/utils/style"

interface FormValues {
  content: string
}

interface EditArticleCommentProps {
  id: string
  onSuccess: () => void
  content: string
  type?: "default" | "dashboard"
  onCancel?: () => void
}

const EditArticleComment: React.FunctionComponent<EditArticleCommentProps> = (
  props,
) => {
  const { id, onSuccess, content, type = "default", onCancel } = props

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      content: content ?? "",
    },
  })

  const { mutate: update } = api.articleComment.update.useMutation({
    onSuccess: () => {
      const textarea = document.querySelector("textarea")
      if (textarea && type === "default") {
        textarea.style.height = "31px"
      }

      reset()
      onSuccess()
      toast({
        variant: "success",
        description: "Comment is successfully created",
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
          description: "Failed to create! Please try again later",
        })
      }
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setIsLoading(true)
    update({ id: id, content: values.content })

    setIsLoading(false)
  }

  return (
    <div className="flex0 flex w-full flex-col items-center">
      <div className="mx-2 mb-2 w-full border-b border-border">
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
          {...register("content", {
            required: "content must be filled",
          })}
          className={cn(
            "max-h-[181px] w-full border border-b",
            type !== "dashboard"
              ? "mx-1 h-[30px] resize-y overflow-hidden"
              : "m1 h-[200px]",
          )}
          placeholder="Write comment…"
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
          className="ml-auto block h-auto rounded-full px-1 py-1"
          onClick={handleSubmit(onSubmit)}
        >
          {!isLoading && "Submit"}
        </Button>
      </div>
    </div>
  )
}

export default EditArticleComment
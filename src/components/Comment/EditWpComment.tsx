import * as React from "react"

import { Button } from "@/components/UI/Button"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useWpCreateComment } from "@/hooks/useWpComments"
import { cn } from "@/lib/utils/style"
import { type SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/UI/Button"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useWpCreateComment } from "@/hooks/useWpComments"
import { cn } from "@/lib/utils/style"
import { type SubmitHandler, useForm } from "react-hook-form"

interface FormValues {
  content: string
}

interface EditWpCommentProps {
  id: string
  onSuccess: () => void
  content: string
  type?: "default" | "dashboard"
  onCancel?: () => void
  wp_post_slug: string
}

const EditWPComment: React.FunctionComponent<EditWpCommentProps> = (props) => {
  const {
    id,
    onSuccess,
    content,
    type = "default",
    onCancel,
    wp_post_slug,
  } = props

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      content: content ?? "",
    },
  })

  const { handleCreateComment: update } = useWpCreateComment({
    onSuccess: () => {
      const textarea = document.querySelector("textarea")
      if (textarea && type === "default") {
        textarea.style.height = "30px"
      }

      reset()
      onSuccess()
      toast({
        variant: "success",
        description: "Comment is successfully edited",
      })
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    setIsLoading(true)
    update({ replyToId: id, content: values.content, wpPostSlug: wp_post_slug })
    setIsLoading(false)
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center">
      <div className="mx-3 mb-2 w-full border-b border-border">
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
                textarea.style.height = "30px"
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
            "max-h-[180px] w-full border border-b",
            type !== "dashboard"
              ? "mx-2 h-[30px] resize-y overflow-hidden"
              : "m-0 h-[200px]",
          )}
          placeholder="Write comment…"
        />
      </div>
      <div className="ml-auto flex gap-4">
        {onCancel && (
          <Button
            aria-label="Cancel Comment"
            type="button"
            onClick={onCancel}
            variant="outline"
            className="ml-auto block h-auto rounded-full px-2 py-1"
          >
            Cancel
          </Button>
        )}
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
  )
}

export default EditWPComment

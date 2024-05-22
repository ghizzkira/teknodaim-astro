import * as React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"

import { AlertDelete } from "@/components/AlertDelete"
import Image from "@/components/Image"
import Link from "@/components/Link"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useSession } from "@/hooks/useSession"

import { formatDateFromNow } from "@/lib/utils/date"
import type { LanguageType } from "@/lib/validation/language"
import EditWPComment from "./EditDownloadComment"
import ReplyDownloadComment from "./ReplyDownloadComment"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/UI/Form"
import {
  useCreateDownloadComment,
  useDeleteDownloadComment,
  useGetDownloadCommentByDownloadIdInfinite,
  useGetDownloadCommentCountByDownloadId,
} from "@/hooks/useDownloadComment"

interface DownloadCommentFormProps {
  downloadId: string
  locale: LanguageType
}

interface FormValues {
  content: string
  id: string
}

const DownloadComment: React.FunctionComponent<DownloadCommentFormProps> =
  React.memo((props) => {
    const { downloadId, locale } = props

    const { session } = useSession()
    const [openDeleteModal, setOpenDeleteModal] = React.useState<string | null>(
      null,
    )
    const [isEdited, setIsEdited] = React.useState("")
    const [isReplyied, setIsReplyied] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const { data: commentCount, refetch: refetchCount } =
      useGetDownloadCommentCountByDownloadId(downloadId)
    const {
      comments,
      fetchNextPage,
      hasNextPage,
      refetch: updateComment,
    } = useGetDownloadCommentByDownloadIdInfinite({
      downloadId: downloadId,
      limit: 10,
    })

    const form = useForm<FormValues>()

    const { handleCreateComment: createComment } = useCreateDownloadComment({
      onSuccess: () => {
        const textarea = document.querySelector("textarea")
        if (textarea) {
          textarea.style.height = "30px"
        }
        updateComment()
        form.setValue("content", "")
        refetchCount()
        toast({
          variant: "success",
          description: "Comment is successfully created",
        })
      },
    })

    const onSubmit: SubmitHandler<FormValues> = (values) => {
      setIsLoading(true)
      createComment({
        downloadId: downloadId,
        content: values.content,
      })

      setIsLoading(false)
    }

    const { handleDeleteComment: deleteDownloadCommentAction } =
      useDeleteDownloadComment({
        onSuccess: () => {
          updateComment()
          refetchCount()
          toast({
            variant: "success",
            description: "Comment is successfully deleted",
          })
        },
      })

    function handleDeleteComment(comment_id: string) {
      deleteDownloadCommentAction(comment_id)
    }

    return (
      <>
        <div className={`block w-full bg-background`}>
          <div className="mb-4 flex justify-between">
            <div
              id="drawer-label"
              className="inline-flex items-center text-lg font-semibold text-foreground"
            >
              Comments ({commentCount ?? 0})
            </div>
          </div>
          {session ? (
            <div className="mb-5 mt-4">
              <div className="flex">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                  {session?.user?.image ? (
                    <Image
                      src={session?.user?.image}
                      alt={session?.user?.name!}
                      width="100"
                      height="100"
                      className="h-10 w-10 object-cover"
                    />
                  ) : (
                    <Icon.User
                      aria-label="User Comment"
                      className="h-10 w-10"
                    />
                  )}
                </div>

                <div className="ml-1 flex w-full flex-1 flex-col items-center">
                  <Form {...form}>
                    <form
                      className="w-full"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="mx-3 mb-2 w-full border-b border-border">
                        <FormField
                          control={form.control}
                          name="content"
                          rules={{ required: "Content must be filled" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  variant="plain"
                                  onInput={(event) => {
                                    const textarea = event.currentTarget
                                    const currentFocus = document.activeElement
                                    const totalHeight =
                                      textarea.scrollHeight -
                                      parseInt(
                                        getComputedStyle(textarea).paddingTop,
                                      ) -
                                      parseInt(
                                        getComputedStyle(textarea)
                                          .paddingBottom,
                                      )
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
                      <Button
                        aria-label="Submit Comment"
                        loading={isLoading}
                        type="submit"
                        variant="outline"
                        className="ml-auto block h-auto rounded-full px-2 py-1"
                      >
                        {!isLoading && "Submit"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-8 flex items-center justify-center">
              <Button asChild aria-label="You should sign in before comment">
                <Link
                  locale={locale}
                  aria-label="You should sign in before comment"
                  href="/auth/login"
                >
                  You should sign in before comment
                </Link>
              </Button>
            </div>
          )}
          <ul className="mt-4 flex flex-col gap-3">
            {comments?.map((page) => {
              return page?.downloadComments.map((comment) => {
                return (
                  <>
                    <li className="relative flex flex-col" key={comment.id}>
                      <div className="flex justify-between">
                        <figcaption className="mb-2 flex flex-1 items-start justify-start gap-2 md:gap-4">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                            {comment?.author?.image ? (
                              <Image
                                src={comment?.author?.image}
                                alt={comment?.author?.name!}
                                className="h-10 w-10 object-cover"
                                width={"10"}
                                height={"10"}
                              />
                            ) : (
                              <Icon.User
                                aria-label="User Comment"
                                className="h-10 w-10"
                              />
                            )}
                          </div>
                          {isEdited !== comment.id ? (
                            <div className="flex flex-1 flex-col items-start gap-2">
                              <div className="flex items-center gap-1">
                                <div className="text-[13px] font-bold">
                                  {comment?.author?.name}
                                </div>
                                <div className="text-xs text-foreground">
                                  {formatDateFromNow(
                                    comment.createdAt!,
                                    locale,
                                  )}
                                </div>
                              </div>
                              <span className="text-[14px]">
                                {comment.content}
                              </span>
                              <div>
                                <Button
                                  aria-label="Reply Comment"
                                  onClick={() => setIsReplyied(comment.id!)}
                                  variant="ghost"
                                  className="h-8 w-8 rounded-full p-1 md:h-auto md:w-auto md:px-2 md:py-1"
                                >
                                  <span className="block md:hidden">
                                    <Icon.Comment aria-label="Reply Comment" />
                                  </span>
                                  <span className="hidden md:block">Reply</span>
                                </Button>
                              </div>
                              <div className="w-full">
                                {isReplyied === comment?.id ? (
                                  <ReplyDownloadComment
                                    downloadId={downloadId ?? ""}
                                    replyToId={comment?.id ?? ""}
                                    avatar={session?.user?.image}
                                    username={session?.user?.username!}
                                    onSuccess={() => {
                                      refetchCount()
                                      updateComment()
                                      setIsReplyied("")
                                    }}
                                    onCancel={() => setIsReplyied("")}
                                  />
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <EditWPComment
                              id={comment.id}
                              onCancel={() => setIsEdited("")}
                              onSuccess={() => {
                                setIsEdited("")
                                updateComment()
                              }}
                              content={comment.content ?? ""}
                              authorId={session?.user?.id!}
                            />
                          )}
                        </figcaption>
                        {!isEdited && session?.user?.role === "admin" ? (
                          <Popover>
                            <PopoverTrigger className="cursor-pointer">
                              <Icon.MoreVert aria-label="Open Menu" />
                            </PopoverTrigger>
                            <PopoverContent className="flex w-[min-content] p-0">
                              <div className="divide-y divide-muted/50">
                                <div className="flex flex-col py-1 text-sm text-foreground">
                                  <Button
                                    aria-label="Delete Comment"
                                    variant="ghost"
                                    className="h-auto"
                                    onClick={() => {
                                      setOpenDeleteModal(comment.id!)
                                    }}
                                  >
                                    <Icon.Delete
                                      aria-label="Delete Comment"
                                      className="mr-1"
                                    />
                                    Delete
                                  </Button>
                                  <Button
                                    aria-label="Edit Comment"
                                    className="h-auto"
                                    onClick={() => {
                                      setIsEdited(comment.id!)
                                    }}
                                    variant="ghost"
                                  >
                                    <Icon.Edit
                                      aria-label="Edit Comment"
                                      className="mr-1"
                                    />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ) : null}
                        <AlertDelete
                          isOpen={openDeleteModal === comment.id!}
                          className="max-w-[366px]"
                          onDelete={() => {
                            handleDeleteComment(comment.id!)
                            setOpenDeleteModal(null)
                          }}
                          onClose={() => setOpenDeleteModal(null)}
                        />
                      </div>
                    </li>
                    {comment?.replies?.map((reply) => {
                      return (
                        <li
                          className="relative ml-12 flex flex-col md:ml-14"
                          key={reply.id}
                        >
                          <div className="flex justify-between">
                            <figcaption className="mb-2 flex flex-1 items-start justify-start gap-2 md:gap-4">
                              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted md:h-10 md:w-10">
                                {reply?.author?.image ? (
                                  <Image
                                    src={reply?.author?.image}
                                    alt={reply?.author?.name!}
                                    className="object-cover"
                                    width={""}
                                    height={""}
                                  />
                                ) : (
                                  <Icon.User
                                    aria-label="User Comment"
                                    className="h-6 w-6 md:h-10 md:w-10"
                                  />
                                )}
                              </div>
                              {isEdited !== reply.id ? (
                                <div className="flex flex-1 flex-col items-start gap-2">
                                  <div className="flex items-center gap-1">
                                    <div className="text-[13px] font-bold">
                                      {reply?.author?.name}
                                    </div>
                                    <div className="text-xs text-foreground">
                                      {formatDateFromNow(
                                        comment.createdAt!,
                                        locale,
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-[14px]">
                                    {reply.content}
                                  </span>
                                  <div>
                                    <Button
                                      aria-label="Reply Comment"
                                      onClick={() => setIsReplyied(reply?.id!)}
                                      variant="ghost"
                                      className="h-8 w-8 rounded-full p-1 md:h-auto md:w-auto md:px-2 md:py-1"
                                    >
                                      <span className="block md:hidden">
                                        <Icon.Comment aria-label="Reply Comment" />
                                      </span>
                                      <span className="hidden md:block">
                                        Reply
                                      </span>
                                    </Button>
                                  </div>
                                  <div className="w-full">
                                    {isReplyied === reply?.id ? (
                                      <ReplyDownloadComment
                                        downloadId={downloadId ?? ""}
                                        replyToId={comment?.id ?? ""}
                                        avatar={session?.user?.image}
                                        username={session?.user?.username!}
                                        onSuccess={() => {
                                          refetchCount()
                                          updateComment()
                                          setIsReplyied("")
                                        }}
                                        onCancel={() => setIsReplyied("")}
                                      />
                                    ) : null}
                                  </div>
                                </div>
                              ) : (
                                <EditWPComment
                                  id={reply.id}
                                  onCancel={() => setIsEdited("")}
                                  onSuccess={() => {
                                    setIsEdited("")
                                    updateComment()
                                  }}
                                  content={reply.content ?? ""}
                                  authorId={session?.user?.id!}
                                />
                              )}
                            </figcaption>
                            {!isEdited && session?.user?.role === "admin" ? (
                              <Popover>
                                <PopoverTrigger className="cursor-pointer">
                                  <Icon.MoreVert aria-label="Open Menu" />
                                </PopoverTrigger>
                                <PopoverContent className="flex w-[min-content] p-0">
                                  <div className="divide-y divide-muted/50">
                                    <div className="flex flex-col py-1 text-sm text-foreground">
                                      <Button
                                        aria-label="Delete Comment"
                                        variant="ghost"
                                        className="h-auto"
                                        onClick={() => {
                                          setOpenDeleteModal(reply.id!)
                                        }}
                                      >
                                        <Icon.Delete
                                          aria-label="Delete Comment"
                                          className="mr-1"
                                        />
                                        Delete
                                      </Button>
                                      <Button
                                        aria-label="Edit Comment"
                                        className="h-auto"
                                        onClick={() => {
                                          setIsEdited(reply.id!)
                                        }}
                                        variant="ghost"
                                      >
                                        <Icon.Edit
                                          aria-label="Edit Comment"
                                          className="mr-1"
                                        />
                                        Edit
                                      </Button>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            ) : null}
                            <AlertDelete
                              isOpen={openDeleteModal === reply.id!}
                              className="max-w-[366px]"
                              onDelete={() => {
                                handleDeleteComment(reply.id!)

                                setOpenDeleteModal(null)
                              }}
                              onClose={() => setOpenDeleteModal(null)}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </>
                )
              })
            })}
          </ul>
          {session?.user && hasNextPage ? (
            <Button
              aria-label="Load More Comment"
              onClick={() => {
                fetchNextPage()
              }}
              type="button"
              className="mt-2 w-full"
            >
              Load More
            </Button>
          ) : null}
        </div>
      </>
    )
  })

export default DownloadComment

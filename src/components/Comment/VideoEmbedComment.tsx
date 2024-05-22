//TODO: add delete option for user and admin

import * as React from "react"

import { useForm, type SubmitHandler } from "react-hook-form"

import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"

import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import type { SelectUser, SelectVideoEmbedComment } from "@/lib/db/schema"
import { useSession } from "@/hooks/useSession"
import {
  useCreateVideoEmbedComment,
  useDeleteVideoEmbedComment,
  useGetVideoEmbedCommentByVideoEmbedIdInfinite,
  useGetVideoEmbedCommentCountByVideoEmbedId,
} from "@/hooks/useVideoEmbedComment"
import { toast } from "@/components/UI/Toast/useToast"
import { formatDateFromNow } from "@/lib/utils/date"
import ReplyVideoEmbedComment from "./ReplyVideoEmbedComment"
import EditVideoEmbedComment from "./EditVideoEmbedComment"
import { Textarea } from "@/components/UI/Textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover"
import { AlertDelete } from "@/components/AlertDelete"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/UI/Form"

type RepliesProps = SelectVideoEmbedComment & {
  author: Pick<SelectUser, "name" | "image">
}

type CommentProps = Omit<
  SelectVideoEmbedComment,
  "replyToId" | "authorId" | "videoEmbedId" | "updatedAt"
> & {
  author?: Pick<SelectUser, "name" | "image">
  replies?: RepliesProps[]
}

interface VideoEmbedCommentFormProps {
  videoEmbedId: string
  locale: LanguageType
  type?: "video" | "shorts"
}

interface FormValues {
  content: string
  id: string
}

export const VideoEmbedComment: React.FunctionComponent<VideoEmbedCommentFormProps> =
  React.memo((props) => {
    const { videoEmbedId, locale, type = "video" } = props

    const { session } = useSession()

    const [openDeleteAction, setOpenDeleteAction] = React.useState<
      string | null
    >(null)
    const [isEdited, setIsEdited] = React.useState("")
    const [isReplyied, setIsReplyied] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(true)
    const [openReplies, setOpenReplites] = React.useState<string | null>(null)

    const { data: commentCount, refetch } =
      useGetVideoEmbedCommentCountByVideoEmbedId(videoEmbedId)
    const {
      comments,
      fetchNextPage,
      hasNextPage,
      refetch: updateComment,
    } = useGetVideoEmbedCommentByVideoEmbedIdInfinite({
      videoEmbedId: videoEmbedId,
      limit: 10,
    })

    const form = useForm<FormValues>()

    React.useEffect(() => {
      const mediaQueryList = window.matchMedia("(max-width: 640px)")

      const listener = (event: MediaQueryListEvent) => {
        setIsMobile(event.matches)
      }

      listener(mediaQueryList as unknown as MediaQueryListEvent)

      mediaQueryList.addEventListener("change", listener)

      return () => {
        mediaQueryList.removeEventListener("change", listener)
      }
    }, [])

    const { handleCreateComment: createComment } = useCreateVideoEmbedComment({
      onSuccess: () => {
        const textarea = document.querySelector("textarea")
        if (textarea) {
          textarea.style.height = "30px"
        }
        updateComment()
        form.reset()
        refetch()
        toast({
          variant: "success",
          description: "Comment is successfully created",
        })
      },
      onError: () => {
        toast({
          variant: "danger",
          description: "Failed to create! Please try again later",
        })
      },
    })

    const onSubmit: SubmitHandler<FormValues> = (values) => {
      setIsLoading(true)
      createComment({
        videoEmbedId,
        content: values.content,
      })
      setIsLoading(false)
    }

    const { handleDeleteComment: deleteVideoEmbedCommentAction } =
      useDeleteVideoEmbedComment({
        onSuccess: () => {
          updateComment()
          refetch()
          toast({
            variant: "success",
            description: "Comment is successfully deleted",
          })
        },
        onError: () => {
          toast({
            variant: "danger",
            description: "Failed to delete! Please try again later",
          })
        },
      })

    function handleDeleteComment(comment_id: string) {
      deleteVideoEmbedCommentAction(comment_id)
    }

    const CommentsContainer = (props: { className?: string }) => {
      const { className } = props
      return (
        <>
          <div
            className={cn(
              `block w-full overflow-x-hidden bg-background`,
              className,
            )}
          >
            <div className="mb-4 flex justify-between">
              <div
                id="drawer-label"
                className="inline-flex items-center text-lg font-semibold text-foreground"
              >
                Comments ({commentCount ?? 0})
              </div>
            </div>
            {session?.user ? (
              <form className="mb-5 mt-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    {session?.user?.image ? (
                      <Image
                        width="40"
                        height="40"
                        src={session?.user?.image}
                        alt={session?.user?.name!}
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
                                      const currentFocus =
                                        document.activeElement
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
                          variant="outline"
                          className="ml-auto block h-auto rounded-full px-2 py-1"
                          onClick={form.handleSubmit(onSubmit)}
                        >
                          {!isLoading && "Submit"}
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </form>
            ) : (
              <div className="my-8 flex items-center justify-center">
                <Button asChild aria-label="Sign In">
                  <a aria-label="Sign In" href="/auth/login">
                    You should sign in before comment
                  </a>
                </Button>
              </div>
            )}
            <ul className="mt-4 flex flex-col gap-3">
              {comments?.map((page) => {
                return page?.videoEmbedComments.map((comment, i) => {
                  return (
                    <>
                      <CommentsContent
                        key={comment.id + i}
                        comment={comment}
                        isEdited={isEdited}
                        setIsEdited={setIsEdited}
                        openReplies={openReplies}
                        refetch={refetch}
                        setIsReplyied={setIsReplyied}
                        isReplyied={isReplyied}
                        setOpenReplites={setOpenReplites}
                        locale={locale}
                        session={session}
                        updateComment={updateComment}
                        setOpenDeleteAction={setOpenDeleteAction}
                        openDeleteAction={openDeleteAction}
                        handleDeleteComment={handleDeleteComment}
                      />
                      {openReplies === comment.id &&
                        comment?.replies?.map((reply, i) => {
                          return (
                            <ReplyContent
                              key={reply.id + i}
                              reply={reply}
                              isEdited={isEdited}
                              setIsEdited={setIsEdited}
                              locale={locale}
                              session={session}
                              updateComment={updateComment}
                              setOpenDeleteAction={setOpenDeleteAction}
                              openDeleteAction={openDeleteAction}
                              handleDeleteComment={handleDeleteComment}
                            />
                          )
                        })}
                    </>
                  )
                })
              })}
            </ul>
            {hasNextPage ? (
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
    }
    return (
      <>
        {type === "video" && isMobile ? (
          <details id="comments-mobile" className="modal">
            <summary className={cn("list-none")}>
              {comments?.[0]?.videoEmbedComments[0]?.author?.image ? (
                <div className="flex w-full cursor-pointer flex-col gap-2 rounded-lg bg-muted p-3 hover:bg-muted/90 sm:hidden">
                  <h2
                    id="drawer-label"
                    className="inline-flex items-center text-lg font-semibold text-foreground"
                  >
                    Comments ({commentCount ?? 0})
                  </h2>
                  <div className="flex gap-4">
                    <div className="relative h-7 w-7 overflow-hidden rounded-full bg-muted">
                      <Image
                        width="40"
                        height="40"
                        src={
                          comments?.[0]?.videoEmbedComments[0]?.author?.image ??
                          ""
                        }
                        alt={
                          comments?.[0]?.videoEmbedComments[0]?.author?.name!
                        }
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div>{comments?.[0]?.videoEmbedComments[0]?.content}</div>
                  </div>
                </div>
              ) : (
                <div className="pointer-events-none flex w-full cursor-pointer flex-col gap-2 rounded-lg bg-muted p-3 hover:bg-muted/90 sm:hidden">
                  <div className="w-full border-b">Write Something</div>
                </div>
              )}
              <div
                className={cn(
                  "fake-close-button pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[10] bg-opacity-0 opacity-0 transition-opacity duration-200 ease-out",
                )}
              ></div>
            </summary>
            <div
              className={
                isMobile
                  ? "opacity-1 fixed bottom-0 left-0 top-[calc(56.25vw+65px)] z-[49] w-full overflow-y-auto rounded-md bg-background p-3 sm:static sm:left-[unset] sm:z-[unset] sm:rounded-none"
                  : "sm:hidden"
              }
            >
              <div>
                <Button
                  variant="ghost"
                  className="rounded-full p-2"
                  onClick={() => {
                    const detailsEl = document.getElementById(
                      "comments-mobile",
                    ) as HTMLDetailsElement
                    if (detailsEl.open) {
                      detailsEl.open = false
                    }
                  }}
                >
                  <Icon.Close className="h-4 w-4" />
                </Button>
              </div>
              <CommentsContainer className="h-auto overflow-y-auto" />
            </div>
          </details>
        ) : (
          type === "video" && (
            <div
              className={cn(
                type === "video" ? "hidden sm:block" : "block w-full",
              )}
            >
              {<CommentsContainer />}
            </div>
          )
        )}
      </>
    )
  })

interface CommensDataProps extends React.HTMLAttributes<HTMLLIElement> {
  comment: CommentProps
  isEdited: string | null
  setIsEdited: React.Dispatch<React.SetStateAction<string>>

  openReplies: string | null
  refetch: () => void
  setIsReplyied: React.Dispatch<React.SetStateAction<string>>
  isReplyied: string
  setOpenReplites: React.Dispatch<React.SetStateAction<string | null>>
  locale: LanguageType
  videoEmbedId?: string
  session?: { user: SelectUser } | null
  updateComment: () => void
  setOpenDeleteAction: React.Dispatch<React.SetStateAction<string | null>>

  openDeleteAction: string | null
  // eslint-disable-next-line no-unused-vars
  handleDeleteComment: (id: string) => void
}

const CommentsContent: React.FunctionComponent<CommensDataProps> = React.memo(
  (props) => {
    const {
      comment,
      isEdited,
      setIsEdited,
      openReplies,
      setIsReplyied,
      isReplyied,
      setOpenReplites,
      refetch,
      videoEmbedId,
      session,
      updateComment,
      setOpenDeleteAction,
      openDeleteAction,
      locale,
      handleDeleteComment,
    } = props
    return (
      <>
        <li className="relative flex flex-col">
          <div className="flex justify-between">
            <figcaption className="mb-2 flex flex-1 items-start justify-start gap-2 md:gap-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                {comment?.author?.image ? (
                  <Image
                    width="40"
                    height="40"
                    src={comment?.author?.image}
                    alt={comment?.author?.name!}
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  <Icon.User aria-label="User Comment" className="h-10 w-10" />
                )}
              </div>
              {isEdited !== comment.id ? (
                <div className="flex flex-1 flex-col items-start gap-2">
                  <div className="flex items-center gap-1">
                    <div className="text-[13px] font-bold">
                      {comment?.author?.name}
                    </div>
                    <div className="text-xs text-foreground">
                      {formatDateFromNow(comment.createdAt!, locale)}
                    </div>
                  </div>
                  <span className="text-[14px]">{comment.content}</span>
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
                      <ReplyVideoEmbedComment
                        id={videoEmbedId ?? ""}
                        replyToId={comment?.id ?? ""}
                        avatar={session?.user?.image}
                        username={session?.user?.username!}
                        onSuccess={() => {
                          refetch()
                          updateComment()
                          setIsReplyied("")
                        }}
                        onCancel={() => setIsReplyied("")}
                      />
                    ) : null}
                  </div>
                  {comment?.replies?.length && comment?.replies?.length > 0 && (
                    <div className="w-full">
                      <Button
                        aria-label="Reply Comment"
                        variant="outline"
                        className="cursor-pointer rounded-full px-3 py-1 hover:bg-info"
                        onClick={() => {
                          if (openReplies === null) {
                            setOpenReplites(comment?.id ?? "")
                          } else {
                            setOpenReplites(null)
                          }
                        }}
                      >
                        {comment?.replies?.length} Replies
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <EditVideoEmbedComment
                  id={comment.id}
                  authorId={session?.user?.id!}
                  onCancel={() => setIsEdited("")}
                  onSuccess={() => {
                    setIsEdited("")
                    updateComment()
                  }}
                  content={comment.content ?? ""}
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
                          setOpenDeleteAction(comment.id!)
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
                        <Icon.Edit aria-label="Edit Comment" className="mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
            <AlertDelete
              isOpen={openDeleteAction === comment.id!}
              className="max-w-[366px]"
              onDelete={() => {
                handleDeleteComment(comment.id!)
                setOpenDeleteAction(null)
              }}
              onClose={() => setOpenDeleteAction(null)}
            />
          </div>
        </li>
      </>
    )
  },
)

interface ReplyContentProps extends React.HTMLAttributes<HTMLLIElement> {
  reply: RepliesProps
  isEdited: string | null
  setIsEdited: React.Dispatch<React.SetStateAction<string>>

  locale: LanguageType
  session?: { user: SelectUser } | null
  updateComment: () => void
  setOpenDeleteAction: React.Dispatch<React.SetStateAction<string | null>>

  openDeleteAction: string | null
  // eslint-disable-next-line no-unused-vars
  handleDeleteComment: (id: string) => void
}

const ReplyContent: React.FunctionComponent<ReplyContentProps> = React.memo(
  (props) => {
    const {
      reply,
      isEdited,
      setIsEdited,
      session,
      updateComment,
      setOpenDeleteAction,
      openDeleteAction,
      locale,
      handleDeleteComment,
    } = props
    return (
      <>
        <li className="relative ml-12 flex flex-col md:ml-14" key={reply.id}>
          <div className="flex justify-between">
            <figcaption className="mb-2 flex flex-1 items-start justify-start gap-2 md:gap-4">
              <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted md:h-10 md:w-10">
                {reply?.author?.image ? (
                  <Image
                    width="40"
                    height="40"
                    src={reply?.author?.image}
                    alt={reply?.author?.name!}
                    className="!h-full !w-full object-cover"
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
                      {formatDateFromNow(reply.createdAt!, locale)}
                    </div>
                  </div>
                  <span className="text-[14px]">{reply.content}</span>
                </div>
              ) : (
                <EditVideoEmbedComment
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
                          setOpenDeleteAction(reply.id!)
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
                        <Icon.Edit aria-label="Edit Comment" className="mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : null}
            <AlertDelete
              isOpen={openDeleteAction === reply.id!}
              className="max-w-[366px]"
              onDelete={() => {
                handleDeleteComment(reply.id!)
                setOpenDeleteAction(null)
              }}
              onClose={() => setOpenDeleteAction(null)}
            />
          </div>
        </li>
      </>
    )
  },
)

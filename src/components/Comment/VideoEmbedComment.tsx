//TODO: add delete option for user and admin

import * as React from "react"
import dynamic from "next/dynamic"
import NextLink from "next/link"
import type {
  User,
  VideoEmbedComment as VideoEmbedCommentProps,
} from "@prisma/client"
import { useForm, type SubmitHandler } from "react-hook-form"

import Image from "@/components/image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/ui/icon"
import { handleCloseModal, handleOpenModal } from "@/components/ui/modal"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/UseToast"
import { useSession } from "@/lib/auth/client"
import type { AuthSession } from "@/lib/auth/utils"
import { api } from "@/lib/trpc/react"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import EditVideoEmbedComment from "./EditVideoEmbedComment"
import ReplyVideoEmbedComment from "./ReplyVideoEmbedComment"

const DateWrapper = dynamic(
  async () => {
    const DateWrapper = await import("@/components/date-wrapper")
    return DateWrapper.default
  },
  {
    ssr: false,
    loading: () => (
      <span className="inline-block h-4 w-8 animate-pulse rounded-md bg-muted" />
    ),
  },
)

const AlertDelete = React.lazy(() => import("@/components/alert-delete"))

type RepliesProps = VideoEmbedCommentProps & {
  author: Pick<User, "name" | "image">
}

type CommentProps = Omit<
  VideoEmbedCommentProps,
  "reply_to_id" | "author_id" | "video_embed_id" | "updatedAt"
> & {
  author: Pick<User, "name" | "image">
  replies: RepliesProps[]
}

interface VideoEmbedCommentFormProps {
  video_embed_id: string
  locale: LanguageType
  type?: "video" | "shorts"
}

interface FormValues {
  content: string
  id: string
}

export const VideoEmbedComment: React.FunctionComponent<VideoEmbedCommentFormProps> =
  React.memo((props) => {
    const { video_embed_id, locale, type = "video" } = props

    const { data: session } = useSession()

    const [openDeleteAction, setOpenDeleteAction] = React.useState<
      string | null
    >(null)
    const [isEdited, setIsEdited] = React.useState("")
    const [isReplyied, setIsReplyied] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(true)
    const [openReplies, setOpenReplites] = React.useState<string | null>(null)

    const { data: commentCount, refetch } =
      api.videoEmbedComment.countByVideoEmbedId.useQuery(video_embed_id)
    const {
      data,
      fetchNextPage,
      hasNextPage,
      refetch: updateComment,
    } = api.videoEmbedComment.byVideoEmbedIdInfinite.useInfiniteQuery(
      {
        video_embed_id: video_embed_id,
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,

        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    )

    const { register, handleSubmit, reset } = useForm<FormValues>()

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

    const { mutate: createComment } = api.videoEmbedComment.create.useMutation({
      onSuccess: () => {
        const textarea = document.querySelector("textarea")
        if (textarea) {
          textarea.style.height = "30px"
        }
        updateComment()
        reset()
        refetch()
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
        video_embed_id,
        content: values.content,
      })
      setIsLoading(false)
    }

    const { mutate: deleteVideoEmbedCommentAction } =
      api.videoEmbedComment.delete.useMutation({
        onSuccess: () => {
          updateComment()
          refetch()
          toast({
            variant: "success",
            description: "Comment is successfully deleted",
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
              description: "Failed to delete! Please try again later",
            })
          }
        },
      })

    function handleDeleteComment(comment_id: string) {
      deleteVideoEmbedCommentAction(comment_id)
    }

    const CommentsContent = (props: { className?: string }) => {
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
                        fill
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
              </form>
            ) : (
              <div className="my-8 flex items-center justify-center">
                <Button asChild aria-label="Sign In">
                  <NextLink aria-label="Sign In" href="/auth/login">
                    You should sign in before comment
                  </NextLink>
                </Button>
              </div>
            )}
            <ul className="mt-4 flex flex-col gap-3">
              {data?.pages.map((page) => {
                return page?.videoEmbedComments.map((comment, i) => {
                  return (
                    <>
                      <CommentsData
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
                            <ReplyData
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
              {data?.pages[0]?.videoEmbedComments[0]?.author?.image ? (
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
                        fill
                        src={
                          data?.pages[0]?.videoEmbedComments[0]?.author
                            ?.image ?? ""
                        }
                        alt={
                          data?.pages[0]?.videoEmbedComments[0]?.author?.name!
                        }
                        className="h-10 w-10 object-cover"
                      />
                    </div>
                    <div>{data?.pages[0]?.videoEmbedComments[0]?.content}</div>
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
              <CommentsContent className="h-auto overflow-y-auto" />
            </div>
          </details>
        ) : (
          type === "video" && (
            <div
              className={cn(
                type === "video" ? "hidden sm:block" : "block w-full",
              )}
            >
              {<CommentsContent />}
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
  video_embed_id?: string
  session?: AuthSession["session"] | null
  updateComment: () => void
  setOpenDeleteAction: React.Dispatch<React.SetStateAction<string | null>>

  openDeleteAction: string | null
  // eslint-disable-next-line no-unused-vars
  handleDeleteComment: (id: string) => void
}

const CommentsData: React.FunctionComponent<CommensDataProps> = React.memo(
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
      video_embed_id,
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
                    fill
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
                      <DateWrapper date={comment.createdAt} language={locale} />
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
                        id={video_embed_id ?? ""}
                        reply_to_id={comment?.id ?? ""}
                        avatar={session?.user?.image}
                        username={session?.user?.username}
                        onSuccess={() => {
                          refetch()
                          updateComment()
                          setIsReplyied("")
                        }}
                        onCancel={() => setIsReplyied("")}
                      />
                    ) : null}
                  </div>
                  {comment?.replies?.length > 0 && (
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
              <>
                <Button
                  aria-label="Open Menu"
                  onClick={() => {
                    if (openDeleteAction !== comment.id) {
                      setOpenDeleteAction(comment.id!)
                    } else {
                      setOpenDeleteAction("")
                    }
                  }}
                  variant="ghost"
                  size="icon"
                >
                  {openDeleteAction !== comment.id ? (
                    <Icon.MoreVert aria-label="Open Menu" />
                  ) : (
                    <Icon.Close aria-label="Close Menu" />
                  )}
                </Button>
                {openDeleteAction === comment.id && (
                  <div className="absolute right-[0px] flex w-[min-content] rounded-md border bg-background p-2">
                    <div className="divide-y divide-muted/50">
                      <div className="flex flex-col py-1 text-sm text-foreground">
                        <Button
                          aria-label="Delete Comment"
                          variant="ghost"
                          className="h-auto"
                          onClick={() => {
                            handleOpenModal(comment.id!)
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
                            setOpenDeleteAction(null)
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
                    <Button
                      aria-label="Close Menu"
                      onClick={() => {
                        if (openDeleteAction !== comment.id) {
                          setOpenDeleteAction(comment.id!)
                        } else {
                          setOpenDeleteAction("")
                        }
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <Icon.Close aria-label="Close Menu" />
                    </Button>
                    <AlertDelete
                      id={comment.id!}
                      onDelete={() => {
                        handleDeleteComment(comment.id!)
                        handleCloseModal(comment.id!)
                      }}
                      onClose={() => handleCloseModal(comment.id!)}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        </li>
      </>
    )
  },
)

interface ReplyDataProps extends React.HTMLAttributes<HTMLLIElement> {
  reply: RepliesProps
  isEdited: string | null
  setIsEdited: React.Dispatch<React.SetStateAction<string>>

  locale: LanguageType
  session?: AuthSession["session"] | null
  updateComment: () => void
  setOpenDeleteAction: React.Dispatch<React.SetStateAction<string | null>>

  openDeleteAction: string | null
  // eslint-disable-next-line no-unused-vars
  handleDeleteComment: (id: string) => void
}

const ReplyData: React.FunctionComponent<ReplyDataProps> = React.memo(
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
                    fill
                    src={reply?.author?.image}
                    alt={reply?.author?.name!}
                    className="object-cover"
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
                      <DateWrapper date={reply.createdAt} language={locale} />
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
                />
              )}
            </figcaption>
            {!isEdited && session?.user?.role === "admin" ? (
              <>
                <Button
                  aria-label="Open Menu"
                  onClick={() => {
                    if (openDeleteAction !== reply.id) {
                      setOpenDeleteAction(reply.id!)
                    } else {
                      setOpenDeleteAction("")
                    }
                  }}
                  variant="ghost"
                  size="icon"
                >
                  {openDeleteAction !== reply.id ? (
                    <Icon.MoreVert aria-label="Open Menu" />
                  ) : (
                    <Icon.Close aria-label="Close Menu" />
                  )}
                </Button>
                {openDeleteAction === reply.id && (
                  <div className="absolute right-[0px] flex w-[min-content] rounded-md border bg-background p-2">
                    <div className="divide-y divide-muted/50">
                      <div className="flex flex-col py-1 text-sm text-foreground">
                        <Button
                          aria-label="Delete Comment"
                          variant="ghost"
                          className="h-auto"
                          onClick={() => {
                            handleOpenModal(reply.id!)
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
                            setOpenDeleteAction(null)
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
                    <Button
                      aria-label="Close Menu"
                      onClick={() => {
                        if (openDeleteAction !== reply.id) {
                          setOpenDeleteAction(reply.id!)
                        } else {
                          setOpenDeleteAction("")
                        }
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <Icon.Close aria-label="Close Menu" />
                    </Button>
                  </div>
                )}
              </>
            ) : null}
            <AlertDelete
              id={reply.id!}
              className="max-w-[366px]"
              onDelete={() => {
                handleDeleteComment(reply.id!)

                handleCloseModal(reply.id!)
              }}
              onClose={() => handleCloseModal(reply.id!)}
            />
          </div>
        </li>
      </>
    )
  },
)

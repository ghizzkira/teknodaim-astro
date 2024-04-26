import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { Icon } from "@radix-ui/react-select"
import { useForm, type SubmitHandler } from "react-hook-form"

import { AlertDelete } from "@/components/AlertDelete"
import { Button } from "@/components/UI/Button"
import { Textarea } from "@/components/UI/Textarea"
import { toast } from "@/components/UI/Toast/useToast"
import { useSession } from "@/hooks/useSession"
import type { LanguageType } from "@/lib/validation/language"
import EditWPComment from "./EditWpComment"
import ReplyWpComment from "./ReplyWpComment"

interface WpCommentFormProps {
  wp_post_slug: string
  locale: LanguageType
}

interface FormValues {
  content: string
  id: string
}

const WpComment: React.FunctionComponent<WpCommentFormProps> = React.memo(
  (props) => {
    const { wp_post_slug, locale } = props

    const { session } = useSession()

    const [isEdited, setIsEdited] = React.useState("")
    const [isReplyied, setIsReplyied] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    const { data: commentCount, refetch } =
      api.wpComment.countByWpPostSlug.useQuery(wp_post_slug)
    const {
      data,
      fetchNextPage,
      hasNextPage,
      refetch: updateComment,
    } = api.wpComment.byWpPostSlugInfinite.useInfiniteQuery(
      {
        wp_post_slug: wp_post_slug,
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,

        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    )

    const { register, handleSubmit, reset } = useForm<FormValues>()

    const { mutate: createComment } = api.wpComment.create.useMutation({
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
      createComment({
        wp_post_slug,
        content: values.content,
      })

      setIsLoading(false)
    }

    const { mutate: deleteWpCommentAction } = api.wpComment.delete.useMutation({
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
      deleteWpCommentAction(comment_id)
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
              <Button asChild aria-label="You should sign in before comment">
                <NextLink
                  aria-label="You should sign in before comment"
                  href="/auth/login"
                >
                  You should sign in before comment
                </NextLink>
              </Button>
            </div>
          )}
          <ul className="mt-4 flex flex-col gap-3">
            {data?.pages.map((page) => {
              return page?.wpComments.map((comment) => {
                return (
                  <>
                    <li className="relative flex flex-col" key={comment.id}>
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
                                  <DateWrapper
                                    date={comment.createdAt}
                                    language={locale}
                                  />
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
                                  <ReplyWpComment
                                    wp_post_slug={wp_post_slug ?? ""}
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
                            />
                          )}
                        </figcaption>
                        {!isEdited && session?.user?.role === "admin" ? (
                          <Popover>
                            <PopoverTrigger
                              variant="ghost"
                              className="cursor-pointer"
                            >
                              <Icon.MoreVert aria-label="Open Menu" />
                            </PopoverTrigger>
                            <PopoverContent
                              placement="left"
                              className="flex w-[min-content] p-0"
                            >
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
                          id={comment.id!}
                          className="max-w-[366px]"
                          onDelete={() => {
                            handleDeleteComment(comment.id!)
                            handleCloseModal(comment.id!)
                          }}
                          onClose={() => handleCloseModal(comment.id!)}
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
                                      <DateWrapper
                                        date={comment.createdAt}
                                        language={locale}
                                      />
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
                                      <ReplyWpComment
                                        wp_post_slug={wp_post_slug ?? ""}
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
                                />
                              )}
                            </figcaption>
                            {!isEdited && session?.user?.role === "admin" ? (
                              <Popover>
                                <PopoverTrigger
                                  variant="ghost"
                                  className="cursor-pointer"
                                >
                                  <Icon.MoreVert aria-label="Open Menu" />
                                </PopoverTrigger>
                                <PopoverContent
                                  placement="left"
                                  className="flex w-[min-content] p-0"
                                >
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
  },
)

export default WpComment
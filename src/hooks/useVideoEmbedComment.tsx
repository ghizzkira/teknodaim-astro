import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectVideoEmbedComment } from "@/lib/db/schema/video-embed-comment"
import type {
  CreateVideoEmbedComment,
  UpdateVideoEmbedComment,
} from "@/lib/validation/video-embed-comment"
import type { SelectUser } from "@/lib/db/schema"

export function useCreateVideoEmbedComment({
  onSuccess,
  onError,
}: {
  input?: CreateVideoEmbedComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateComment = async ({
    videoEmbedId,
    content,
    replyToId,
  }: {
    videoEmbedId: string
    content: string
    replyToId?: string | null | undefined
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/video-embed-comment/create", {
        method: "POST",
        body: JSON.stringify({
          videoEmbedId,
          content,
          replyToId,
        }),
      })
      const data = await response.json()
      if (response.ok) {
        onSuccess && onSuccess()
      } else {
        onError && onError()
      }
      return data
    } catch (error) {
      onError && onError()
      toast({
        description: "Error when creating comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateComment }
}

export function useUpdateVideoEmbedComment({
  onSuccess,
  onError,
  byAdmin,
}: {
  onSuccess?: () => void
  onError?: () => void
  byAdmin?: boolean
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateComment = async (
    input: UpdateVideoEmbedComment & { authorId: string },
  ) => {
    setIsLoading(true)
    try {
      const url = byAdmin
        ? "/api/video-embed-comment/update/by-admin"
        : "/api/video-embed-comment/update"
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (response.ok) {
        onSuccess && onSuccess()
      } else {
        onError && onError()
      }
      return data
    } catch (error) {
      onError && onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateComment }
}
export function useDeleteVideoEmbedComment({
  onSuccess,
  onError,
  byAdmin,
}: {
  input?: CreateVideoEmbedComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
  byAdmin?: boolean
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async (comment_id: string) => {
    setIsLoading(true)
    try {
      const url = byAdmin
        ? "/api/video-embed-comment/delete/by-admin"
        : "/api/video-embed-comment/delete"
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(comment_id),
      })
      const data = await response.json()

      if (response.ok) {
        onSuccess && onSuccess()
      } else {
        onError && onError()
      }
      return data
    } catch (error) {
      toast({
        description: "Error when deleting comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleDeleteComment }
}
export function useGetVideoEmbedCommentCountByVideoEmbedId(
  videoEmbedId: string,
) {
  const [data, setData] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetVideoEmbedCommentCountByVideoEmbedId = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/video-embed-comment/video-embed/${videoEmbedId}/count`,
        {
          method: "GET",
        },
      )
      const data = await response.json()
      if (typeof data === "number") {
        setData(data)
      }
      return data
    } catch (error) {
      toast({
        description: "Error when getting count, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    handleGetVideoEmbedCommentCountByVideoEmbedId()
  }

  React.useEffect(() => {
    handleGetVideoEmbedCommentCountByVideoEmbedId()
  }, [])

  return { data, isLoading, refetch }
}

export type VideoEmbedCommentProps = SelectVideoEmbedComment & {
  author: SelectUser
} & {
  replies?: (SelectVideoEmbedComment & { author: SelectUser })[]
}

export function useGetVideoEmbedCommentByVideoEmbedIdInfinite({
  videoEmbedId,
  limit,
}: {
  videoEmbedId: string
  limit: number
}) {
  const [comments, setComments] = React.useState<
    | {
        videoEmbedComments: VideoEmbedCommentProps[]
        cursor: string
        page: number
      }[]
    | []
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetVideoEmbedCommentsByVideoEmbedIdInfinite = async (
    nextCursor?: string | null,
  ) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")
      searchParams.set("videoEmbedId", videoEmbedId ?? "")

      const response = await fetch(
        `/api/video-embed-comment/video-embed/${videoEmbedId}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const data = (await response.json()) as {
        nextCursor: string
        videoEmbedComments: VideoEmbedCommentProps[]
      }
      if (data?.videoEmbedComments) {
        setComments([
          ...comments,
          {
            videoEmbedComments: data?.videoEmbedComments,
            cursor: data?.nextCursor,
            page: page + 1,
          },
        ])
        setPage(page + 1)
      }

      if (data?.nextCursor) {
        setLastCursor(data?.nextCursor)
      } else {
        setLastCursor(null)
        setHasNextPage(false)
      }
    } catch (error) {
      setHasNextPage(false)

      toast({
        description: "Error when getting comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleObserver = React.useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target?.isIntersecting && lastCursor !== undefined) {
        handleGetVideoEmbedCommentsByVideoEmbedIdInfinite(lastCursor)
      }
    },
    [],
  )

  React.useEffect(() => {
    const lmRef = loadMoreRef.current

    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (lmRef) {
        observer.unobserve(lmRef)
      }
    }
  }, [handleObserver])

  const fetchCommentsByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")
    searchParams.set("videoEmbedId", videoEmbedId ?? "")

    const response = await fetch(
      `/api/video-embed-comment/video-embed/${videoEmbedId}/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      videoEmbedComments: VideoEmbedCommentProps[]
    }
    return data
  }

  const handleGetVideoEmbedCommentsByVideoEmbedIdInfiniteRefetch = async (
    totalPages: number,
  ) => {
    setIsLoading(true)
    let cursor = ""
    const allComments = [...comments]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchCommentsByPage(limit, cursor)
        if (data?.videoEmbedComments) {
          if (page <= allComments.length) {
            // Update existing page
            allComments[page - 1] = {
              videoEmbedComments: data?.videoEmbedComments,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            // Add new page
            allComments.push({
              videoEmbedComments: data?.videoEmbedComments,
              cursor: data?.nextCursor,
              page: page,
            })
          }
          cursor = data?.nextCursor
        }
        if (!data?.nextCursor) {
          setHasNextPage(false)
          break
        }
      } catch (error) {
        setHasNextPage(false)
        toast({
          description: "Error when getting comment, try again",
          variant: "warning",
        })
      }
    }

    setComments(allComments)
    setPage(allComments.length)
    setLastCursor(allComments[allComments.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetVideoEmbedCommentsByVideoEmbedIdInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetVideoEmbedCommentsByVideoEmbedIdInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetVideoEmbedCommentsByVideoEmbedIdInfinite("")
  }, [])

  return {
    comments,
    isLoading,
    refetch,
    fetchNextPage,
    loadMoreRef,
    hasNextPage,
  }
}

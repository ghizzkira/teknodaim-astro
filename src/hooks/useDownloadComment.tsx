import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectDownloadComment } from "@/lib/db/schema/download-comment"
import type {
  CreateDownloadComment,
  UpdateDownloadComment,
} from "@/lib/validation/download-comment"
import type { SelectUser } from "@/lib/db/schema"

export function useCreateDownloadComment({
  onSuccess,
  onError,
}: {
  input?: CreateDownloadComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateComment = async ({
    downloadId,
    content,
    replyToId,
  }: {
    downloadId: string
    content: string
    replyToId?: string | null | undefined
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download-comment/create", {
        method: "POST",
        body: JSON.stringify({
          downloadId,
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

export function useUpdateDownloadComment({
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
    input?: UpdateDownloadComment & { authorId: string },
  ) => {
    setIsLoading(true)
    try {
      const url = byAdmin
        ? "/api/download-comment/update/by-admin"
        : "/api/download-comment/update"
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
export function useDeleteDownloadComment({
  onSuccess,
  onError,
  byAdmin,
}: {
  input?: CreateDownloadComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
  byAdmin?: boolean
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async (comment_id: string) => {
    setIsLoading(true)
    try {
      const url = byAdmin
        ? "/api/download-comment/delete/by-admin"
        : "/api/download-comment/delete"
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
export function useGetDownloadCommentCountByDownloadId(downloadId: string) {
  const [data, setData] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetDownloadCommentCountByDownloadId = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/download-comment/download/${downloadId}/count`,
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
    handleGetDownloadCommentCountByDownloadId()
  }

  React.useEffect(() => {
    handleGetDownloadCommentCountByDownloadId()
  }, [])

  return { data, isLoading, refetch }
}

type DownloadComment = SelectDownloadComment & { author: SelectUser } & {
  replies?: (SelectDownloadComment & { author: SelectUser })[]
}

export function useGetDownloadCommentByDownloadIdInfinite({
  downloadId,
  limit,
}: {
  downloadId: string
  limit: number
}) {
  const [comments, setComments] = React.useState<
    { downloadComments: DownloadComment[]; cursor: string; page: number }[] | []
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetDownloadCommentsByDownloadIdInfinite = async (
    nextCursor?: string | null,
  ) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")
      searchParams.set("downloadId", downloadId ?? "")

      const response = await fetch(
        `/api/download-comment/download/${downloadId}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const data = (await response.json()) as {
        nextCursor: string
        downloadComments: DownloadComment[]
      }
      if (data?.downloadComments) {
        setComments([
          ...comments,
          {
            downloadComments: data?.downloadComments,
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
        handleGetDownloadCommentsByDownloadIdInfinite(lastCursor)
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
    const response = await fetch(
      `/api/download-comment/download/${downloadId}/infinite`,
      {
        method: "POST",
        body: JSON.stringify({
          downloadId: downloadId,
          limit: limit,
          cursor: cursor,
        }),
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      downloadComments: DownloadComment[]
    }
    return data
  }

  const handleGetDownloadCommentsByDownloadIdInfiniteRefetch = async (
    totalPages: number,
  ) => {
    setIsLoading(true)
    let cursor = ""
    const allComments = [...comments]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchCommentsByPage(limit, cursor)
        if (data?.downloadComments) {
          if (page <= allComments.length) {
            // Update existing page
            allComments[page - 1] = {
              downloadComments: data?.downloadComments,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            // Add new page
            allComments.push({
              downloadComments: data?.downloadComments,
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
    handleGetDownloadCommentsByDownloadIdInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetDownloadCommentsByDownloadIdInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetDownloadCommentsByDownloadIdInfinite("")
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

import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectWpComment } from "@/lib/db/schema/wp-comment"
import type {
  CreateWpComment,
  UpdateWpComment,
} from "@/lib/validation/wp-comment"

export function useWpCreateComment({
  onSuccess,
  onError,
}: {
  input?: CreateWpComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
}) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateComment = async ({
    wpPostSlug,
    content,
    replyToId,
  }: {
    wpPostSlug: string
    content: string
    replyToId?: string | null | undefined
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/wp-comment/create", {
        method: "POST",
        body: JSON.stringify({
          wpPostSlug,
          content,
          replyToId,
        }),
      })
      const data = await response.json()
      if (data) {
        setData(data)
        onSuccess && onSuccess()
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

  return { data, isLoading, handleCreateComment }
}

export function useWpUpdateComment(
  input: UpdateWpComment & { authorId: string },
) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateComment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/wp-comment/create", {
        method: "POST",
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (data?.id) {
        setData(data)
      }
      return data
    } catch (error) {
      toast({
        description: "Error when updating comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, handleUpdateComment }
}
export function useWpDeleteComment({
  onSuccess,
  onError,
}: {
  input?: CreateWpComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
}) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async (comment_id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/wp-comment/delete", {
        method: "DELETE",
        body: JSON.stringify(comment_id),
      })
      const data = await response.json()
      if (data?.id) {
        setData(data)
      }
      if (data) {
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

  return { data, isLoading, handleDeleteComment }
}
export function useGetWpCommentCountByWpSlug(slug: string) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetWpCommentCountByWpSlug = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/wp-comment/wp-post-slug/${slug}/count`,
        {
          method: "GET",
        },
      )
      const data = await response.json()
      if (data) {
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
    handleGetWpCommentCountByWpSlug()
  }

  React.useEffect(() => {
    handleGetWpCommentCountByWpSlug()
  }, [])

  // Menambahkan refetch ke return value
  return { data, isLoading, refetch }
}

export function useGetWpCommentByWpSlug(slug: string) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetWpCommentsByWpSlug = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/wp-comment/wp-post-slug/${slug}`, {
        method: "GET",
      })
      const data = await response.json()
      if (data?.id) {
        setData(data)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    handleGetWpCommentsByWpSlug()
  }

  React.useEffect(() => {
    handleGetWpCommentsByWpSlug()
  }, [])

  return { data, isLoading, refetch }
}

export function useGetWpCommentByWpSlugInfinite({
  slug,
  limit,
  currentCursor = "",
}: {
  slug: string
  limit: number
  currentCursor?: string
}) {
  const [comments, setComments] = React.useState<
    { wpComments: SelectWpComment[]; cursor: string; page: number }[] | []
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetWpCommentsByWpSlugInfinite = async (
    nextCursor?: string | null,
    isRefetch: boolean = false,
  ) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit)
      searchParams.set("cursor", nextCursor ?? "")
      searchParams.set("wpPostSlug", slug ?? "")

      const response = await fetch(
        `/api/wp-comment/wp-post-slug/${slug}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const data = await response.json()
      if (data?.wpComments) {
        setComments([
          ...comments,
          {
            wpComments: data?.wpComments,
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
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target?.isIntersecting && lastCursor !== undefined) {
        handleGetWpCommentsByWpSlugInfinite(lastCursor)
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
      `/api/wp-comment/wp-post-slug/${slug}/infinite`,
      {
        method: "POST",
        body: JSON.stringify({
          wpPostSlug: slug,
          limit: limit,
          cursor: cursor,
        }),
      },
    )
    const data = await response.json()
    return data
  }

  const handleGetWpCommentsByWpSlugInfiniteRefetch = async (
    totalPages: number,
  ) => {
    setIsLoading(true)
    let cursor = ""
    let allComments = [...comments]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchCommentsByPage(limit, cursor)
        if (data?.wpComments) {
          if (page <= allComments.length) {
            // Update existing page
            allComments[page - 1] = {
              wpComments: data?.wpComments,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            // Add new page
            allComments.push({
              wpComments: data?.wpComments,
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
    handleGetWpCommentsByWpSlugInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetWpCommentsByWpSlugInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetWpCommentsByWpSlugInfinite("")
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

import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectUser } from "@/lib/db/schema"
import type { UpdateUser } from "@/lib/validation/user"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectUser } from "@/lib/db/schema"
import type { UpdateUser } from "@/lib/validation/user"

export function useUpdateComment({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateComment = async (input: UpdateUser) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/update", {
        method: "PUT",
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (data) {
        onSuccess && onSuccess()
      } else {
        onError && onError()
      }
      return data
    } catch (error) {
      onError && onError()
      toast({
        description: "Error when updating comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateComment }
}
export function useDeleteComment({
  onSuccess,
  onError,
}: {
  input?: UpdateUser
  onSuccess?: () => void
  onError?: () => void
}) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async (comment_id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/delete", {
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
export function useGetUserCountBySlug(slug: string) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetUserCountBySlug = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/user/wp-post-slug/${slug}/count`, {
        method: "GET",
      })
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
    handleGetUserCountBySlug()
  }

  React.useEffect(() => {
    handleGetUserCountBySlug()
  }, [])

  // Menambahkan refetch ke return value
  return { data, isLoading, refetch }
}

export function useGetUserBySlug(slug: string) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetUsersBySlug = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/user/wp-post-slug/${slug}`, {
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
    handleGetUsersBySlug()
  }

  React.useEffect(() => {
    handleGetUsersBySlug()
  }, [])

  return { data, isLoading, refetch }
}

export function useGetUserBySlugInfinite({
  slug,
  limit,
  currentCursor = "",
}: {
  slug: string
  limit: number
  currentCursor?: string
}) {
  const [comments, setComments] = React.useState<
    { wpComments: SelectUser[]; cursor: string; page: number }[] | []
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetUsersBySlugInfinite = async (
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
        `/api/user/wp-post-slug/${slug}/infinite?${searchParams.toString()}`,
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
        handleGetUsersBySlugInfinite(lastCursor)
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
    const response = await fetch(`/api/user/wp-post-slug/${slug}/infinite`, {
      method: "POST",
      body: JSON.stringify({
        wpPostSlug: slug,
        limit: limit,
        cursor: cursor,
      }),
    })
    const data = await response.json()
    return data
  }

  const handleGetUsersBySlugInfiniteRefetch = async (totalPages: number) => {
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
    handleGetUsersBySlugInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetUsersBySlugInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetUsersBySlugInfinite("")
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

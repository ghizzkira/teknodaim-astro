import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectArticleComment } from "@/lib/db/schema/article-comment"
import type {
  CreateArticleComment,
  UpdateArticleComment,
} from "@/lib/validation/article-comment"
import type { SelectUser } from "@/lib/db/schema"

export function useCreateArticleComment({
  onSuccess,
  onError,
}: {
  input?: CreateArticleComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateComment = async ({
    articleId,
    content,
    replyToId,
  }: {
    articleId: string
    content: string
    replyToId?: string | null | undefined
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/article-comment/create", {
        method: "POST",
        body: JSON.stringify({
          articleId,
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

export function useUpdateArticleComment({
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
    input: UpdateArticleComment & { authorId: string },
  ) => {
    setIsLoading(true)
    try {
      const url = byAdmin
        ? "/api/article-comment/update/by-admin"
        : "/api/article-comment/update"
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
export function useDeleteArticleComment({
  onSuccess,
  onError,
  byAdmin,
}: {
  input?: CreateArticleComment & { authorId: string }
  onSuccess?: () => void
  onError?: () => void
  byAdmin?: boolean
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async (comment_id: string) => {
    setIsLoading(true)
    try {
      const url = byAdmin
        ? "/api/article-comment/delete/by-admin"
        : "/api/article-comment/delete"
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
export function useGetArticleCommentCountByArticleId(articleId: string) {
  const [data, setData] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetArticleCommentCountByArticleId = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/article-comment/article/${articleId}/count`,
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
    handleGetArticleCommentCountByArticleId()
  }

  React.useEffect(() => {
    handleGetArticleCommentCountByArticleId()
  }, [])

  return { data, isLoading, refetch }
}

type ArticleComment = SelectArticleComment & { author: SelectUser } & {
  replies?: (SelectArticleComment & { author: SelectUser })[]
}

export function useGetArticleCommentByArticleIdInfinite({
  articleId,
  limit,
}: {
  articleId: string
  limit: number
}) {
  const [comments, setComments] = React.useState<
    { articleComments: ArticleComment[]; cursor: string; page: number }[] | []
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetArticleCommentsByArticleIdInfinite = async (
    nextCursor?: string | null,
  ) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")
      searchParams.set("articleId", articleId ?? "")

      const response = await fetch(
        `/api/article-comment/article/${articleId}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const data = (await response.json()) as {
        nextCursor: string
        articleComments: ArticleComment[]
      }
      if (data?.articleComments) {
        setComments([
          ...comments,
          {
            articleComments: data?.articleComments,
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
        handleGetArticleCommentsByArticleIdInfinite(lastCursor)
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
      `/api/article-comment/article/${articleId}/infinite`,
      {
        method: "POST",
        body: JSON.stringify({
          articleId: articleId,
          limit: limit,
          cursor: cursor,
        }),
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      articleComments: ArticleComment[]
    }
    return data
  }

  const handleGetArticleCommentsByArticleIdInfiniteRefetch = async (
    totalPages: number,
  ) => {
    setIsLoading(true)
    let cursor = ""
    const allComments = [...comments]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchCommentsByPage(limit, cursor)
        if (data?.articleComments) {
          if (page <= allComments.length) {
            // Update existing page
            allComments[page - 1] = {
              articleComments: data?.articleComments,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            // Add new page
            allComments.push({
              articleComments: data?.articleComments,
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
    handleGetArticleCommentsByArticleIdInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetArticleCommentsByArticleIdInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetArticleCommentsByArticleIdInfinite("")
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

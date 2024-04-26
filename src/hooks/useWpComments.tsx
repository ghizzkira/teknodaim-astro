import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateWpComment,
  UpdateWpComment,
} from "@/lib/validation/wp-comment"

export function useWpCreateComment(
  input: CreateWpComment & { authorId: string },
) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateComment = async () => {
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
    } catch (error) {
      console.error(error)
      toast({
        description: "Error when creating comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleCreateComment()
  }, [])

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
    } catch (error) {
      console.error(error)
      toast({
        description: "Error when updating comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleUpdateComment()
  }, [])

  return { data, isLoading, handleUpdateComment }
}
export function useWpDeleteComment(input: string) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/wp-comment/delete", {
        method: "DELETE",
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (data?.id) {
        setData(data)
      }
    } catch (error) {
      console.error(error)
      toast({
        description: "Error when deleting comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleDeleteComment()
  }, [])

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
      if (data?.id) {
        setData(data)
      }
    } catch (error) {
      console.error(error)
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
      console.error(error)
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

  // Menambahkan refetch ke return value
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
  const [comments, setComments] = React.useState([
    { page: 0, cursor: "", data: null },
  ])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)

  const handleGetWpCommentsByWpSlugInfinite = async (
    nextCursor?: string | null,
  ) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/wp-comment/wp-post-slug/${slug}/infinite`,
        {
          method: "GET",
          body: JSON.stringify({
            wpPostSlug: slug,
            limit: limit,
            cursor: nextCursor,
          }),
        },
      )
      const data = await response.json()
      if (data?.wpComments) {
        setComments([
          ...comments,
          {
            data: data?.wpComments,
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
      }
    } catch (error) {
      console.error(error)
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

  const refetch = () => {
    handleGetWpCommentsByWpSlugInfinite(lastCursor)
  }
  const fetchNextPage = () => {
    handleGetWpCommentsByWpSlugInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetWpCommentsByWpSlugInfinite("")
  }, [])

  return { comments, isLoading, refetch, fetchNextPage, loadMoreRef }
}

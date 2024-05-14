import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { UploadMedia, UpdateMedia } from "@/lib/validation/media"
import type { SelectMedia } from "@/lib/db/schema"

export function useUploadMedia({
  onSuccess,
  onError,
}: {
  input?: UploadMedia
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUploadMedia = async (input?: UploadMedia) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/media/create", {
        method: "POST",
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (data) {
        onSuccess && onSuccess()
      }
      return data
    } catch (error) {
      onError && onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUploadMedia }
}

export function useUpdateMedia({
  onSuccess,
  onError,
}: {
  input?: UpdateMedia
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateMedia = async (input?: UpdateMedia) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/media/update", {
        method: "PUT",
        body: JSON.stringify(input),
      })
      const data = await response.json()
      if (data) {
        onSuccess && onSuccess()
      }
      return data
    } catch (error) {
      onError && onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateMedia }
}
export function useDeleteMedia({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteMedia = async (mediaName: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/media/delete/by-name", {
        method: "DELETE",
        body: JSON.stringify(mediaName),
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
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleDeleteMedia }
}

export function useGetMediasSearch(query?: string) {
  const [data, setData] = React.useState<SelectMedia[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetMediasInfinite = async () => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("query", query ?? "")

      const response = await fetch(
        `/api/media/search?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as SelectMedia[]
      return results
    } catch (error) {
      toast({
        description: "Error when getting medias, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    const livesearch = async () => {
      if (query) {
        const results = await handleGetMediasInfinite()
        if (Array.isArray(results)) {
          setData([...results])
        }
      }
    }
    livesearch()
  }, [query])
  return { data, isLoading, refetch: handleGetMediasInfinite }
}
export function useGetMediasInfinite({ limit }: { limit: number }) {
  const [data, setData] = React.useState<
    { medias: SelectMedia[]; cursor: string; page: number }[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetMediasInfinite = async (nextCursor?: string | null) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")

      const response = await fetch(
        `/api/media/dashboard/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as {
        nextCursor: string
        medias: SelectMedia[]
      }
      if (Array.isArray(results?.medias)) {
        setData([
          ...data,
          {
            medias: results?.medias,
            cursor: results?.nextCursor,
            page: page + 1,
          },
        ])
        setPage(page + 1)
      }

      if (results?.nextCursor) {
        setLastCursor(results?.nextCursor)
      } else {
        setLastCursor(null)
        setHasNextPage(false)
      }
    } catch (error) {
      toast({
        description: "Error when getting medias, try again",
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
        handleGetMediasInfinite(lastCursor)
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

  const fetchMediasByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")

    const response = await fetch(
      `/api/media/dashboard/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      medias: SelectMedia[]
    }
    return data
  }

  const handleGetMediasInfiniteRefetch = async (totalPages: number) => {
    setIsLoading(true)
    let cursor = ""
    const allMedias = [...data]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchMediasByPage(limit, cursor)
        if (data?.medias) {
          if (page <= allMedias.length) {
            allMedias[page - 1] = {
              medias: data?.medias,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            allMedias.push({
              medias: data?.medias,
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
          description: "Error when getting medias, try again",
          variant: "warning",
        })
      }
    }

    setData(allMedias)
    setPage(allMedias.length)
    setLastCursor(allMedias[allMedias.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetMediasInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetMediasInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetMediasInfinite("")
  }, [])

  return {
    data,
    isLoading,
    refetch,
    fetchNextPage,
    loadMoreRef,
    hasNextPage,
  }
}

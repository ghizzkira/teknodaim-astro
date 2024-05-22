import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateVideoEmbed,
  UpdateVideoEmbed,
} from "@/lib/validation/video-embed"
import type { SelectUser, SelectVideoEmbed, SelectMedia } from "@/lib/db/schema"

export function useCreateVideoEmbed({
  onSuccess,
  onError,
}: {
  input?: CreateVideoEmbed
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateVideoEmbed = async (input?: CreateVideoEmbed) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/video-embed/create", {
        method: "POST",
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
      toast({
        description: "Error when creating video embed, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateVideoEmbed }
}

export function useUpdateVideoEmbed({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateVideoEmbed = async (input?: UpdateVideoEmbed) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/video-embed/update", {
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

  return { isLoading, handleUpdateVideoEmbed }
}
export function useDeleteVideoEmbed({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteVideoEmbed = async (gadgetId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/video-embed/delete", {
        method: "DELETE",
        body: JSON.stringify(gadgetId),
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

  return { isLoading, handleDeleteVideoEmbed }
}

type VideoEmbedDataProps = SelectVideoEmbed & {
  authors?: Pick<SelectUser, "image" | "username" | "name">[]
  featuredImage?: Pick<SelectMedia, "id" | "url">
}

export function useGetVideoEmbedsByAuthor({
  limit,
  authorId,
}: {
  limit: number
  authorId: string
}) {
  const [data, setData] = React.useState<
    { videoEmbeds: VideoEmbedDataProps[]; cursor: string; page: number }[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetVideoEmbedsInfinite = async (nextCursor?: string | null) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")

      const response = await fetch(
        `/api/video-embed/author/${authorId}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as {
        nextCursor: string
        videoEmbeds: VideoEmbedDataProps[]
      }
      if (Array.isArray(results?.videoEmbeds)) {
        setData([
          ...data,
          {
            videoEmbeds: results?.videoEmbeds,
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
        description: "Error when getting videoEmbeds, try again",
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
        handleGetVideoEmbedsInfinite(lastCursor)
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

  const fetchVideoEmbedsByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")

    const response = await fetch(
      `/api/video-embed/author/${authorId}/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      videoEmbeds: VideoEmbedDataProps[]
    }
    return data
  }

  const handleGetVideoEmbedsInfiniteRefetch = async (totalPages: number) => {
    setIsLoading(true)
    let cursor = ""
    const allVideoEmbeds = [...data]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchVideoEmbedsByPage(limit, cursor)
        if (data?.videoEmbeds) {
          if (page <= allVideoEmbeds.length) {
            allVideoEmbeds[page - 1] = {
              videoEmbeds: data?.videoEmbeds,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            allVideoEmbeds.push({
              videoEmbeds: data?.videoEmbeds,
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
          description: "Error when getting videoEmbeds, try again",
          variant: "warning",
        })
      }
    }

    setData(allVideoEmbeds)
    setPage(allVideoEmbeds.length)
    setLastCursor(allVideoEmbeds[allVideoEmbeds.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetVideoEmbedsInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetVideoEmbedsInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetVideoEmbedsInfinite("")
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

export function useGetVideoEmbedsByTopic({
  limit,
  topicId,
}: {
  limit: number
  topicId: string
}) {
  const [data, setData] = React.useState<
    { videoEmbeds: VideoEmbedDataProps[]; cursor: string; page: number }[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetVideoEmbedsInfinite = async (nextCursor?: string | null) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")

      const response = await fetch(
        `/api/video-embed/topic/${topicId}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as {
        nextCursor: string
        videoEmbeds: VideoEmbedDataProps[]
      }
      if (Array.isArray(results?.videoEmbeds)) {
        setData([
          ...data,
          {
            videoEmbeds: results?.videoEmbeds,
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
        description: "Error when getting videoEmbeds, try again",
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
        handleGetVideoEmbedsInfinite(lastCursor)
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

  const fetchVideoEmbedsByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")

    const response = await fetch(
      `/api/video-embed/topic/${topicId}/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      videoEmbeds: VideoEmbedDataProps[]
    }
    return data
  }

  const handleGetVideoEmbedsInfiniteRefetch = async (totalPages: number) => {
    setIsLoading(true)
    let cursor = ""
    const allVideoEmbeds = [...data]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchVideoEmbedsByPage(limit, cursor)
        if (data?.videoEmbeds) {
          if (page <= allVideoEmbeds.length) {
            allVideoEmbeds[page - 1] = {
              videoEmbeds: data?.videoEmbeds,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            allVideoEmbeds.push({
              videoEmbeds: data?.videoEmbeds,
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
          description: "Error when getting videoEmbeds, try again",
          variant: "warning",
        })
      }
    }

    setData(allVideoEmbeds)
    setPage(allVideoEmbeds.length)
    setLastCursor(allVideoEmbeds[allVideoEmbeds.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetVideoEmbedsInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetVideoEmbedsInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetVideoEmbedsInfinite("")
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

export function useGetVideoEmbedsByType({
  limit,
  type,
}: {
  limit: number
  type: string
}) {
  const [data, setData] = React.useState<
    { videoEmbeds: VideoEmbedDataProps[]; cursor: string; page: number }[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetVideoEmbedsInfinite = async (nextCursor?: string | null) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")

      const response = await fetch(
        `/api/video-embed/type/${type}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as {
        nextCursor: string
        videoEmbeds: VideoEmbedDataProps[]
      }
      if (Array.isArray(results?.videoEmbeds)) {
        setData([
          ...data,
          {
            videoEmbeds: results?.videoEmbeds,
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
        description: "Error when getting videoEmbeds, try again",
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
        handleGetVideoEmbedsInfinite(lastCursor)
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

  const fetchVideoEmbedsByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")

    const response = await fetch(
      `/api/video-embed/type/${type}/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      videoEmbeds: VideoEmbedDataProps[]
    }
    return data
  }

  const handleGetVideoEmbedsInfiniteRefetch = async (totalPages: number) => {
    setIsLoading(true)
    let cursor = ""
    const allVideoEmbeds = [...data]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchVideoEmbedsByPage(limit, cursor)
        if (data?.videoEmbeds) {
          if (page <= allVideoEmbeds.length) {
            allVideoEmbeds[page - 1] = {
              videoEmbeds: data?.videoEmbeds,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            allVideoEmbeds.push({
              videoEmbeds: data?.videoEmbeds,
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
          description: "Error when getting videoEmbeds, try again",
          variant: "warning",
        })
      }
    }

    setData(allVideoEmbeds)
    setPage(allVideoEmbeds.length)
    setLastCursor(allVideoEmbeds[allVideoEmbeds.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetVideoEmbedsInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetVideoEmbedsInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetVideoEmbedsInfinite("")
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

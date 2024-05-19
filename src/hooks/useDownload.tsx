import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateDownload,
  UpdateDownload,
  TranslateDownload,
} from "@/lib/validation/download"
import type { SelectDownload } from "@/lib/db/schema"
import type { LanguageType } from "@/lib/validation/language"

export function useCreateDownload({
  onSuccess,
  onError,
}: {
  input?: CreateDownload
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateDownload = async (input?: CreateDownload) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download/create", {
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
        description: "Error when creating download, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateDownload }
}

export function useTranslateDownload({
  onSuccess,
  onError,
}: {
  input?: TranslateDownload
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleTranslateDownload = async (input?: TranslateDownload) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download/create", {
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
        description: "Error when creating download, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleTranslateDownload }
}

export function useUpdateDownload({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateDownload = async (input?: UpdateDownload) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download/update", {
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
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateDownload }
}
export function useDeleteDownload({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteDownload = async (downloadId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download/delete", {
        method: "DELETE",
        body: JSON.stringify(downloadId),
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

  return { isLoading, handleDeleteDownload }
}

export function useGetDownloadsSearch({
  query,
  locale,
}: {
  query?: string
  locale: LanguageType
}) {
  const [data, setData] = React.useState<SelectDownload[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetDownloadsInfinite = async () => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("query", query ?? "")

      const response = await fetch(
        `/api/download/search/language/${locale}?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as SelectDownload[]
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
        const results = await handleGetDownloadsInfinite()
        if (Array.isArray(results)) {
          setData([...results])
        }
      }
    }
    livesearch()
  }, [query])
  return { data, isLoading, refetch: handleGetDownloadsInfinite }
}

export function useGetDownloadsByLanguageInfinite({
  limit,
  language,
}: {
  limit: number
  language: LanguageType
}) {
  const [data, setData] = React.useState<
    { downloads: SelectDownload[]; cursor: string; page: number }[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetDownloadsInfinite = async (nextCursor?: string | null) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")

      const response = await fetch(
        `/api/download/language/${language}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as {
        nextCursor: string
        downloads: SelectDownload[]
      }
      if (Array.isArray(results?.downloads)) {
        setData([
          ...data,
          {
            downloads: results?.downloads,
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
        description: "Error when getting downloads, try again",
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
        handleGetDownloadsInfinite(lastCursor)
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

  const fetchDownloadsByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")

    const response = await fetch(
      `/api/download/language/${language}/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      downloads: SelectDownload[]
    }
    return data
  }

  const handleGetDownloadsInfiniteRefetch = async (totalPages: number) => {
    setIsLoading(true)
    let cursor = ""
    const allDownloads = [...data]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchDownloadsByPage(limit, cursor)
        if (data?.downloads) {
          if (page <= allDownloads.length) {
            allDownloads[page - 1] = {
              downloads: data?.downloads,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            allDownloads.push({
              downloads: data?.downloads,
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
          description: "Error when getting downloads, try again",
          variant: "warning",
        })
      }
    }

    setData(allDownloads)
    setPage(allDownloads.length)
    setLastCursor(allDownloads[allDownloads.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetDownloadsInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetDownloadsInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetDownloadsInfinite("")
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

export function useGetDownloadsByLanguageByTopicInfinite({
  limit,
  language,
  topicId,
}: {
  limit: number
  language: LanguageType
  topicId: string
}) {
  const [data, setData] = React.useState<
    { downloads: SelectDownload[]; cursor: string; page: number }[]
  >([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [lastCursor, setLastCursor] = React.useState<null | string | undefined>(
    "",
  )
  const [page, setPage] = React.useState(0)
  const loadMoreRef = React.useRef<HTMLDivElement>(null)
  const [hasNextPage, setHasNextPage] = React.useState(true)

  const handleGetDownloadsInfinite = async (nextCursor?: string | null) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("limit", limit.toString())
      searchParams.set("cursor", nextCursor ?? "")

      const response = await fetch(
        `/api/download/language/${language}/topic/${topicId}/infinite?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as {
        nextCursor: string
        downloads: SelectDownload[]
      }
      if (Array.isArray(results?.downloads)) {
        setData([
          ...data,
          {
            downloads: results?.downloads,
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
      setLastCursor(null)
      setHasNextPage(false)
      toast({
        description: "Error when getting downloads, try again",
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
        handleGetDownloadsInfinite(lastCursor)
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

  const fetchDownloadsByPage = async (limit: number, cursor = "") => {
    const searchParams = new URLSearchParams()
    searchParams.set("limit", limit.toString())
    searchParams.set("cursor", cursor ?? "")

    const response = await fetch(
      `/api/download/language/${language}/topic/${topicId}/infinite?${searchParams.toString()}`,
      {
        method: "GET",
      },
    )
    const data = (await response.json()) as {
      nextCursor: string
      downloads: SelectDownload[]
    }
    return data
  }

  const handleGetDownloadsInfiniteRefetch = async (totalPages: number) => {
    setIsLoading(true)
    let cursor = ""
    const allDownloads = [...data]

    for (let page = 1; page <= totalPages; page++) {
      try {
        const data = await fetchDownloadsByPage(limit, cursor)
        if (data?.downloads) {
          if (page <= allDownloads.length) {
            allDownloads[page - 1] = {
              downloads: data?.downloads,
              cursor: data?.nextCursor,
              page: page,
            }
          } else {
            allDownloads.push({
              downloads: data?.downloads,
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
          description: "Error when getting downloads, try again",
          variant: "warning",
        })
      }
    }

    setData(allDownloads)
    setPage(allDownloads.length)
    setLastCursor(allDownloads[allDownloads.length - 1]?.cursor)
    setIsLoading(false)
  }

  const refetch = () => {
    handleGetDownloadsInfiniteRefetch(page + 1)
  }

  const fetchNextPage = () => {
    handleGetDownloadsInfinite(lastCursor)
  }

  React.useEffect(() => {
    handleGetDownloadsInfinite("")
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

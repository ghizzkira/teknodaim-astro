import * as React from "react"

import type {
  CreateTopic,
  UpdateTopic,
  TranslateTopic,
  TopicType,
} from "@/lib/validation/topic"
import type { SelectTopic } from "@/lib/db/schema"
import type { LanguageType } from "@/lib/validation/language"

export function useCreateTopic({
  onSuccess,
  onError,
}: {
  input?: CreateTopic
  onSuccess?: (_data: SelectTopic) => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateTopic = async (input?: CreateTopic) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/topic/create", {
        method: "POST",
        body: JSON.stringify(input),
      })
      const data = (await response.json()) as SelectTopic
      if (data) {
        onSuccess && onSuccess(data)
      }
      return data
    } catch (error) {
      onError && onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateTopic }
}

export function useTranslateTopic({
  onSuccess,
  onError,
}: {
  input?: TranslateTopic
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleTranslateTopic = async (input?: TranslateTopic) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/topic/create", {
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

  return { isLoading, handleTranslateTopic }
}

export function useUpdateTopic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateTopic = async (input?: UpdateTopic) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/topic/update", {
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

  return { isLoading, handleUpdateTopic }
}
export function useDeleteTopic({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteTopic = async (topicId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/topic/delete", {
        method: "DELETE",
        body: JSON.stringify(topicId),
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

  return { isLoading, handleDeleteTopic }
}

export function useSearchTopicsByType({
  query,
  language,
  type,
}: {
  query?: string
  language: LanguageType
  type: TopicType
}) {
  const [data, setData] = React.useState<SelectTopic[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetTopics = async (query: string) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("query", query ?? "")

      const response = await fetch(
        `/api/topic/search/language/${language}/type/${type}/${encodeURI(query!)}?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as SelectTopic[]
      setIsLoading(false)
      return results
    } catch (error) {
      setData([])
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    const livesearch = async () => {
      if (query) {
        const results = await handleGetTopics(query)
        if (Array.isArray(results)) {
          setTimeout(() => {
            setData([...results])
          }, 500)
        } else {
          setTimeout(() => {
            setData([])
          }, 500)
        }
      }
    }
    livesearch()
  }, [query])
  return { data, isLoading, refetch: handleGetTopics }
}

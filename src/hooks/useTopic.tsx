import * as React from "react"

import type {
  CreateTopic,
  UpdateTopic,
  TranslateTopic,
} from "@/lib/validation/topic"

export function useCreateTopic({
  onSuccess,
  onError,
}: {
  input?: CreateTopic
  onSuccess?: () => void
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

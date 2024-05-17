import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateVideoEmbed,
  UpdateVideoEmbed,
} from "@/lib/validation/video-embed"

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

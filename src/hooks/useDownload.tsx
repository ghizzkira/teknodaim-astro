import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateDownload,
  UpdateDownload,
  TranslateDownload,
} from "@/lib/validation/download"

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

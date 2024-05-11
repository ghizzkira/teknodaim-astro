import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateDownloadFile,
  UpdateDownloadFile,
} from "@/lib/validation/download-file"

export function useCreateDownloadFile({
  onSuccess,
  onError,
}: {
  input?: CreateDownloadFile
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateDownloadFile = async (input?: CreateDownloadFile) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download-file/create", {
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
      toast({
        description: "Error when creating download file, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateDownloadFile }
}

export function useUpdateDownloadFile({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateDownloadFile = async (input?: UpdateDownloadFile) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download-file/update", {
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

  return { isLoading, handleUpdateDownloadFile }
}
export function useDeleteDownloadFile({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteDownloadFile = async (adId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download-file/delete", {
        method: "DELETE",
        body: JSON.stringify(adId),
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

  return { isLoading, handleDeleteDownloadFile }
}

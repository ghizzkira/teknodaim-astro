import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { CreateAd, UpdateAd } from "@/lib/validation/ad"

export function useCreateAd({
  onSuccess,
  onError,
}: {
  input?: CreateAd
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateAd = async (input?: CreateAd) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ad/create", {
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
        description: "Error when creating ad, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateAd }
}

export function useUpdateAd({
  onSuccess,
  onError,
}: {
  input?: UpdateAd
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateAd = async (input?: UpdateAd) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ad/update", {
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
      toast({
        description: "Error when updating ad, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateAd }
}
export function useDeleteAd({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteAd = async (adId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/ad/delete", {
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

  return { isLoading, handleDeleteAd }
}

import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { CreateGadget, UpdateGadget } from "@/lib/validation/gadget"

export function useCreateGadget({
  onSuccess,
  onError,
}: {
  input?: CreateGadget
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateGadget = async (input?: CreateGadget) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/gadget/create", {
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
        description: "Error when creating gadget, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateGadget }
}

export function useUpdateGadget({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateGadget = async (input?: UpdateGadget) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/gadget/update", {
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

  return { isLoading, handleUpdateGadget }
}
export function useDeleteGadget({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteGadget = async (adId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/gadget/delete", {
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

  return { isLoading, handleDeleteGadget }
}

import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { CreateMenu, UpdateMenu } from "@/lib/validation/menu"
import type { SelectMenu } from "@/lib/db/schema"

export function useCreateMenu({
  onSuccess,
  onError,
}: {
  input?: CreateMenu
  onSuccess?: (_data: SelectMenu) => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateMenu = async (input?: CreateMenu) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/menu/create", {
        method: "POST",
        body: JSON.stringify(input),
      })
      const data = (await response.json()) as SelectMenu
      if (response.ok) {
        onSuccess && onSuccess(data)
      } else {
        onError && onError()
      }
      return data
    } catch (error) {
      onError && onError()
      toast({
        description: "Error when creating menu, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateMenu }
}

export function useUpdateMenu({
  onSuccess,
  onError,
}: {
  onSuccess?: (_data: SelectMenu) => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateMenu = async (input?: UpdateMenu) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/menu/update", {
        method: "PUT",
        body: JSON.stringify(input),
      })
      const data = (await response.json()) as SelectMenu
      if (response.ok) {
        onSuccess && onSuccess(data)
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

  return { isLoading, handleUpdateMenu }
}
export function useDeleteMenu({
  onSuccess,
  onError,
}: {
  onSuccess?: (_data: SelectMenu) => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteMenu = async (menuId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/menu/delete", {
        method: "DELETE",
        body: JSON.stringify(menuId),
      })
      const data = (await response.json()) as SelectMenu

      if (response.ok) {
        onSuccess && onSuccess(data)
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

  return { isLoading, handleDeleteMenu }
}

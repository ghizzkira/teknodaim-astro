import * as React from "react"

import type { CreateUserLink, UpdateUserLink } from "@/lib/validation/user-link"

export function useCreateUserExpertise({
  onSuccess,
  onError,
}: {
  input?: CreateUserLink
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateUserExpertise = async (input?: CreateUserLink) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/link/create", {
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

  return { isLoading, handleCreateUserExpertise }
}

export function useUpdateUserExpertise({
  onSuccess,
  onError,
}: {
  input?: UpdateUserLink
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateUserExpertise = async (input?: UpdateUserLink) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/link/update", {
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

  return { isLoading, handleUpdateUserExpertise }
}
export function useDeleteUserExpertise({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteUserExpertise = async (adId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/link/delete", {
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

  return { isLoading, handleDeleteUserExpertise }
}

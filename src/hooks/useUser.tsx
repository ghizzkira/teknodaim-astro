import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { UpdateUser } from "@/lib/validation/user"
import type { SelectUser } from "@/lib/db/schema"

export function useUpdateUser({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateUser = async (
    input: UpdateUser,
    currentUserRole: UserRole,
  ) => {
    setIsLoading(true)
    const path =
      currentUserRole !== "admin"
        ? "/api/user/update"
        : "/api/user/update/by-admin"
    try {
      const response = await fetch(path, {
        method: "PUT",
        body: JSON.stringify(input),
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
      toast({
        description: "Error when updating user, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateUser }
}
export function useDeleteUser({
  onSuccess,
  onError,
}: {
  input?: UpdateUser
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
        body: JSON.stringify(userId),
      })
      const data = await response.json()

      if (data) {
        onSuccess && onSuccess()
      } else {
        onError && onError()
      }

      return data
    } catch (error) {
      toast({
        description: "Error when deleting user, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleDeleteUser }
}
export function useGetUserCountBySlug(slug: string) {
  const [data, setData] = React.useState<number | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetUserCountBySlug = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/user/wp-post-slug/${slug}/count`, {
        method: "GET",
      })
      const data = await response.json()
      if (typeof data === "number") {
        setData(data)
      }
      return data
    } catch (error) {
      toast({
        description: "Error when getting count, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = () => {
    handleGetUserCountBySlug()
  }

  React.useEffect(() => {
    handleGetUserCountBySlug()
  }, [])

  return { data, isLoading, refetch }
}

export function useGetUsersSearch(query?: string) {
  const [data, setData] = React.useState<SelectUser[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetUsers = async () => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("query", query ?? "")

      const response = await fetch(
        `/api/user/search?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as SelectUser[]
      return results
    } catch (error) {
      toast({
        description: "Error when getting userrs, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    const livesearch = async () => {
      if (query) {
        const results = await handleGetUsers()
        if (Array.isArray(results)) {
          setData([...results])
        }
      }
    }
    livesearch()
  }, [query, data])
  return { data, isLoading, refetch: handleGetUsers }
}

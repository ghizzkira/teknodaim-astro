import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { UpdateUser } from "@/lib/validation/user"

export function useUpdateUser({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateComment = async (input: UpdateUser) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/update", {
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
        description: "Error when updating comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateComment }
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

  const handleDeleteComment = async (comment_id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/delete", {
        method: "DELETE",
        body: JSON.stringify(comment_id),
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
        description: "Error when deleting comment, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleDeleteComment }
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

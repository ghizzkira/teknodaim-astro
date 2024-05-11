import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateArticle,
  UpdateArticle,
  TranslateArticle,
} from "@/lib/validation/article"

export function useCreateArticle({
  onSuccess,
  onError,
}: {
  input?: CreateArticle
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateArticle = async (input?: CreateArticle) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/article/create", {
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
        description: "Error when creating article, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleCreateArticle }
}

export function useTranslateArticle({
  onSuccess,
  onError,
}: {
  input?: TranslateArticle
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleTranslateArticle = async (input?: TranslateArticle) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/article/create", {
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
        description: "Error when creating article, try again",
        variant: "warning",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleTranslateArticle }
}

export function useUpdateArticle({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateArticle = async (input?: UpdateArticle) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/article/update", {
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

  return { isLoading, handleUpdateArticle }
}
export function useDeleteArticle({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteArticle = async (adId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/article/delete", {
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

  return { isLoading, handleDeleteArticle }
}

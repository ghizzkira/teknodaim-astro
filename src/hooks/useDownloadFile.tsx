import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type {
  CreateDownloadFile,
  UpdateDownloadFile,
} from "@/lib/validation/download-file"
import type { SelectDownloadFile } from "@/lib/db/schema"

export function useCreateDownloadFile({
  onSuccess,
  onError,
}: {
  input?: CreateDownloadFile
  onSuccess?: (_data: SelectDownloadFile) => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleCreateDownloadFile = async (input?: CreateDownloadFile) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download/file/create", {
        method: "POST",
        body: JSON.stringify(input),
      })
      const data = (await response.json()) as SelectDownloadFile[]
      if (response.ok) {
        onSuccess && onSuccess(data?.[0])
      } else {
        onError && onError()
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

  const handleDeleteDownloadFile = async (downloadFileId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/download-file/delete", {
        method: "DELETE",
        body: JSON.stringify(downloadFileId),
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

export function useSearchDownloadFiles(query?: string) {
  const [data, setData] = React.useState<SelectDownloadFile[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetDownloadFiles = async (query: string) => {
    setIsLoading(true)
    try {
      const searchParams = new URLSearchParams()
      searchParams.set("query", query ?? "")

      const response = await fetch(
        `/api/download/file/search?${searchParams.toString()}`,
        {
          method: "GET",
        },
      )
      const results = (await response.json()) as SelectDownloadFile[]
      setIsLoading(false)
      console.log(results)
      return results
    } catch (error) {
      setData([])
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    const livesearch = async () => {
      if (query) {
        const results = await handleGetDownloadFiles(query)
        if (Array.isArray(results)) {
          setTimeout(() => {
            setData([...results])
          }, 500)
        } else {
          setTimeout(() => {
            setData([])
          }, 500)
        }
      }
    }
    livesearch()
  }, [query])
  return { data, isLoading, refetch: handleGetDownloadFiles }
}

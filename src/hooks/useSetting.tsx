import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectSetting } from "@/lib/db/schema"
import type { UpsertSetting } from "@/lib/validation/setting"

export function useUpdateSetting({
  onSuccess,
  onError,
}: {
  onSuccess?: (_data: SelectSetting) => void
  onError?: () => void
}) {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleUpdateSetting = async (input: UpsertSetting) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/setting/upsert", {
        method: "POST",
        body: JSON.stringify(input),
      })
      const data = (await response.json()) as SelectSetting

      if (data) {
        onSuccess && onSuccess(data)
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

  return { isLoading, handleUpdateSetting }
}

export function useGetSettingByKey(key: string) {
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetSettingByKey = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/setting/key/${key}`, {
        method: "GET",
      })
      const data = await response.json()
      if (data) {
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
    handleGetSettingByKey()
  }

  React.useEffect(() => {
    handleGetSettingByKey()
  }, [])

  return { data, isLoading, refetch }
}

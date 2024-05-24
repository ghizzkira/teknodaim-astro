import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectSetting } from "@/lib/db/schema"
import type { UpsertSetting } from "@/lib/validation/setting"

export function useUpdateSetting({
  onSuccess,
  onError,
}: {
  onSuccess?: (_data: SelectSetting) => void
  onError: () => void
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
      if (response.ok) {
        onSuccess && onSuccess(data)
      } else {
        onError && onError()
        return null
      }
      return data
    } catch (error) {
      onError && onError()
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, handleUpdateSetting }
}

export function useGetSettingByKey(key: string) {
  const [data, setData] = React.useState<SelectSetting | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleGetSettingByKey = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/setting/key/${key}`, {
        method: "GET",
      })
      const data = (await response.json()) as SelectSetting

      if (response.ok) {
        setData(data)
      } else {
        toast({
          description: "Error when getting datas, try again",
          variant: "warning",
        })
      }
      return data
    } catch (error) {
      toast({
        description: "Error when getting datas, try again",
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

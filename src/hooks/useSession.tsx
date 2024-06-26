import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"
import type { SelectUser } from "@/lib/db/schema"

export function useSession() {
  const [session, setSession] = React.useState<{ user: SelectUser } | null>(
    null,
  )
  const [isLoading, setIsLoading] = React.useState(false)
  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/session", { method: "GET" })
      const data = (await response.json()) as { user: SelectUser }
      if (data?.user?.id) {
        setSession(data)
      }
      return data
    } catch (error) {
      toast({ description: "Invalid session, try again", variant: "warning" })
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleLogin()
  }, [])

  return { session, isLoading, handleLogin }
}

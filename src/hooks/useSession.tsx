import * as React from "react"

import { toast } from "@/components/UI/Toast/useToast"

export function useSession() {
  const [session, setSession] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/session", { method: "GET" })
      const data = await response.json()
      if (data?.id) {
        setSession(data)
      }
      return data
    } catch (error) {
      console.error(error)
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

import * as React from "react"

export function useSession() {
  const [session, setSession] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/session", { method: "GET" })
      setSession(response)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    handleSignOut()
  }, [])

  return { session, isLoading }
}

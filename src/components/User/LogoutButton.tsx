import { useState } from "react"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"

const SignOutButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      if (!response.ok) {
        throw new Error("Sign out failed")
      }
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      aria-label="Sign Out"
      variant="ghost"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      <Icon.Logout aria-label="Sign Out" className="mr-2" />
      Sign Out
    </Button>
  )
}

export default SignOutButton

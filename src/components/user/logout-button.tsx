"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

// import { logout } from "@/lib/auth/utils"

const LogoutButton: React.FunctionComponent = () => {
  return (
    <form action={"logout"}>
      <Button aria-label="Sign Out" variant="ghost">
        <Icon.SignOut aria-label="Sign Out" className="mr-2" />
        Sign Out
      </Button>
    </form>
  )
}

export default LogoutButton

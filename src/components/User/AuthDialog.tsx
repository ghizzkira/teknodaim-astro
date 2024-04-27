import * as React from "react"

import { Button } from "@/components/UI/Button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog"
import { Icon } from "@/components/UI/Icon"

const AuthModal: React.FunctionComponent = () => {
  return (
    <>
      <Dialog id={"auth-Dialog"}>
        <DialogTrigger
          role="button"
          variant="ghost"
          className="overflow-hidden max-md:rounded-full max-md:p-2 max-md:hover:bg-muted/20 md:rounded-md"
        >
          <div role="button" aria-label="Profile" className="flex lg:hidden">
            <Icon.User aria-label="Profile" className="h-[19px] w-[19px]" />
          </div>
          <div
            role="button"
            aria-label="Login"
            className="hidden items-center bg-main px-3 py-2 font-bold text-white lg:flex"
          >
            <Icon.Lock aria-label="Login" className="mr-2 h-4 w-4" />
            <span>Login</span>
          </div>
        </DialogTrigger>
        <DialogContent
          className="bottom-[unset] top-[50vh] gap-0 text-center"
          onClose={() => handleCloseDialog("auth-Dialog")}
        >
          <DialogTitle className="text-[24px] font-bold">Login</DialogTitle>
          <div className="pointer-events-auto relative mt-4 w-full text-center">
            <div className="overflow-auto">
              <p>Welcome, Use your Google account to login.</p>
              <div className="mt-4 flex items-center justify-center">
                <Button asChild variant="outline">
                  <a href="/auth/login/google">
                    <Icon.GoogleColored className="mr-2" />
                    Login with Google
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AuthModal

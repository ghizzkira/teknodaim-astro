import * as React from "react"
import type { User } from "lucia"

import Image from "@/components/Image"
import { Icon } from "@/components/UI/Icon"
// import { useSession } from "@/lib/auth/client"
import { cn } from "@/lib/utils/style"
import { buttonVariants } from "../UI/Button"
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover"
import AuthModal from "./AuthDialog"
import LogoutButton from "./LogoutButton"

interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User | null
}

const UserMenu: React.FunctionComponent<UserMenuProps> = (props) => {
  const { user } = props
  return (
    <>
      {user ? (
        <Popover>
          <PopoverTrigger className="cursor-pointer p-1">
            <div className="relative h-5 w-5 overflow-hidden rounded-full">
              <Image
                src={user?.image!}
                alt={user?.name!}
                className="m-0"
                width={"20"}
                height={"20"}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex w-[min-content] flex-1 flex-col items-start">
            <a
              aria-label="Profile"
              href={`/user/${user?.username}`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icon.User aria-label="Profile" className="mr-2 h-5 w-5" />
              Profile
            </a>
            <a
              aria-label="Setting"
              href="/setting/user/profile"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icon.Settings aria-label="Setting" className="mr-2 h-5 w-5" />
              Setting
            </a>
            {user?.role?.includes("admin" || "author") && (
              <a
                aria-label="Dashboard"
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <Icon.Dashboard
                  aria-label="Dashboard"
                  className="mr-2 h-5 w-5"
                />
                Dashboard
              </a>
            )}
            <LogoutButton />
          </PopoverContent>
        </Popover>
      ) : (
        <AuthModal />
      )}
    </>
  )
}

export default UserMenu

import * as React from "react"

import Image from "@/components/image"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// import { useSession } from "@/lib/auth/client"
import { cn } from "@/lib/utils/style"
import { Skeleton } from "../ui/skeleton"
import AuthModal from "./auth-modal"
import LogoutButton from "./logout-button"

interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserMenu: React.FunctionComponent<UserMenuProps> = () => {
  // const { data: session, status } = useSession()

  // if (status === "loading") {
  //   return (
  //     <>
  //       <Skeleton className="h-5 w-5 rounded-full" />
  //     </>
  //   )
  // }
  const session = {}
  return (
    <>
      {session ? (
        <Popover className="popover relative mr-1 border-none p-0">
          <PopoverTrigger variant="ghost" className="cursor-pointer p-1">
            <div className="relative h-5 w-5 overflow-hidden rounded-full">
              <Image
                src={session?.user?.image!}
                alt={session?.user?.name!}
                className="m-0"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="left-[-110%] items-start"
            placement="bottom-left"
          >
            <a
              aria-label="Profile"
              href={`/user/${session?.user?.username}`}
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
            {session?.user?.role?.includes("admin" || "author") && (
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

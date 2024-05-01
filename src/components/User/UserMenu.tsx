import * as React from "react"
import type { User } from "lucia"

import Link from "@/components/Link"
import { buttonVariants } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover"
import { useSession } from "@/hooks/useSession"
// import { useSession } from "@/lib/auth/client"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import AuthModal from "./AuthDialog"
import LogoutButton from "./LogoutButton"

interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: User | null
  locale: LanguageType
}

const UserMenu: React.FunctionComponent<UserMenuProps> = (props) => {
  const { locale } = props
  const { session } = useSession()

  return (
    <>
      {session?.user ? (
        <Popover>
          <PopoverTrigger className="cursor-pointer p-1">
            <Icon.User aria-label="Profile" className="mr-2 h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent className="flex w-[min-content] flex-1 flex-col items-start">
            <Link
              locale={locale}
              aria-label="Profile"
              href={`/user/${session?.user?.username}`}
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icon.User aria-label="Profile" className="mr-2 h-5 w-5" />
              Profile
            </Link>
            <Link
              locale={locale}
              aria-label="Setting"
              href="/setting/user/profile"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <Icon.Settings aria-label="Setting" className="mr-2 h-5 w-5" />
              Setting
            </Link>
            {session?.user?.role?.includes("admin" || "author") && (
              <Link
                locale={locale}
                aria-label="Dashboard"
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <Icon.Dashboard
                  aria-label="Dashboard"
                  className="mr-2 h-5 w-5"
                />
                Dashboard
              </Link>
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

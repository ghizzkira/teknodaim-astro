import * as React from "react"

import { Button, buttonVariants } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/Popover"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"

const LanguageSwitcher = ({ locale }: { locale: LanguageType }) => {
  const [pathname, setPathname] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (window) {
      const currentUrl = new URL(window.location.href)
      let pathname = currentUrl.pathname

      const pathSegments = pathname
        .split("/")
        .filter((segment) => segment !== "")

      const indexToRemove = pathSegments.findIndex(
        (segment) => segment === "en" || segment === "id",
      )

      if (indexToRemove !== -1) {
        pathSegments.splice(indexToRemove, 1)
      }

      pathname = "/" + pathSegments.join("/")
      setPathname(pathname)
    }
  }, [])
  return (
    <div className="flex items-start px-2">
      <Popover>
        <PopoverTrigger
          className={cn(
            buttonVariants({
              variant: "ghost",
              className: "cursor-pointer bg-background",
            }),
          )}
        >
          {locale === "id" ? (
            <>
              <Icon.IndonesiaFlag
                aria-label="Switch to Bahasa Indonesia"
                className="mr-2 h-5 w-5"
              />
              Bahasa Indonesia
            </>
          ) : (
            <>
              <Icon.USAFlag
                aria-label="Switch to English"
                className="mr-2 h-5 w-5"
              />
              English
            </>
          )}
        </PopoverTrigger>
        <PopoverContent className="flex w-[220px] flex-col space-y-4">
          <Button
            aria-label="Switch to Bahasa Indonesia"
            onClick={() =>
              window.location.replace(
                `${import.meta.env.PUBLIC_SITE_URL}${pathname}`,
              )
            }
            variant="ghost"
            className="inline-flex cursor-pointer items-center justify-start bg-background"
          >
            <Icon.IndonesiaFlag
              aria-label="Switch to Bahasa Indonesia"
              className="mr-2 h-4 w-4"
            />
            Bahasa Indonesia
          </Button>
          <Button
            aria-label="Switch to English"
            onClick={() =>
              window.location.replace(
                `${import.meta.env.PUBLIC_SITE_URL}/en${pathname}`,
              )
            }
            variant="ghost"
            className="inline-flex cursor-pointer items-center justify-start bg-background"
          >
            <Icon.USAFlag
              aria-label="Switch to English"
              className="mr-2 h-4 w-4"
            />
            English
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default LanguageSwitcher

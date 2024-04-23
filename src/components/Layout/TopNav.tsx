import * as React from "react"
import type { User } from "lucia"

//  import type { Topic as TopicProps } from "@prisma/client"

import Logo from "@/components/Brand/Logo"
// import ThemeSwitcher from "@/components/theme/theme-switcher"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import UserMenu from "@/components/User/UserMenu"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import ThemeSwitcher from "../Theme/ThemeSwitcher"
import SearchTopNav from "./SearchTopNav"

interface TopNavProps extends React.HTMLAttributes<HTMLDivElement> {
  locale: LanguageType
  toggleSideNav?: () => void
  facebook_username?: string
  twitter_username?: string
  instagram_username?: string
  tiktok_username?: string
  whatsapp_channel?: string
  youtube_channel?: string
  headerType?: "default" | "video" | "shorts" | "video-content"
  // topics?: Partial<TopicProps>[]
  buttonMenu?: React.ReactNode
  user?: User | null
}

const TopNav: React.FunctionComponent<TopNavProps> = (props) => {
  const {
    headerType = "default",
    locale,
    buttonMenu,
    facebook_username,
    instagram_username,
    tiktok_username,
    twitter_username,
    whatsapp_channel,
    youtube_channel,
    user,
  } = props

  return (
    <header className="fixed top-0 z-[10] mx-auto flex h-16 w-full max-w-full items-center bg-background pl-[60px] shadow-md">
      {buttonMenu && <>{buttonMenu}</>}
      <div className="ml-auto mr-auto grow">
        <div className="h-full">
          <div className="flex h-full flex-row flex-nowrap items-center">
            <div className="flex items-center md:w-[250px]">
              <h2 className="m-0 p-0 text-4xl font-bold leading-none">
                <a aria-label="Go To Homepage" href="/">
                  <Logo />
                </a>
              </h2>
            </div>
            <div
              className={cn(
                "ml-auto md:ml-0 lg:w-[40%] xl:w-[50%]",
                headerType === "shorts" ? "hidden md:block" : "block",
              )}
            >
              <SearchTopNav locale={locale} />
            </div>
            <div
              className={cn(
                "grow-1 ml-2 flex flex-row space-x-2 pr-2 md:ml-auto",
                headerType === "shorts" ? "hidden md:block" : "block",
              )}
            >
              <div className="flex space-x-1">
                {facebook_username && (
                  <Button
                    aria-label="Facebook"
                    className="hidden p-1 lg:flex"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      aria-label="Facebook"
                      href={`https://www.facebook.com/${facebook_username}`}
                      target="_blank"
                    >
                      <Icon.Facebook
                        className="h-[19px] w-[19px]"
                        aria-label="Facebook"
                      />
                    </a>
                  </Button>
                )}
                {twitter_username && (
                  <Button
                    aria-label="Twitter"
                    className="hidden p-1 lg:flex"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      aria-label="Twitter"
                      href={`https://www.twitter.com/${twitter_username}`}
                      target="_blank"
                    >
                      <Icon.Twitter
                        className="h-[19px] w-[19px]"
                        aria-label="Twitter"
                      />
                    </a>
                  </Button>
                )}
                {instagram_username && (
                  <Button
                    aria-label="Instagram"
                    className="hidden p-1 lg:flex"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      href={`https://www.instagram.com/${instagram_username}`}
                      target="_blank"
                    >
                      <Icon.Instagram
                        className="h-[19px] w-[19px]"
                        aria-label="Instagram"
                      />
                    </a>
                  </Button>
                )}
                {tiktok_username && (
                  <Button
                    aria-label="Tiktok"
                    className="hidden p-1 lg:flex"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      aria-label="Tiktok"
                      href={`https://tiktok.com/${tiktok_username}`}
                      target="_blank"
                    >
                      <Icon.Tiktok
                        className="h-[19px] w-[19px]"
                        aria-label="Tiktok"
                      />
                    </a>
                  </Button>
                )}
                {whatsapp_channel && (
                  <Button
                    aria-label="WhatsApp Channel"
                    className="hidden p-1 lg:flex"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      aria-label="WhatsApp Channel"
                      href={`https://whatsapp.com/${whatsapp_channel}`}
                      target="_blank"
                    >
                      <Icon.WhatsApp
                        className="h-[19px] w-[19px]"
                        aria-label="WhatsApp Channel"
                      />
                    </a>
                  </Button>
                )}
                {youtube_channel && (
                  <Button
                    aria-label="Youtube"
                    className="hidden p-1 lg:flex"
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <a
                      aria-label="Youtube"
                      href={`https://www.youtube.com/${youtube_channel}`}
                      target="_blank"
                    >
                      <Icon.Youtube
                        className="h-[19px] w-[19px]"
                        aria-label="Youtube"
                      />
                    </a>
                  </Button>
                )}
                <div className="flex items-center">
                  <ThemeSwitcher />
                </div>
                <div className="flex items-center">
                  <UserMenu user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopNav

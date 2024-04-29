import * as React from "react"

import LanguageSwitcher from "@/components/LanguageSwitcher"
import Sidebar from "@/components/Layout/Sidebar"
import SidebarItem from "@/components/Layout/SidebarItem"
import ThemeSwitcher from "@/components/Theme/ThemeSwitcher"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
// import { logout } from "@/lib/auth/utils"
// import { useI18n } from "@/lib/locales/client"
import type { LanguageType } from "@/lib/validation/language"

interface DashboardSidebarProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  onToggle: () => void
  isOpen: boolean
  onClose: () => void
  locale: LanguageType
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { onToggle, onClose, isOpen, locale } = props

  const ref = React.useRef(null)

  useOnClickOutside(ref, onClose)

  const t = useI18n()

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" })
      if (!response.ok) {
        throw new Error("Sign out failed")
      }
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Button
        ref={ref}
        data-drawer-target="dashboard-sidebar"
        data-drawer-toggle="dashboard-sidebar"
        aria-controls="dashboard-sidebar"
        variant="ghost"
        size="icon"
        className="m-3 flex lg:hidden"
        onClick={onToggle}
      >
        <span className="sr-only">Open sidebar</span>
        <Icon.Menu className="size-6" />
      </Button>
      <Sidebar isOpen={isOpen}>
        <div className="h-full overflow-y-auto border-r border-border bg-background px-3 py-5">
          <ul className="space-y-2">
            <SidebarItem href="/" icon={<Icon.Home />}>
              {t("home")}
            </SidebarItem>
            <SidebarItem href="/dashboard" icon={<Icon.Dashboard />}>
              {t("overview")}
            </SidebarItem>
            <SidebarItem href="/dashboard/article" icon={<Icon.Article />}>
              {t("articles")}
            </SidebarItem>
            <SidebarItem href="/dashboard/topic" icon={<Icon.Topic />}>
              {t("topics")}
            </SidebarItem>
            <SidebarItem href="/dashboard/media" icon={<Icon.Media />}>
              {t("medias")}
            </SidebarItem>
            <SidebarItem href="/dashboard/ad" icon={<Icon.Ads />}>
              {t("ads")}
            </SidebarItem>
            <SidebarItem href="/dashboard/user" icon={<Icon.User />}>
              {t("users")}
            </SidebarItem>
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 z-20 flex w-full justify-center space-x-4 border-r border-border bg-background p-4">
          <LanguageSwitcher locale={locale} />
          <ThemeSwitcher />
          <Button asChild variant="ghost">
            <a href="/dashboard/setting">
              <Icon.Settings />
            </a>
          </Button>
          <Button onClick={handleSignOut} variant="ghost" size="icon">
            <Icon.Logout />
          </Button>
        </div>
      </Sidebar>
      {isOpen && (
        <div className="z-29 fixed inset-0 bg-primary/50 bg-opacity-50 dark:bg-opacity-80"></div>
      )}
    </>
  )
}

export default DashboardSidebar

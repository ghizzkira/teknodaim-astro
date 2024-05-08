import * as React from "react"
import type { User } from "lucia"

import LanguageSwitcher from "@/components/LanguageSwitcher"
import Sidebar from "@/components/Layout/Sidebar"
import SidebarItem from "@/components/Layout/SidebarItem"
import SidebarToggle from "@/components/Layout/SidebarToggle"
import SidebarToggleItem from "@/components/Layout/SidebarToggleItem"
// import ThemeSwitcher from "@/components/Theme/ThemeSwitcher.astro"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { useOnClickOutside } from "@/hooks/useOnClickOutside"
// import { logout } from "@/lib/auth/utils"
import { useI18n } from "@/lib/locales/client"
import type { LanguageType } from "@/lib/validation/language"

interface DashboardSidebarProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  locale: LanguageType
  user: User
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = (props) => {
  const { locale, user } = props

  const t = useI18n(locale)

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
      <Sidebar>
        <SidebarItem
          icon={<Icon.Dashboard aria-label="Dashboard" />}
          href="/dashboard"
        >
          Dashboard
        </SidebarItem>
        <SidebarToggle
          icon={<Icon.Download aria-label="Downloads" />}
          title="Downloads"
        >
          <SidebarToggleItem href="/dashboard/download">
            All Downloads
          </SidebarToggleItem>
          <SidebarToggleItem href="/dashboard/download/new">
            Add new download
          </SidebarToggleItem>
          <SidebarToggleItem href="/dashboard/download-file">
            All Download Files
          </SidebarToggleItem>
          <SidebarToggleItem href="/dashboard/download-file/new">
            Add new download file
          </SidebarToggleItem>
        </SidebarToggle>
        <SidebarToggle icon={<Icon.Topic aria-label="Topics" />} title="Topics">
          <SidebarToggleItem href="/dashboard/topic">
            All Topics
          </SidebarToggleItem>
          <SidebarToggleItem href="/dashboard/topic/new">
            Add new topic
          </SidebarToggleItem>
        </SidebarToggle>
        {user?.role === "admin" && (
          <SidebarToggle icon={<Icon.Currency aria-label="Ads" />} title="Ads">
            <SidebarToggleItem href="/dashboard/ad">All Ads</SidebarToggleItem>
            <SidebarToggleItem href="/dashboard/ad/new">
              Add new ad
            </SidebarToggleItem>
          </SidebarToggle>
        )}
        <SidebarToggle icon={<Icon.Media aria-label="Media" />} title="Media">
          <SidebarToggleItem href="/dashboard/media">Library</SidebarToggleItem>
          <SidebarToggleItem href="/dashboard/media/new">
            Add new
          </SidebarToggleItem>
        </SidebarToggle>
        {user?.role === "admin" && (
          <>
            <SidebarToggle
              icon={<Icon.Smartphone aria-label="Gadget" />}
              title="Gadget"
            >
              <SidebarToggleItem href="/dashboard/gadget">
                All Gadget
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/gadget/new">
                Add new gadget
              </SidebarToggleItem>
            </SidebarToggle>
            <SidebarToggle
              icon={<Icon.Youtube aria-label="Videos" />}
              title="Video Embed"
            >
              <SidebarToggleItem href="/dashboard/video-embed">
                All Video Embed
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/video-embed/new">
                Add new video embed
              </SidebarToggleItem>
            </SidebarToggle>
            <SidebarItem
              icon={<Icon.Menu aria-label="Menu" />}
              href="/dashboard/menu"
            >
              Menu
            </SidebarItem>
            <SidebarItem
              icon={<Icon.Comment aria-label="Comment" />}
              href="/dashboard/comment"
            >
              Comment
            </SidebarItem>

            <SidebarToggle
              icon={<Icon.Person aria-label="Users" />}
              title="Users"
            >
              <SidebarToggleItem href="/dashboard/user">
                Users
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/user-expertise">
                All user expertises
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/user-expertise/new">
                Add new user expertises
              </SidebarToggleItem>
            </SidebarToggle>
            <SidebarItem
              icon={<Icon.Shop aria-label="Shop" />}
              href="/dashboard/shop"
            >
              Shop
            </SidebarItem>
            <SidebarToggle
              icon={<Icon.Settings aria-label="Filter Post" />}
              title="Setting"
            >
              <SidebarToggleItem href="/dashboard/setting">
                General Settings
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/filter-post">
                Filter Posts
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/featured-posts">
                Featured Posts
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/featured-categories">
                Featured Categories
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/setting/ads">
                ads.txt
              </SidebarToggleItem>
              <SidebarToggleItem href="/dashboard/setting/robots">
                robots.txt
              </SidebarToggleItem>
            </SidebarToggle>
          </>
        )}
        <SidebarItem
          className="py-5"
          icon={<Icon.Person aria-label="Profile" />}
          href="/setting/user/profile"
        >
          Profile
        </SidebarItem>
      </Sidebar>
    </>
  )
}

export default DashboardSidebar

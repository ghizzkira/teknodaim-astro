import * as React from "react"

// import type { Menu as MenuProps } from "@prisma/client"

import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import CheckboxSidebar from "./checkbox-sidebar"
import Footer from "./footer"
import SideNav from "./side-nav"
import TopNav from "./top-nav"

interface MainContainerProps {
  locale: LanguageType
  headerType?: "default" | "video" | "shorts" | "video-content"
  children: React.ReactNode
  // menus?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  // menusByLang?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  // menusFooterAll?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  // menusFooterByLang?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  type?: "default" | "video" | "shorts" | "video-content"
  settings?: Record<string, string>
}

const MainContainer: React.FunctionComponent<MainContainerProps> = (props) => {
  const {
    locale,
    headerType = "default",
    // menus,
    // menusByLang,
    settings,
    // menusFooterAll,
    // menusFooterByLang,
    children,
    type = "default",
  } = props

  return (
    <div>
      <CheckboxSidebar />
      <TopNav
        headerType={headerType}
        locale={locale}
        facebook_username={settings?.facebook_username}
        twitter_username={settings?.twitter_username}
        instagram_username={settings?.instagram_username}
        tiktok_username={settings?.tiktok_username}
        whatsapp_channel={settings?.whatsapp_channel}
        youtube_channel={settings?.youtube_channel}
        buttonMenu={
          <>
            <label
              htmlFor="openSidebarMenu"
              className="sidebarIconToggle fixed left-4 top-6 z-20 box-border h-6 w-6 cursor-pointer transition-all duration-300"
            >
              <span className="spinner diagonal part-1 bg-foreground"></span>
              <span className="spinner horizontal bg-foreground"></span>
              <span className="spinner diagonal part-2 bg-foreground"></span>
            </label>
          </>
        }
      />
      <input
        type="checkbox"
        className="openSidebarMenu peer/menu hidden transition-all duration-300"
        id="openSidebarMenu"
      />
      <div
        id="sidebarMenu"
        className={cn(
          "duration-250 fixed left-0 top-16 z-[5] h-full w-[250px] transform border-r border-border bg-background pt-3 transition-transform ease-in-out ",
          type === "default" &&
            "-translate-x-full peer-checked/menu:translate-x-0 md:translate-x-0 peer-checked/menu:md:-translate-x-full",
          type === "video" &&
            "z-[9] -translate-x-full peer-checked/menu:translate-x-0 min-[1330px]:translate-x-0 peer-checked/menu:min-[1330px]:-translate-x-full",
          type === "shorts" &&
            "-translate-x-full peer-checked/menu:translate-x-0",
        )}
      >
        <SideNav
          // menuSideBarAll={menus}
          // menuSideBarByLang={menusByLang}
          isMain={true}
        />
      </div>
      <div
        id="center"
        className={cn(
          "fade-up-element mx-auto block h-full",
          type === "default" && "md:pl-[250px] peer-checked/menu:md:pl-0",
          type === "video" &&
            "min-[1330px]:pl-[250px] peer-checked/menu:min-[1330px]:pl-0",
          type === "video"
            ? "mt-[64px]"
            : type === "shorts"
              ? "mt-0 md:mt-20"
              : "mt-[64px]",
        )}
      >
        {children}
      </div>
      {type !== "shorts" && (
        <Footer
          className={
            type === "default"
              ? "md:pl-[250px] peer-checked/menu:md:pl-0"
              : type === "video"
                ? "min-[1330px]:pl-[250px] peer-checked/menu:min-[1330px]:pl-0"
                : undefined
          }
          site_title={settings?.site_title}
          support_email={settings?.support_email}
          // menusFooterAll={menusFooterAll}
          // menusFooterByLang={menusFooterByLang}
        />
      )}
    </div>
  )
}

export default MainContainer

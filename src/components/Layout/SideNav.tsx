import * as React from "react"

import LanguageSwitcher from "@/components/LanguageSwitcher"
import Link from "@/components/Link"
//  import { type Menu as MenuProps } from "@prisma/client"

// import Image from "@/components/Image"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import type { LanguageType } from "@/lib/validation/language"

// import env from "@/env"
// import ThemeSwitcher from "@/components/theme/theme-switcher"

interface SideNavProps {
  isMain: boolean
  // menuSideBarAll?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  // menuSideBarByLang?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  // menuSideBarShopAll?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  // menuSideBarShopByLang?:
  //   | Pick<
  //       MenuProps,
  //       "id" | "title" | "link" | "location" | "icon" | "order" | "active"
  //     >[]
  //   | null
  type?: "default" | "video" | "shorts" | "video-content"
  toggleSideNav?: () => void
  locale: LanguageType
}

const SideNav: React.FunctionComponent<SideNavProps> = (props) => {
  const {
    isMain,
    // menuSideBarAll,
    // menuSideBarByLang,
    // menuSideBarShopAll,
    // menuSideBarShopByLang,
    type = "default",
    locale,
    toggleSideNav,
  } = props

  const stylesIcons = "inline-block text-base mr-2"

  return (
    <nav className="relative flex w-full flex-col">
      {type === "video" && (
        <div className="mb-5 flex px-4">
          <div className="mr-1 px-1">
            <Button
              aria-label="Open Menu"
              variant="ghost"
              size="icon"
              className="cursor-pointer p-1"
              onClick={toggleSideNav}
            >
              <Icon.Menu aria-label="Open Menu" className="h-[28px] w-[28px]" />
            </Button>
          </div>
          <div className="flex w-full flex-row flex-wrap items-center justify-start pl-0 pr-0">
            <h2 className="m-0 p-0 text-4xl font-bold leading-none">
              <a aria-label="Go To Homepage" href="/">
                <div className="relative h-[23px] w-[119px]">
                  <img
                    sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 33vw"
                    alt={import.meta.env.PUBLIC_SITE_TITLE}
                    src={import.meta.env.PUBLIC_LOGO_URL}
                  />
                </div>
              </a>
            </h2>
          </div>
        </div>
      )}
      <LanguageSwitcher locale={locale} />
      {/* <ul className="flex flex-col space-y-3 border-b border-muted p-4">
        {!isMain && (
          <li>
            <a
              aria-label="Go To Homepage"
              href="/"
              role="link"
              className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
            >
              <p className="inline-flex items-center font-bold hover:text-primary">
                {
                  <Icon.Home
                    aria-label="Go To Homepage"
                    className={stylesIcons}
                  />
                }
                {"Home"}
              </p>
            </a>
          </li>
        )}
        {isMain && (
          <>
            <li>
              <a
                aria-label="Go To Trending Page"
                href="/trending"
                role="link"
                className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
              >
                <p className="inline-flex items-center font-bold hover:text-primary">
                  <Icon.Trending
                    aria-label="Go To Trending Page"
                    className={stylesIcons}
                  />
                  Trending
                </p>
              </a>
            </li>
            <li>
              <a
                aria-label="Go To Popular Page"
                href="/popular"
                role="link"
                className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
              >
                <p className="inline-flex items-center font-bold hover:text-primary">
                  <Icon.Bolt
                    aria-label="Go To Popular Page"
                    className={stylesIcons}
                  />
                  Popular
                </p>
              </a>
            </li>
            {menuSideBarAll?.map((menu) => {
              if (menu.active) {
                return (
                  <li key={menu.id}>
                    <a
                      aria-label={menu.title}
                      href={menu.link}
                      role="link"
                      className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                    >
                      {menu.icon?.includes("http") && (
                        <span className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                          <Image
                            src={menu.icon}
                            alt={menu.title}
                            sizes={`(max-width: 1200px) 20px, 20px`}
                          />
                        </span>
                      )}
                      <p className="inline-flex items-center font-bold hover:text-primary">
                        {menu.title}
                      </p>
                    </a>
                  </li>
                )
              }
              return
            })}
          </>
        )}
        {!isMain && (
          <>
            {menuSideBarShopAll?.map((menu) => {
              if (menu.active) {
                return (
                  <li key={menu.id}>
                    <a
                      role="link"
                      aria-label={menu.title}
                      href={menu.link}
                      className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                    >
                      {menu.icon?.includes("http") && (
                        <span className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                          <Image
                            src={menu.icon}
                            alt={menu.title}
                            sizes={`(max-width: 1200px) 20px, 20px`}
                          />
                        </span>
                      )}
                      <p className="inline-flex items-center font-bold hover:text-primary">
                        {menu.title}
                      </p>
                    </a>
                  </li>
                )
              }
              return
            })}
          </>
        )}
        {isMain &&
          menuSideBarByLang?.map((menu) => {
            if (menu.active) {
              return (
                <li key={menu.id}>
                  <a
                    role="link"
                    aria-label={menu.title}
                    href={menu.link}
                    className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                  >
                    {menu.icon?.includes("http") && (
                      <span className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                        <Image
                          src={menu.icon}
                          alt={menu.title}
                          sizes={`(max-width: 1200px) 20px, 20px`}
                        />
                      </span>
                    )}
                    <p className="inline-flex items-center font-bold hover:text-primary">
                      {menu.title}
                    </p>
                  </a>
                </li>
              )
            }
            return
          })}
        {!isMain &&
          menuSideBarShopByLang?.map((menu) => {
            if (menu.active) {
              return (
                <li key={menu.id}>
                  <a
                    role="link"
                    aria-label={menu.title}
                    href={menu.link}
                    className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
                  >
                    {menu.icon?.includes("http") && (
                      <span className="relative mr-2 aspect-[1/1] h-5 w-5 overflow-hidden rounded bg-transparent">
                        <Image
                          src={menu.icon}
                          alt={menu.title}
                          sizes={`(max-width: 1200px) 20px, 20px`}
                        />
                      </span>
                    )}
                    <p className="inline-flex items-center font-bold hover:text-primary">
                      {menu.title}
                    </p>
                  </a>
                </li>
              )
            }
            return
          })}
      </ul> */}
      <div className="flex flex-col items-start space-y-3 border-b border-border p-4">
        {/* <ThemeSwitcher /> */}
      </div>
      <ul className="flex flex-col space-y-3 border-b border-border p-4">
        <li>
          <Link
            locale={locale}
            role="link"
            aria-label="Go To Download Page"
            href="/download"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="inline-flex items-center font-bold hover:text-primary">
              <Icon.Download
                aria-label="Go To Download Page"
                className={stylesIcons}
              />
              Download
            </p>
          </Link>
        </li>
        <li>
          <Link
            locale={locale}
            role="link"
            aria-label="Go To Video Page"
            href="/video"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="inline-flex items-center font-bold hover:text-primary">
              <Icon.Youtube
                aria-label="Go To Video Page"
                className={stylesIcons}
              />
              Video
            </p>
          </Link>
        </li>
        <li>
          <Link
            locale={locale}
            role="link"
            aria-label="Go To Shop Page"
            href="/shop"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="inline-flex items-center font-bold hover:text-primary">
              <Icon.Shop aria-label="Go To Shop Page" className={stylesIcons} />
              Shop
            </p>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col space-y-3 border-b border-muted p-4">
        <li>
          <Link
            locale={locale}
            aria-label="About Us"
            href="/about"
            role="link"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="inline-flex items-center font-bold hover:text-primary">
              About Us
            </p>
          </Link>
        </li>
        <li>
          <Link
            locale={locale}
            aria-label="Contact"
            href="/contact"
            role="link"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="inline-flex items-center font-bold hover:text-primary">
              Contact
            </p>
          </Link>
        </li>
        <li>
          <Link
            locale={locale}
            aria-label="Privacy"
            href="/privacy"
            role="link"
            className="flex transform flex-row items-center transition-transform duration-200 ease-in hover:translate-x-2"
          >
            <p className="inline-flex items-center font-bold hover:text-primary">
              Privacy Policy
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideNav

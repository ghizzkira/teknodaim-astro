// TODO: get address, logo url, etc from db.

import * as React from "react"

// import a from "next/link"
// import { type Menu as MenuProps } from "@prisma/client"

import Logo from "@/components/Brand/Logo"
import { Icon } from "@/components/UI/Icon"

// import env from "@/env"

interface FooterProps {
  className?: string
  address?: string
  site_title?: string
  support_email?: string
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
}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  const { address, site_title, className } = props

  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={`${className} relative mt-12 flex flex-col border border-t border-border bg-background/70`}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="flex flex-col md:flex-row lg:px-8">
          <div className="mb-6 w-full md:mb-0 md:w-5/12 lg:mr-3">
            <a
              aria-label="Go To Homepage"
              className="self-center pl-4"
              href="/"
            >
              <Logo />
            </a>
            <ul className="mt-8 flex flex-col space-y-2 font-medium text-foreground/80">
              <li className="inline-flex">
                <Icon.Location aria-label="Location" className="mr-2 h-6 w-6" />
                <span>{address ?? import.meta.env.PUBLIC_ADDRESS}</span>
              </li>
              {/* <li className="inline-flex">
                <Icon.Email
                  aria-label={`Send Email ${import.meta.env.PUBLIC_SUPPORT_EMAIL}`}
                  className="mr-2 h-4 w-4"
                />
                <a
                  aria-label={`Send Email ${import.meta.env.PUBLIC_SUPPORT_EMAIL}`}
                  href={`mailto:${
                    support_email ?? env.PUBLIC_SUPPORT_EMAIL
                  }`}
                >
                  <span>{import.meta.env.PUBLIC_SUPPORT_EMAIL}</span>
                </a>
              </li> */}
              <li className="inline-flex">
                <Icon.WhatsApp
                  aria-label={`Send Whatsapp to ${import.meta.env.PUBLIC_WHATSAPP_NUMBER}`}
                  className="mr-2 h-4 w-4"
                />
                <a
                  aria-label={`Send Whatsapp to ${import.meta.env.PUBLIC_WHATSAPP_NUMBER}`}
                  href={`https://api.whatsapp.com/send?phone=${import.meta.env.PUBLIC_WHATSAPP_NUMBER}`}
                >
                  <span>{`+${import.meta.env.PUBLIC_WHATSAPP_NUMBER}`}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-7/12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-6">
              <div>
                <ul className="space-y-2 font-medium text-foreground/80">
                  {/* {menusFooterAll?.map((menu) => {
                    if (menu.active) {
                      return (
                        <li key={menu.id}>
                          <a
                            aria-label={`Open ${menu.title}`}
                            href={menu.link}
                            className="hover:underline"
                          >
                            {menu.title}
                          </a>
                        </li>
                      )
                    }
                    return
                  })} */}
                </ul>
              </div>
              <div>
                <ul className="space-y-2 font-medium text-foreground/80">
                  {/* {menusFooterByLang?.map((menu) => {
                    if (menu.active) {
                      return (
                        <li key={menu.id}>
                          <a
                            aria-label={menu.title}
                            href={menu.link}
                            className="hover:underline"
                          >
                            {menu.title}
                          </a>
                        </li>
                      )
                    }
                    return
                  })} */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-[60px] border border-t border-border">
        <div className="w-full self-center pl-4">{`© ${currentYear} ${
          site_title ?? import.meta.env.PUBLIC_SITE_TITLE
        }`}</div>
      </div>
    </footer>
  )
}

export default Footer

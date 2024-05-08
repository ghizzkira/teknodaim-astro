import * as React from "react"

import Link from "@/components/Link"

interface SidebarToggleItemProps {
  children?: React.ReactNode
  href: string
}

const SidebarToggleItem: React.FunctionComponent<SidebarToggleItemProps> = (
  props,
) => {
  const { children, href } = props

  return (
    <li>
      <Link
        aria-label="Tiggle Item"
        href={href}
        className="group flex w-full items-center rounded-lg bg-background p-2 pl-11 text-base font-normal text-foreground transition duration-75 hover:bg-primary/10"
        locale={"id"}
      >
        {children}
      </Link>
    </li>
  )
}

export default SidebarToggleItem

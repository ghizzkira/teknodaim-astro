"use client"

import type { UrlObject } from "url"
import * as React from "react"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { useI18n } from "@/lib/locales/client"

interface DashboardAddNewProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string | UrlObject
}

const DashboardAddNew: React.FC<DashboardAddNewProps> = (props) => {
  const { url } = props

  const t = useI18n()

  return (
    <Button variant="ghost" asChild>
      <a aria-label={t("add_new")} href={url}>
        <Icon.Add className="mr-2" />
        {t("add_new")}
      </a>
    </Button>
  )
}

export default DashboardAddNew

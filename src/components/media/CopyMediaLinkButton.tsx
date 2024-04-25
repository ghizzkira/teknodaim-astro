"use client"

import * as React from "react"

import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { toast } from "@/components/UI/Toast/useToast"
import { copyToClipboard } from "@/lib/utils/content"

interface CopyMediaLinkButton {
  url: string
}

const CopyMediaLinkButton: React.FunctionComponent<CopyMediaLinkButton> = (
  props,
) => {
  const { url } = props

  return (
    <Button
      aria-label="Copy Media Link"
      size="icon"
      className="absolute z-20 ml-8 h-[30px] w-[30px] rounded-full"
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        copyToClipboard(url)
        toast({
          variant: "success",
          description: "Media link copied to clipboard",
        })
      }}
    >
      <Icon.Copy aria-label="Copy Media Link" />
    </Button>
  )
}

export default CopyMediaLinkButton

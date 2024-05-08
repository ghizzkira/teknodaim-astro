import * as React from "react"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

export const ShareButtonWhatsApp: React.FunctionComponent<ShareButtonProps> = (
  props,
) => {
  const { url, onClick, title, text, message, ...rest } = props

  return (
    <ShareButton
      className="flex flex-1 bg-[#22C35E] text-background hover:bg-[#22C35E]/70"
      onClick={onClick}
      icon={<Icon.WhatsApp />}
      message={message}
      text={text ?? ""}
      title={title ?? "WhatsApp"}
      url={
        "whatsapp://send?text=" + encodeURI(message!) + "%20" + encodeURI(url)
      }
      {...rest}
    />
  )
}

import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { ShareButton, type ShareButtonProps } from "./share-button"

interface ShareButtonTelegramProps extends ShareButtonProps {
  message?: string
}

export const ShareButtonTelegram: React.FunctionComponent<
  ShareButtonTelegramProps
> = (props) => {
  const { url, onClick, title, text, message } = props

  return (
    <ShareButton
      className="flex flex-1 bg-[#179cde] text-background hover:bg-[#179cdee8]"
      onClick={onClick}
      icon={<Icon.Telegram aria-label="Whatsapp" />}
      text={text ?? ""}
      title={title ?? "Telegram"}
      url={
        "https://telegram.me/share/url?url=" +
        encodeURI(url) +
        "%2F&text=" +
        encodeURI(message!)
      }
    />
  )
}

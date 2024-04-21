import * as React from "react"

import { Icon } from "@/components/ui/icon"
import { ShareButton, type ShareButtonProps } from "./share-button"

export const ShareButtonEmail: React.FunctionComponent<ShareButtonProps> = (
  props,
) => {
  const { url, onClick, subject, title, text, ...rest } = props

  return (
    <ShareButton
      className="flex flex-1 bg-foreground/80 text-background hover:bg-foreground/70"
      onClick={onClick}
      icon={<Icon.Email />}
      subject={subject}
      text={text ?? ""}
      title={title ?? "Email"}
      url={`mailto:?subject=${encodeURI(subject!)}&body=${encodeURI(url)}`}
      {...rest}
    />
  )
}

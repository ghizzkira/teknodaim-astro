import * as React from "react"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

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

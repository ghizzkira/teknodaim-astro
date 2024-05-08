import * as React from "react"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

export const ShareButtonPinterest: React.FunctionComponent<ShareButtonProps> = (
  props,
) => {
  const { url, onClick, text, title, sharetext, mediaSrc, ...rest } = props

  return (
    <ShareButton
      className="flex flex-1 bg-[#e60023] text-background hover:bg-[#e60023]/70"
      onClick={onClick}
      icon={<Icon.Pinterest />}
      text={text ?? ""}
      title={title ?? "Pinterest"}
      url={`https://pinterest.com/pin/create/button/?url=${encodeURI(
        url,
      )}&media=${encodeURI(mediaSrc!)}&description=${encodeURI(sharetext!)}`}
      {...rest}
    />
  )
}

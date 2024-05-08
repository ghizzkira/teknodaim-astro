import * as React from "react"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

import { ShareButton, type ShareButtonProps } from "./ShareButton"
import { Icon } from "@/components/UI/Icon"

export const ShareButtonTwitter: React.FunctionComponent<ShareButtonProps> = (
  props,
) => {
  const { url, onClick, title, text, sharetext, ...rest } = props

  return (
    <ShareButton
      className="flex flex-1 bg-[#000000] text-white hover:bg-[#000000dc]"
      onClick={onClick}
      icon={<Icon.Twitter />}
      text={text ?? ""}
      title={title ?? "Twitter"}
      sharetext={sharetext}
      url={`https://twitter.com/intent/tweet/?text=${encodeURI(
        sharetext!,
      )}&url=${encodeURI(url)}`}
      {...rest}
    />
  )
}

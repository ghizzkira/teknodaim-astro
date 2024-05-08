import * as React from "react"

import { Icon } from "@/components/UI/Icon"
import { ShareButton, type ShareButtonProps } from "./ShareButton"

export const ShareButtonFacebook: React.FunctionComponent<ShareButtonProps> = (
  props,
) => {
  const { url, onClick, title, text, ...rest } = props

  return (
    <ShareButton
      className="flex flex-1 bg-[#314E89] text-background hover:bg-[#314E89]/70"
      onClick={onClick}
      icon={<Icon.Facebook />}
      url={`https://facebook.com/sharer/sharer.php?u=${encodeURI(url)}`}
      text={text ?? ""}
      title={title ?? "Facebook"}
      {...rest}
    />
  )
}

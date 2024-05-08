import * as React from "react"

import { ShareButtonEmail } from "./ShareButtonEmail"
import { ShareButtonFacebook } from "./ShareButtonFacebook"
import { ShareButtonTwitter } from "./ShareButtonTwitter"
import { ShareButtonWhatsApp } from "./ShareButtonWhatsapp"

import { ShareButtonEmail } from "./ShareButtonEmail"
import { ShareButtonFacebook } from "./ShareButtonFacebook"
import { ShareButtonTwitter } from "./ShareButtonTwitter"
import { ShareButtonWhatsApp } from "./ShareButtonWhatsapp"

interface ShareButtonArticleProps {
  url: string
  text?: string
  media?: string
}

const ShareButtonArticle: React.FunctionComponent<ShareButtonArticleProps> = (
  props,
) => {
  const { url, text } = props
  return (
    <>
      <ShareButtonFacebook url={url} />
      <ShareButtonTwitter url={url} />
      <ShareButtonEmail url={url} subject={text} />
      <ShareButtonWhatsApp message={text} url={url} />
    </>
  )
}

export default ShareButtonArticle

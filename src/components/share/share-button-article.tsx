import * as React from "react"

import { ShareButtonEmail } from "./share-button-email"
import { ShareButtonFacebook } from "./share-button-facebook"
import { ShareButtonTwitter } from "./share-button-twitter"
import { ShareButtonWhatsApp } from "./share-button-whatsapp"

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

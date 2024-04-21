"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { ShareButtonEmail } from "./share-button-email"
import { ShareButtonFacebook } from "./share-button-facebook"
import { ShareButtonTelegram } from "./share-button-telegram"
import { ShareButtonTwitter } from "./share-button-twitter"
import { ShareButtonWhatsApp } from "./share-button-whatsapp"

interface ShareButtonPopularProps {
  url: string
  text?: string
  media?: string
}

const ShareButtonPopular: React.FunctionComponent<ShareButtonPopularProps> = (
  props,
) => {
  const { url, text } = props

  const [isHide, setIsHide] = React.useState<boolean>(true)

  return (
    <div className="flex flex-1 space-x-2">
      <div className="flex flex-1">
        <ShareButtonFacebook url={url} />
      </div>
      <div className="flex flex-1">
        <ShareButtonTwitter url={url} sharetext={text} />
      </div>
      {!isHide && (
        <div className={`flex flex-1 items-start space-x-2`}>
          <div className="flex w-10 flex-1 overflow-hidden rounded-lg">
            <ShareButtonEmail url={url} subject={text} />
          </div>
          <div className="flex w-10 flex-1 overflow-hidden rounded-lg">
            <ShareButtonTelegram url={url} message={text} />
          </div>
          <div className="flex w-10 flex-1 overflow-hidden rounded-lg">
            <ShareButtonWhatsApp message={text} url={url} />
          </div>
        </div>
      )}
      <div className="w-10">
        <Button
          aria-label="Share"
          variant="outline"
          onClick={() => setIsHide(!isHide)}
        >
          {isHide ? (
            <Icon.MoreVert aria-label="Open Share Menu" />
          ) : (
            <Icon.Close aria-label="Close Share Menu" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default ShareButtonPopular

// Fix later

import * as React from "react"

interface TwitterEmbedProps {
  children: React.ReactNode
}

const TwitterEmbed = ({ children }: TwitterEmbedProps) => {
  const regex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+).*$/
  const modifiedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child?.props?.href?.match(regex)) {
      const { href } = child.props
      const match = href.match(regex)
      if (match?.[1]) {
        return (
          <span className="flex justify-center">
            {/* <TweetEmbed url={href} /> */}
          </span>
        )
      }

      return
    }
    return
  })

  return <>{modifiedChildren}</>
}

export const TwitterEmbedFromTipTap = (props: { tweetUrl: string }) => {
  const { tweetUrl } = props
  const regex = /^https?:\/\/twitter\.com\/\w+\/status\/(\d+).*$/

  const match = tweetUrl?.match(regex)
  if (match) {
    return (
      <span className="flex justify-center">
        {/* <TweetEmbed url={tweetUrl} /> */}
      </span>
    )
  }
  return
}

export default TwitterEmbed

import * as React from "react"

interface AdsenseProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

const Adsense: React.FunctionComponent<AdsenseProps> = (props) => {
  const { content } = props

  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (import.meta.env.APP_ENV === "development") {
    return null
  }

  if (!isHydrated) {
    return null
  }

  return (
    <div className="my-[5px] flex h-auto w-[100vw] min-w-full justify-center overflow-hidden sm:w-full">
      <ins
        className="adsbygoogle manual-placed h-auto w-[100vw] min-w-full sm:w-full"
        style={{ display: "block" }}
        data-ad-client={import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={content}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}

export default Adsense

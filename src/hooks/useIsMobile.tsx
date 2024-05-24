import * as React from "react"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)")

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    setIsMobile(mediaQuery.matches)

    mediaQuery.addEventListener("change", handleMediaChange)
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange)
    }
  }, [])

  return isMobile
}

export default useIsMobile

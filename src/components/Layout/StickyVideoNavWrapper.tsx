import * as React from "react"

import { cn } from "@/lib/utils/style"

interface StickyVideoNavWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const StickyVideoNavWrapper: React.FunctionComponent<
  StickyVideoNavWrapperProps
> = (props) => {
  const { children } = props

  const [isHide, setIsHide] = React.useState(false)
  const toggleVisibility = () => {
    const element = document.getElementById("cloud-eye")
    const position = element ? element.getBoundingClientRect().top : 0
    if (position < 10) {
      setIsHide(true)
    } else {
      setIsHide(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  return (
    <>
      <div
        className={cn(
          "transition-all duration-500 ease-in sm:static",
          isHide
            ? "opacity-1 sticky top-[calc(56.25vw+64px)] z-[50] translate-y-0 sm:opacity-[1]"
            : "-translate-y-[50vh] opacity-0",
        )}
      >
        {children}
      </div>
      <div id="cloud-eye"></div>
    </>
  )
}

export default StickyVideoNavWrapper

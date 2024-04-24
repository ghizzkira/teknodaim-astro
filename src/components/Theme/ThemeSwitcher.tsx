import * as React from "react"
import { useState } from "react"

import { Icon } from "@/components/UI/Icon"

const ThemeSwitcher: React.FunctionComponent = () => {
  const [toggle, setToggle] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light"
    }
    return "light"
  })
  console.log(toggle)
  const [isMounted, setIsMounted] = React.useState(false)

  const toggleTheme = () => {
    let newTheme = toggle === "light" ? "dark" : "light"
    setToggle(newTheme)
    document.dispatchEvent(new CustomEvent("set-theme", { detail: toggle }))
  }
  // React.useEffect(() => {
  //   document.dispatchEvent(new CustomEvent("set-theme", { detail: toggle }))
  // }, [])
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) {
    return (
      <div className="flex items-center justify-center">
        <div
          className={`relative flex h-7 w-[52px] items-center rounded-full bg-border transition duration-200 ease-linear`}
        >
          <div
            className={`absolute left-0 mx-[2px] flex h-6 w-6 transform animate-pulse cursor-pointer items-center justify-center rounded-full bg-background transition duration-100 ease-linear`}
          ></div>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center">
      <div
        onClick={toggleTheme}
        className={`relative flex h-7 w-[52px] items-center rounded-full bg-border transition duration-200 ease-linear`}
      >
        <button
          className={`border-1 absolute left-0 mx-[2px] flex h-6 w-6 transform cursor-pointer items-center justify-center rounded-full bg-background transition duration-100 ease-linear ${
            toggle === "light" ? "translate-x-full" : "translate-x-0"
          }`}
        >
          {toggle === "light" ? (
            <Icon.Dark aria-label="Dark Theme" className="h-4 w-4" />
          ) : (
            <Icon.Light aria-label="Light Theme" className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}

export default ThemeSwitcher

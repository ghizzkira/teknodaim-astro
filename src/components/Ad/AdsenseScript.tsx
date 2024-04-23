import * as React from "react"

const AdsenseScript = () => {
  const [hasScrolled, setHasScrolled] = React.useState(false)

  React.useEffect(() => {
    const scriptElement = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}"]`,
    )

    const handleAdLoad = () => {
      try {
        const insElements = Array.from(
          document.querySelectorAll("ins.manual-placed"),
        )
        const insWithoutIframe = insElements.filter(
          (ins) => !ins.querySelector("iframe"),
        )
        if (!hasScrolled && insWithoutIframe.length > 0) {
          //@ts-ignore
          if (window?.adsbygoogle) {
            setHasScrolled(true)
            insWithoutIframe.forEach((el) => {
              if (!el.querySelector("iframe")) {
                //@ts-ignore
                ;(window.adsbygoogle = window.adsbygoogle || []).push({})
              }
            })
            window.removeEventListener("scroll", handleAdScroll)
          } else {
            scriptElement?.addEventListener("load", handleAdLoad)
          }
        }
      } catch (err) {
        console.log("Err", err)
      }
    }

    const handleAdScroll = () => {
      const insElements = Array.from(
        document.querySelectorAll("ins.manual-placed"),
      )
      const insWithoutIframe = insElements.filter(
        (ins) => !ins.querySelector("iframe"),
      )
      if (!hasScrolled && insWithoutIframe.length > 0) {
        //@ts-ignore
        if (window?.adsbygoogle) {
          setHasScrolled(true)

          insWithoutIframe.forEach((el) => {
            if (!el.querySelector("iframe")) {
              //@ts-ignore
              ;(window.adsbygoogle = window.adsbygoogle || []).push({})
            }
            window.removeEventListener("scroll", handleAdScroll)
          })
        }
      }
    }

    // Push ad after 8 seconds
    const timeoutId = setTimeout(handleAdLoad, 9000)

    // Push ad when scrolled
    window.addEventListener("scroll", handleAdScroll)

    return () => {
      clearTimeout(timeoutId)
      if (scriptElement) {
        scriptElement.removeEventListener("load", handleAdLoad)
      }
      window.removeEventListener("scroll", handleAdScroll)
    }
  }, [hasScrolled])

  React.useEffect(() => {
    setHasScrolled(false)
  }, [])

  React.useEffect(() => {
    const scriptElement = document.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}"]`,
    )
    const handleScriptLoad = () => {
      if (!scriptElement) {
        const script = document.createElement("script")
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.PUBLIC_ADSENSE_CLIENT_ID}`
        script.async = true
        script.crossOrigin = "anonymous"
        document.body.appendChild(script)
      }
    }

    const handleLoad = () => {
      clearTimeout(timeoutId)
      handleScriptLoad()
    }

    const handleScroll = () => {
      handleScriptLoad()

      // Remove event listener after script is loaded
      window.removeEventListener("scroll", handleScroll)
    }

    // Push ad after 8 seconds
    const timeoutId = setTimeout(handleLoad, 7000)

    // Push ad when scrolled
    window.addEventListener("scroll", handleScroll)

    // Clean up event listener on component unmount
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return <></>
}

export default AdsenseScript

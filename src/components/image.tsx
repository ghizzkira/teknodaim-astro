import * as React from "react"
import type { HTMLAttributes } from "astro/types"

type Props = HTMLAttributes<"img">

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string
  sizes?: string
  alt: string
  decoding?: "async" | "sync" | "auto"
  fetchpriority?: "high" | "low" | "auto"
  width: string
  height: string
  className: string
}

const addQueryParamToURL = ({
  url,
  height,
  width,
}: {
  url: string
  height: string
  width: string
}): string => {
  try {
    const urlObject = new URL(url)
    const searchParams = new URLSearchParams(urlObject.search)
    searchParams.set("h", height)
    searchParams.set("w", width)
    searchParams.set("f", "webp")
    const searchParamsString = searchParams.toString()
    const queryString = searchParamsString ? `&${searchParamsString}` : ""
    return `/_image?href=${encodeURIComponent(urlObject.href)}${queryString}`
  } catch (error) {
    console.error("URL tidak valid:", error)
    return ""
  }
}

const Image = (props: ImageProps) => {
  const {
    src,
    alt,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px",
    decoding,
    width,
    height,
    ...rest
  } = props

  const srcSet = `
    ${addQueryParamToURL({ url: src, width: "640", height })} 640w,
    ${addQueryParamToURL({ url: src, width: "750", height })} 750w,
    ${addQueryParamToURL({ url: src, width: "828", height })} 828w,
    ${addQueryParamToURL({ url: src, width: "1080", height })} 1080w,
    ${addQueryParamToURL({ url: src, width: "1200", height })} 1200w,
    ${addQueryParamToURL({ url: src, width: "1920", height })} 1920w,
    ${addQueryParamToURL({ url: src, width: "2048", height })} 2048w,
    ${addQueryParamToURL({ url: src, width: "3840", height })} 3840w
  `

  return (
    <img
      {...rest}
      sizes={sizes}
      srcSet={srcSet}
      alt={alt}
      decoding={decoding}
      width={width}
      height={height}
      src={addQueryParamToURL({ url: src, width, height })}
    />
  )
}

export default Image

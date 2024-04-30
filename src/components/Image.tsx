import * as React from "react"

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
    return import.meta.env.APP_ENV !== "depelopment"
      ? `/cdn-cgi/image/width=300,height=699,format=webp/${urlObject.href}${queryString}`
      : url
  } catch (error) {
    console.error("URL tidak valid:", error)
    return url
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

  return (
    <img
      {...rest}
      alt={alt}
      decoding={decoding}
      width={width}
      height={height}
      src={addQueryParamToURL({ url: src, width, height })}
    />
  )
}

export default Image

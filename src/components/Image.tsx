import * as React from "react"

interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string
  sizes?: string
  alt: string
  decoding?: "async" | "sync" | "auto"
  fetchpriority?: "high" | "low" | "auto"
  width: string
  height: string
  className?: string
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
    const transformUrl = `/_image?href=${encodeURI(urlObject.href)}&w=${width}&h=${height}&f=webp`
    return import.meta.env.DEV ? url : transformUrl
  } catch (error) {
    console.error("URL tidak valid:", error)
    return url
  }
}

const Image = (props: ImageProps) => {
  const { src, alt, decoding, width, height, ...rest } = props

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

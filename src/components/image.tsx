import * as React from "react"
import type { HTMLAttributes } from "astro/types"

type Props = HTMLAttributes<"img">

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string
  sizes?: string
  alt: string
  srcSet?: string
  decoding?: "async" | "sync" | "auto"
  fetchpriority?: "high" | "low" | "auto"
}
const Image = (props: ImageProps) => {
  const {
    src,
    alt,
    srcSet,
    sizes = `(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px`,
    decoding,

    ...rest
  } = props

  return (
    <img
      src={`${src}?width=640`}
      srcSet={srcSet}
      alt={alt}
      sizes={sizes}
      {...rest}
    />
  )
}

export default Image

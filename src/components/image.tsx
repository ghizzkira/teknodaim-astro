import * as React from "react"

interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src: string
  sizes?: string
}
const Image = (props: ImageProps) => {
  const {
    src,
    sizes = `(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px`,
    ...rest
  } = props

  return <img src={`${src}?width=640`} sizes={sizes} {...rest} />
}

export default Image

import * as React from "react"

interface YoutubeEmbedAutoPlayProps
  extends React.HTMLAttributes<HTMLIFrameElement> {
  title: string
  src: string
  className?: string
  height?: string
  width?: string
  image: string
  type?: "video" | "shorts"
}

const YoutubeEmbedAutoPlay: React.FunctionComponent<
  YoutubeEmbedAutoPlayProps
> = (props) => {
  const {
    title,
    src,
    className,
    type = "video",
    height = "315",
    width = "560",
  } = props

  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)
  const observerRef = React.useRef<IntersectionObserver | null>(null)

  React.useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const iframe = iframeRef.current
        if (iframe) {
          if (entry.isIntersecting) {
            iframe.contentWindow?.postMessage(
              JSON.stringify({ event: "command", func: "playVideo" }),
              "*",
            )
          } else {
            iframe.contentWindow?.postMessage(
              JSON.stringify({ event: "command", func: "pauseVideo" }),
              "*",
            )
          }
        }
      })
    })

    const iframe = iframeRef.current
    if (iframe) {
      observerRef.current.observe(iframe)
    }

    return () => {
      if (iframe) {
        observerRef.current?.unobserve(iframe)
      }
    }
  }, [])

  return (
    <div className={className}>
      <iframe
        ref={iframeRef}
        title={title}
        width={width}
        height={height}
        className="block h-full w-full"
        allow="autoplay; encrypted-media"
        allowFullScreen
        src={`https://www.youtube.com/embed/${src}?${
          type === "video" && "autoplay=1&"
        }mute=1&enablejsapi=1`}
      ></iframe>
    </div>
  )
}

export default YoutubeEmbedAutoPlay

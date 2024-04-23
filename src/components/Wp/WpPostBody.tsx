import * as React from "react"

interface WpPostBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const WpPostBody: React.FunctionComponent<WpPostBodyProps> = (props) => {
  const { children, className } = props

  const postRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const post: HTMLDivElement | null = postRef.current

    if (post) {
      const toc = post.querySelector(".ez-toc-title-container")
      if (toc) {
        const clickHandler = () => {
          toc.classList.toggle("open-list")
        }
        toc.addEventListener("click", clickHandler)

        return () => {
          toc.removeEventListener("click", clickHandler)
        }
      }
    }
  }, [])

  return (
    <section className={className} ref={postRef}>
      {children}
    </section>
  )
}

export default WpPostBody

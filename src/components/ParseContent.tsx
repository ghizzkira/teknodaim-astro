import * as React from "react"
import { Parser, ProcessNodeDefinitions } from "html-to-react"

// import FacebookEmbedWrapper from "@/components/Embed/FacebookEmbed"
// import TwitterEmbed, {
//   TwitterEmbedFromTipTap,
// } from "@/components/Embed/TwitterEmbed"
// import YoutubeEmbed from "@/components/Embed/YoutubeEmbed"
import { Button } from "@/components/UI/Button"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"
import Link from "./Link"

const htmlToReactParser = Parser()

const processNodeDefinitions = ProcessNodeDefinitions()

interface Node {
  name?: string
  attribs?: {
    href?: string
    src?: string
    className?: string
    title?: string
    class?: string
    width?: string
    height?: string
    tweeturl?: string
    facebookurl?: string
    variant?: "link" | "default" | "danger" | "outline" | "secondary" | "ghost"
    [x: string]: unknown
  }
}

interface ParseContentProps {
  htmlInput: string
  title: string
  locale: LanguageType
}

const ParseContent: React.FunctionComponent<ParseContentProps> = (props) => {
  const { htmlInput, title, locale } = props

  const processingInstructions = [
    {
      shouldProcessNode: function (node: Node) {
        return node.name && node.name === "a"
      },
      processNode: function (
        node: Node,
        children: React.ReactNode[],
        index: number,
      ) {
        const regexId = new RegExp(import.meta.env?.PUBLIC_WP_DOMAIN ?? "")
        const regexEn = new RegExp(
          import.meta.env?.PUBLIC_WP_EN_SUBDOMAIN ?? "",
        )
        return (
          <Link
            locale={locale}
            href={
              node.attribs?.href
                ?.replace(regexId, import.meta.env?.PUBLIC_DOMAIN ?? "")
                ?.replace(
                  regexEn,
                  import.meta.env?.PUBLIC_EN_SUBDOMAIN ?? "",
                ) ?? "#"
            }
            key={index + title + "a"}
          >
            {children}
          </Link>
        )
      },
    },
    {
      shouldProcessNode: function (node: Node) {
        return node.name && node.name === "img"
      },
      processNode: function (node: Node, index: number) {
        const str = node.attribs?.style as unknown as string | undefined
        const regex = /width: (\d+px);|width:(\d+px);/
        const match = str?.match(regex)

        if (node?.attribs?.height && node?.attribs?.width) {
          return (
            <span className="relative block w-full" key={index + title + "img"}>
              <img
                className={cn(
                  node.attribs?.class,
                  match?.[1] ? `!w-[${match[1]}]` : "!w-full",
                )}
                src={node.attribs?.src ?? ""}
                alt={title}
                style={match?.[1] ? { width: `${match[1]}` } : undefined}
                width={
                  node.attribs?.width ? parseInt(node.attribs?.width) : 300
                }
                height={
                  node.attribs?.height ? parseInt(node.attribs?.height) : 300
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 600px"
              />
            </span>
          )
        }
        return (
          <span className="relative block w-full" key={index + title + "img"}>
            <img
              className={cn(node.attribs?.class, "!w-full")}
              src={node.attribs?.src ?? ""}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
            />
          </span>
        )
      },
    },
    // {
    //   shouldProcessNode: function (node: Node) {
    //     return node.name && node.name === "iframe"
    //   },
    //   processNode: function (node: Node, index: number) {
    //     if (node.attribs) {
    //       node.attribs.style = undefined
    //     }
    //     if (node.attribs?.src?.includes("youtube.com/embed")) {
    //       const arr = node.attribs?.src?.split(
    //         /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
    //       )

    //       return (
    //         <YoutubeEmbed
    //           key={index + title + "iframe"}
    //           title={node.attribs?.title ?? title}
    //           id={arr[3] ?? arr[0]!}
    //           wrapperClass="yt-lite"
    //         />
    //       )
    //     }
    //     return (
    //       <iframe
    //         key={index + title + "iframe"}
    //         title={title}
    //         {...node.attribs}
    //       />
    //     )
    //   },
    // },

    // {
    //   shouldProcessNode: function (node: Node) {
    //     return node.name && node.name === "react-x-twitter"
    //   },
    //   processNode: function (node: Node) {
    //     return <TwitterEmbedFromTipTap tweetUrl={node.attribs?.tweeturl!} />
    //   },
    // },
    // {
    //   shouldProcessNode: function (node: Node) {
    //     return node.name && node.name === "react-facebook"
    //   },
    //   processNode: function (node: Node) {
    //     return (
    //       <FacebookEmbedWrapper
    //         placeholderDisabled
    //         url={node.attribs?.facebookurl!}
    //       />
    //     )
    //   },
    // },
    {
      shouldProcessNode: function (node: Node) {
        return node.name && node.name === "react-button"
      },
      processNode: function (node: Node, children: React.ReactNode[]) {
        return (
          <Button type="button" variant={node.attribs?.variant!}>
            {children}
          </Button>
        )
      },
    },
    // {
    //   shouldProcessNode: function (node: Node) {
    //     return node.name && node.name === "blockquote"
    //   },
    //   processNode: function (
    //     node: Node,
    //     children: React.ReactNode[],
    //     index: number,
    //   ) {
    //     if (node.attribs) {
    //       node.attribs.style = undefined
    //     }
    //     if (node.attribs?.class?.includes("twitter-tweet")) {
    //       return (
    //         <TwitterEmbed key={index + title + "blockquote"}>
    //           {children}
    //         </TwitterEmbed>
    //       )
    //     }

    //     return (
    //       <blockquote
    //         style={{ width: "auto", margin: "auto" }}
    //         key={index + title + "blockquote"}
    //         className={node.attribs?.class}
    //       >
    //         {children}
    //       </blockquote>
    //     )
    //   },
    // },
    // // {
    //   shouldProcessNode: function (node: Node) {
    //     return node.name && node.name === "script"
    //   },
    //   processNode: function (node: Node, index: number) {
    //     if (node.attribs) {
    //       node.attribs.style = undefined
    //     }
    //     return <Script key={index + title + "script"} {...node.attribs} />
    //   },
    // },
    {
      shouldProcessNode: function () {
        return true
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ]
  const results = htmlToReactParser.parseWithInstructions(
    htmlInput,
    () => true,
    processingInstructions,
  )
  return results
}

export default ParseContent

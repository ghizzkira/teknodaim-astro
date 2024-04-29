import * as React from "react"

import Link from "@/components/Link"

import "@/lib/internationalization/route"

import type { LanguageType } from "@/lib/validation/language"

interface WpPostCardSideProps {
  isWP?: boolean
  src: string
  alt: string
  title: string
  uri: string
  locale: LanguageType
}

const WpPostCardSide: React.FunctionComponent<WpPostCardSideProps> = React.memo(
  (props) => {
    const { src, alt, uri, title, locale } = props

    return (
      <Link
        locale={locale}
        aria-label={`Go To ${title} Page`}
        role="link"
        href={uri}
      >
        <article className="mb-4 flex w-full border-separate flex-col rounded-lg">
          <div className="relative flex max-w-xs flex-col space-y-3 md:max-w-3xl md:flex-row md:space-x-4 md:space-y-0">
            <div className="relative aspect-[1/1] h-[75px] w-auto max-w-[unset] overflow-hidden rounded-md">
              <img
                src={src}
                alt={`Image ${alt}`}
                className="!h-full !w-full object-cover"
                sizes="(max-width: 768px) 50px, 100px"
              />
            </div>

            <div className="flex w-full flex-col space-y-2 md:w-2/3">
              <h3 className="line-clamp-3 text-sm leading-5 hover:text-primary">
                {title}
              </h3>
            </div>
          </div>
        </article>
      </Link>
    )
  },
)

export default WpPostCardSide

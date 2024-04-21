import * as React from "react"

import Image from "@/components/image"
import type { SelectDownload as DownloadProps } from "@/lib/db/schema/download"
import type { SelectMedia as MediaProps } from "@/lib/db/schema/media"
import type { LanguageType } from "@/lib/validation/language"

type DownloadDataProps = Pick<DownloadProps, "title" | "slug"> & {
  featured_image: Pick<MediaProps, "url">
}

interface DownloadCardSearchProps {
  locale: LanguageType
  download: DownloadDataProps
}

const DownloadCardSearch: React.FunctionComponent<DownloadCardSearchProps> = (
  props,
) => {
  const { locale, download } = props

  const { title, slug, featured_image } = download

  return (
    <NextLink
      aria-label={title}
      href={
        locale === "id"
          ? `${env.NEXT_PUBLIC_SITE_URL}/download/${slug}`
          : `${env.NEXT_PUBLIC_EN_SITE_URL}/download/${slug}`
      }
      className="mb-2 w-full"
    >
      <div className="flex flex-row hover:bg-accent">
        <div className="relative aspect-[1/1] h-[50px] w-auto max-w-[unset] overflow-hidden rounded-md">
          <Image
            src={featured_image.url}
            className="object-cover"
            alt={title}
          />
        </div>
        <div className="ml-2 w-3/4">
          <h3 className="mb-2 text-lg font-medium">{title}</h3>
        </div>
      </div>
    </NextLink>
  )
}

export default DownloadCardSearch

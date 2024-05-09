import * as React from "react"
import type {
  SelectDownloadFile as DownloadFileProps,
  SelectDownload as DownloadProps,
  SelectMedia as MediaProps,
} from "@/lib/db/schema"

import Image from "@/components/Image"
import Link from "@/components/Link"
import { Button } from "@/components/UI/Button"
import { Icon } from "@/components/UI/Icon"
import { cn } from "@/lib/utils/style"
import type { LanguageType } from "@/lib/validation/language"

function getIconOperatingSystem(operatingSystem: string) {
  switch (operatingSystem) {
    case "Windows":
      return <Icon.Windows aria-label="Windows" />
    case "macOS":
      return <Icon.Apple aria-label="macOS" />
    case "Linux":
      return <Icon.Linux aria-label="Linux" />
    case "Android":
      return <Icon.Android aria-label="Android" />
    case "iOS":
      return <Icon.AppleAlt aria-label="iOS" />
    case "Xbox One":
      return <Icon.Xbox aria-label="Xbox One" />
    case "PlayStation 4":
      return <Icon.PlayStation aria-label="PlayStation 4" />
    case "Nintendo Switch":
      return <Icon.NintendoSwitch aria-label="Nintendo Switch" />
    default:
      return <Icon.Windows aria-label="Windows" />
  }
}

interface DownloadCardProps extends React.HTMLAttributes<HTMLDivElement> {
  download: Partial<DownloadProps> & {
    featuredImage?: Pick<MediaProps, "url">
    downloadFiles?: Partial<DownloadFileProps>[]
  }
  className?: string
  locale: LanguageType
}

const DownloadCard: React.FunctionComponent<DownloadCardProps> = (props) => {
  const { download, className, locale } = props

  const { operatingSystem, slug, title, type, featuredImage, downloadFiles } =
    download

  const icon = getIconOperatingSystem(operatingSystem!)

  return (
    <div
      key={slug}
      className={cn(
        "inline-block flex-col overflow-hidden rounded-lg shadow-lg",
        className,
      )}
    >
      <div className="relative">
        <Link
          locale={locale}
          aria-label={title}
          href={`/download/${type}/${slug}`}
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={featuredImage?.url!}
              className="object-cover"
              alt={title!}
              width={"50"}
              height={"50"}
            />
          </div>
        </Link>
        <Button
          size={null}
          variant="outline"
          aria-label="Operating System"
          className="absolute right-[5px] top-[5px] h-10 w-10 rounded-full bg-background p-[1px]"
        >
          {icon}
        </Button>
      </div>
      <Link
        locale={locale}
        aria-label={title}
        href={`/download/${type}/${slug}`}
      >
        <h3 className="mt-3 line-clamp-4 whitespace-normal px-3 text-base">
          {title}
        </h3>
      </Link>
      <div className="mb-3 mt-6 flex justify-between px-3">
        {downloadFiles && (
          <>
            <p className="inline-block whitespace-normal">
              {downloadFiles[0]?.price}
            </p>
            <p className="text-[14px]">{downloadFiles[0]?.fileSize}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default DownloadCard

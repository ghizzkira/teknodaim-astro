import * as React from "react"
import NextLink from "next/link"
import type {
  DownloadFile as DownloadFileProps,
  Download as DownloadProps,
  Media as MediaProps,
} from "@prisma/client"

import Image from "@/components/image"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils/style"

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
    featured_image: Pick<MediaProps, "url">
    download_files?: Partial<DownloadFileProps>[]
  }
  className?: string
}

const DownloadCard: React.FunctionComponent<DownloadCardProps> = (props) => {
  const { download, className } = props

  const {
    operating_system,
    slug,
    title,
    type,
    featured_image,
    download_files,
  } = download

  const icon = getIconOperatingSystem(operating_system!)

  return (
    <div
      key={slug}
      className={cn(
        "inline-block flex-col overflow-hidden rounded-lg shadow-lg",
        className,
      )}
    >
      <div className="relative">
        <NextLink aria-label={title} href={`/download/${type}/${slug}`}>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={featured_image?.url!}
              className="object-cover"
              alt={title!}
            />
          </div>
        </NextLink>
        <Button
          size={null}
          variant="outline"
          aria-label="Operating System"
          className="absolute right-[5px] top-[5px] h-10 w-10 rounded-full bg-background p-[1px]"
        >
          {icon}
        </Button>
      </div>
      <NextLink aria-label={title} href={`/download/${type}/${slug}`}>
        <h3 className="mt-3 line-clamp-4 whitespace-normal px-3 text-base">
          {title}
        </h3>
      </NextLink>
      <div className="mb-3 mt-6 flex justify-between px-3">
        {download_files && (
          <>
            <p className="inline-block whitespace-normal">
              {download_files[0]?.price}
            </p>
            <p className="text-[14px]">{download_files[0]?.file_size}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default DownloadCard

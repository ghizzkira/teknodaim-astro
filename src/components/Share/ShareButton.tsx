import * as React from "react"

import { Button, type ButtonVariantProps } from "@/components/UI/Button"
import { cn } from "@/lib/utils/style"

import { Button, type ButtonVariantProps } from "@/components/UI/Button"
import { cn } from "@/lib/utils/style"

export interface ShareButtonProps {
  url: string
  variant?: ButtonVariantProps["variant"]
  onClick?: () => void
  className?: string
  text?: string
  icon?: string | React.ReactElement
  subject?: string | null
  message?: string | null
  sharetext?: string | null
  mediaSrc?: string | null
  baseUrl?: string | null
  caption?: string | null
  title?: string
}

export const ShareButton: React.FunctionComponent<ShareButtonProps> = (
  props,
) => {
  const { onClick, text, icon, className, url, title, variant } = props
  return (
    <Button
      aria-label={title}
      size="icon"
      variant={variant}
      className={cn(
        className,
        "col-span-1 mx-auto mb-0 h-10 w-full flex-[unset] rounded-lg",
      )}
      asChild
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        title={text}
        href={url}
        className={cn(
          "group flex items-center px-3 py-2 text-base font-normal",
        )}
      >
        {icon}
      </a>
    </Button>
  )
}

import * as React from "react"

import { cn } from "@/lib/utils/style"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils/style"
import { type VariantProps, cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        success:
          "bg-success hover:bg-success/80 border-transparent text-success-foreground",
        info: "bg-info hover:bg-info/80 border-transparent text-info-foreground",
        warning:
          "bg-warning hover:bg-warning/80 border-transparent text-warning-foreground",
        danger:
          "bg-danger hover:bg-danger/80 border-transparent text-danger-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (props, ref) => {
    const { className, variant, ...rest } = props

    return (
      <div
        className={cn(badgeVariants({ variant }), className)}
        {...rest}
        ref={ref}
      />
    )
  },
)

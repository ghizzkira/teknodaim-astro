import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/style"
import { Button, buttonVariants } from "./button"
import { Icon } from "./icon"

interface ModalProps extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode
  id: string
}

export const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  (props, ref) => {
    const { children, className, id, ...rest } = props

    return (
      <dialog
        id={id}
        className={cn(
          "rounded-md bg-background p-3 text-left shadow-lg animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-h-[90vh] sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </dialog>
    )
  },
)

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onClose: () => void
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (props, ref) => {
    const { children, className, onClose, ...rest } = props

    return (
      <div className={cn(className)} ref={ref} {...rest}>
        <div className="flex w-full">
          <div
            onClick={onClose}
            className="ml-auto h-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <Icon.Close className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </div>
        </div>
        <div className="pointer-events-auto">{children}</div>
      </div>
    )
  },
)

interface ModalTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  onOpen: () => void
}

export const ModalTrigger = React.forwardRef<
  HTMLButtonElement,
  ModalTriggerProps
>((props, ref) => {
  const { className, children, onOpen, ...rest } = props

  return (
    <Button
      onClick={onOpen}
      className={cn("list-none", className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Button>
  )
})

export const ModalHeader = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...rest}
    />
  )
}

export const ModalFooter = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between space-x-2 py-3",
        className,
      )}
      {...rest}
    />
  )
}

export const ModalTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => {
  const { className, ...rest } = props

  return (
    <h1
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className,
      )}
      {...rest}
    />
  )
}

export const ModalDescription = (
  props: React.HTMLAttributes<HTMLParagraphElement>,
) => {
  const { className, ...rest } = props

  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...rest} />
  )
}

type ModalActionProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const ModalAction: React.FunctionComponent<ModalActionProps> = (
  props,
) => {
  const { className, variant, children, ...rest } = props
  return (
    <Button variant={variant} className={cn(className)} {...rest}>
      {children}
    </Button>
  )
}

type ModalCancelProps = React.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const ModalCancel: React.FunctionComponent<ModalCancelProps> = (
  props,
) => {
  const { className, children, ...rest } = props

  return (
    <Button
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}
export const handleOpenModal = (id: string) => {
  const modalEl = document.getElementById(id) as HTMLDialogElement
  if (!modalEl?.open) modalEl?.showModal()
}

export const handleCloseModal = (id: string) => {
  const modalEl = document.getElementById(id) as HTMLDialogElement
  if (modalEl?.open) modalEl?.close()
}

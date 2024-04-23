import * as React from "react"

import { Skeleton } from "@/components/UI/Skeleton"

interface PlaceholderContainerProps {
  children: React.ReactNode
}

const PlaceholderContainer: React.FunctionComponent<
  PlaceholderContainerProps
> = (props) => {
  const { children } = props

  return (
    <div>
      <div className="fixed left-auto top-0 z-[49] -my-0 mx-auto box-border flex h-16 w-full items-center border-none bg-background px-2 py-0 align-baseline shadow-lg outline-none">
        <div className="relative ml-auto mr-auto grow px-3">
          <div className="h-full">
            <div className="-ml-4 -mr-4 flex h-full flex-row flex-nowrap items-center">
              <div className="flex w-[250px] items-center">
                <Skeleton className="h-[30px] w-[30px]" />
                <div className="flex w-full flex-row flex-wrap items-center justify-start pl-2 pr-0">
                  <Skeleton className="h-[20px] w-[120px]" />
                </div>
              </div>
              <div className="relative max-md:ml-auto md:ml-4 md:mr-auto lg:w-[40%] xl:w-[50%]">
                <Skeleton className="h-[30px] w-full" />
              </div>
              <div className="grow-1 flex flex-row space-x-2">
                <div className="hidden space-x-2 lg:block"></div>
                <div className="flex space-x-2">
                  <Skeleton className="h-[35px] w-[35px]" />
                </div>
                <div>
                  <Skeleton className="h-[35px] w-[35px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="scrollbar fixed top-0 z-20 flex h-full w-[250px] flex-row overflow-x-auto border border-r bg-background pt-20 transition-[transform] delay-150 ease-in-out max-md:-translate-x-full max-md:opacity-0 md:translate-x-0 md:opacity-100">
          <nav className="relative flex w-full flex-col">
            <Skeleton className="ml-2 h-[35px] w-[140px]" />
            <div className="flex flex-col space-y-3 border-b border-muted p-4">
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
            </div>
            <div className="flex flex-col space-y-3 border-b border-border p-4">
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
            </div>
          </nav>
        </div>
      </div>
      <div
        id="container"
        className={`fade-up-element mt-20 flex w-full delay-150 ease-in-out md:pl-[250px]`}
      >
        {children}
      </div>
      <div
        className={`relative mt-12 flex flex-col border border-t border-border bg-background/70 md:pl-[250px]`}
      >
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="flex flex-col md:flex-row lg:px-8">
            <div className="mb-6 w-5/12 md:mb-0 lg:mr-3">
              <Skeleton className="h-[20px] w-[120px]" />
              <div className="mt-8 flex flex-col space-y-2 font-medium text-foreground/80">
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-full" />
                <Skeleton className="h-[20px] w-full" />
              </div>
            </div>
            <div className="w-7/12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-6">
                <div>
                  <ul className="space-y-2 font-medium text-foreground/80">
                    <Skeleton className="h-[20px] w-[70px]" />
                    <Skeleton className="h-[20px] w-[70px]" />
                    <Skeleton className="h-[20px] w-[70px]" />
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 font-medium text-foreground/80">
                    <Skeleton className="h-[20px] w-[70px]" />
                    <Skeleton className="h-[20px] w-[70px]" />
                    <Skeleton className="h-[20px] w-[70px]" />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-h-[60px] border border-t border-border">
          <Skeleton className="h-[20px] w-[70px]" />
        </div>
      </div>
    </div>
  )
}

export default PlaceholderContainer

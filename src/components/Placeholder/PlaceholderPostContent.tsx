import PlaceholderPostCardSide from "./PlaceholderPostCardSide"
import { Skeleton } from "@/components/UI/Skeleton"

import PlaceholderPostCardSide from "./PlaceholderPostCardSide"
import { Skeleton } from "@/components/UI/Skeleton"

const PlaceholderPostContent: React.FunctionComponent = () => {
  return (
    <div className="mx-auto mt-5 flex w-full pt-5 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="w-full lg:w-8/12">
        <div className="article-divider px-4">
          <div className="flex space-x-2">
            <Skeleton className="h-[20px] w-[45px] rounded-full" />
            <Skeleton className="h-[20px] w-[45px] rounded-full" />
          </div>
          <Skeleton className="mb-[10px] mt-4 h-[35px] w-full rounded" />
          <div className="mb-2">
            <div className="flex-column flex">
              <div className="my-2 flex flex-row items-center gap-2">
                <div className="flex flex-row items-center">
                  <Skeleton className="relative mr-[15px] h-[40px] w-[40px] rounded-full" />
                  <div className="flex flex-col">
                    <Skeleton className="mb-2 h-[14px] w-[100px] rounded" />
                    <Skeleton className="h-[10px] w-[80px] rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-[25px] w-full space-y-1">
            <Skeleton className="h-[15px] w-full" />
            <Skeleton className="h-[15px] w-full" />
            <Skeleton className="h-[15px] w-full" />
          </div>
          <Skeleton className="aspect-video h-auto w-full rounded" />
          <div className="mt-[10px] flex flex-col">
            <div className="mb-4 grid w-full grid-flow-col grid-rows-1 space-x-2">
              <Skeleton className="h-[35px] rounded" />
              <Skeleton className="h-[35px] rounded" />
              <Skeleton className="h-[35px] rounded" />
              <Skeleton className="h-[35px] rounded" />
            </div>
            <div className="w-full">
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
              <Skeleton className="mb-1 h-[35px] w-full" />
            </div>
          </div>
          <section className="my-6 flex space-x-3">
            <Skeleton className="h-[20px] w-[45px] rounded-full" />
            <Skeleton className="h-[20px] w-[45px] rounded-full" />
          </section>
          <div className="mb-4 grid w-full grid-flow-col grid-rows-1 space-x-2">
            <Skeleton className="h-[35px] rounded" />
            <Skeleton className="h-[35px] rounded" />
            <Skeleton className="h-[35px] rounded" />
            <Skeleton className="h-[35px] rounded" />
          </div>

          <section className="mb-20">
            <div className="mb-2">
              <Skeleton className="h-[25px] w-[80px]" />
            </div>
            <div className="grid grid-cols-[repeat(1,1fr)] gap-4 md:grid-cols-2">
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
              <Skeleton className="h-[20px] w-[70px]" />
            </div>
          </section>
        </div>
      </div>
      <aside className="hidden w-4/12 px-4 lg:block">
        <div className="sticky top-4 rounded-xl border border-border p-4">
          <div className="relative mb-4" />
          <div>
            <PlaceholderPostCardSide />
            <PlaceholderPostCardSide />
            <PlaceholderPostCardSide />
            <PlaceholderPostCardSide />
            <PlaceholderPostCardSide />
          </div>
        </div>
      </aside>
    </div>
  )
}

export default PlaceholderPostContent

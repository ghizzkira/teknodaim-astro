import PlaceholderPostCard from "./PlaceholderPostCard"
import { Skeleton } from "@/components/UI/Skeleton"

import PlaceholderPostCard from "./PlaceholderPostCard"
import { Skeleton } from "@/components/UI/Skeleton"

const PlaceholderAuthorPage: React.FunctionComponent = () => {
  return (
    <div className="mx-auto mt-5 flex w-full pt-5 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="order-2 flex w-full flex-col px-4 lg:order-1 lg:w-8/12">
        <div className="mb-10 flex w-full flex-col px-4">
          <div className="w-full space-y-1 text-center md:text-left">
            <Skeleton className="h-[19px] w-full max-w-[200px]" />
            <Skeleton className="h-[16px] w-full" />
            <Skeleton className="h-[16px] w-full" />
            <Skeleton className="h-[16px] w-full" />
            <Skeleton className="h-[16px] w-full" />
          </div>
        </div>
        {/* ListPosts */}
        <div className="px-4">
          <PlaceholderPostCard />
          <PlaceholderPostCard />
          <PlaceholderPostCard />
          <PlaceholderPostCard />
        </div>
      </div>
      <aside className="order-1 mb-[30px] w-full px-4 lg:order-2 lg:block lg:w-4/12">
        <div className="">
          <div className="">
            <div className="mb-[30px] flex flex-col items-center">
              <Skeleton className="relative h-32 w-32 overflow-hidden rounded-full" />
              <Skeleton className="h-[19px] w-[100px]" />
            </div>
            <div className="flex flex-col space-y-[30px]">
              <div>
                <Skeleton className="mb-[10px] h-[20px] w-[100px]" />
                <Skeleton className="h-[16px] w-[120px]" />
              </div>
              <div>
                <Skeleton className="mb-[10px] h-[20px] w-[100px]" />
                <Skeleton className="mb-2 h-[16px] w-[120px]" />
                <Skeleton className="mb-2 h-[16px] w-[120px]" />
              </div>
              <div>
                <Skeleton className="mb-[10px] h-[20px] w-[100px]" />
                <Skeleton className="mb-2 h-[16px] w-[120px]" />
                <Skeleton className="mb-2 h-[16px] w-[120px]" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default PlaceholderAuthorPage

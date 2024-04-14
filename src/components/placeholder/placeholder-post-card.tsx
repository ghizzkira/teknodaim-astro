import { Skeleton } from "@/components/ui/skeleton"

const PlaceholderPostCard: React.FunctionComponent = () => {
  return (
    <div className="mb-[30px] flex grow border-separate flex-row rounded-lg lg:flex-col">
      <div className="relative flex w-full flex-row justify-between lg:justify-start">
        <div className="order-2 md:order-1">
          <Skeleton className="relative aspect-[4/3] h-auto w-[125px] md:w-[220px] lg:w-[270px]" />
        </div>
        <div className="order-1 mr-3 flex w-[calc(100%-125px)] flex-col md:order-2 md:ml-[30px] md:mr-[unset] md:w-[calc(100%-220px)] lg:w-[calc(100%-270px)]">
          <Skeleton className="mb-4 h-[40px] w-full" />
          <Skeleton className="mb-2 h-[20px] w-full" />
          <Skeleton className="mb-2 h-[20px] w-full" />
        </div>
      </div>
    </div>
  )
}

export default PlaceholderPostCard

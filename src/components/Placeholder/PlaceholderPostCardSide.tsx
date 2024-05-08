import { Skeleton } from "@/components/UI/Skeleton"

const PlaceholderPostCardSide: React.FunctionComponent = () => {
  return (
    <div className="mb-4 flex w-full border-separate flex-col rounded-lg">
      <div className="relative flex max-w-xs flex-col space-y-3 md:max-w-3xl md:flex-row md:space-x-4 md:space-y-0">
        <Skeleton className="aspect-[1/1] h-[75px] w-auto max-w-[unset] rounded-md" />
        <div className="flex w-full flex-col space-y-2 md:w-2/3">
          <Skeleton className="mb-1 h-[20px] w-full" />
          <Skeleton className="mb-1 h-[20px] w-full" />
        </div>
      </div>
    </div>
  )
}

export default PlaceholderPostCardSide

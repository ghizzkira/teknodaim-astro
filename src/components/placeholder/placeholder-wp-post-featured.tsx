import { Skeleton } from "@/components/ui/skeleton"

const PlaceholderWPPostFeatured: React.FunctionComponent = () => {
  return (
    <div className="whitspace-normal relative h-full w-full">
      <div className="h-full w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}

export default PlaceholderWPPostFeatured

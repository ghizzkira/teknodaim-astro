import { Skeleton } from "@/components/UI/Skeleton"

import { Skeleton } from "@/components/UI/Skeleton"

const PlaceholderDashboardTable: React.FunctionComponent = () => {
  return (
    <div className="w-full px-4 pt-10">
      <div className="flex justify-between space-x-3">
        <div className="w-2/12">
          <Skeleton className="mb-2 h-6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="w-2/12">
          <Skeleton className="mb-2 h-6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="w-2/12">
          <Skeleton className="mb-2 h-6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="w-2/12">
          <Skeleton className="mb-2 h-6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="w-2/12">
          <Skeleton className="mb-2 h-6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="w-2/12">
          <Skeleton className="mb-2 h-6" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  )
}

export default PlaceholderDashboardTable

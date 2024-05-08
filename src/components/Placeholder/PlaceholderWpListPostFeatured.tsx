import PlaceholderWPPostFeatured from "./PlaceholderWpPostFeatured"

import PlaceholderWPPostFeatured from "./PlaceholderWpPostFeatured"

const PlaceholderWPListPostFeatured: React.FunctionComponent = () => {
  return (
    <div className="grid h-[600px] w-full lg:h-[400px] lg:grid-cols-4 lg:grid-rows-2">
      <div className="col-span-2 row-span-2 mb-[10px] lg:mb-0 lg:mr-[10px]">
        <div className="h-full w-full">
          <PlaceholderWPPostFeatured />
        </div>
      </div>
      <div className="col-span-2 row-span-2 grid grid-cols-2 grid-rows-2">
        <div className="col-span-1 row-span-2 mr-[10px]">
          <div className="h-full w-full">
            <PlaceholderWPPostFeatured />
          </div>
        </div>
        <div className="col-span-1 row-span-2 grid grid-cols-1 grid-rows-2">
          <div className="col-span-1 row-span-1 mb-[10px]">
            <div className="h-full w-full">
              <PlaceholderWPPostFeatured />
            </div>
          </div>
          <div className="col-span-1 row-span-1">
            <div className="h-full w-full">
              <PlaceholderWPPostFeatured />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderWPListPostFeatured

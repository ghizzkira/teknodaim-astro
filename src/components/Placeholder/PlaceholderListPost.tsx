import PlaceholderPostCard from "./PlaceholderPostCard"
import PlaceholderPostCardSide from "./PlaceholderPostCardSide"

const PlaceholderListPost: React.FunctionComponent = () => {
  return (
    <div className="mx-auto mt-5 flex w-full pt-5 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
      <div className="w-full lg:w-8/12">
        <div className="px-4">
          <PlaceholderPostCard />
          <PlaceholderPostCard />
          <PlaceholderPostCard />
          <PlaceholderPostCard />
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

export default PlaceholderListPost

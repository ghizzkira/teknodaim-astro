import PlaceholderPostCard from "./placeholder-post-card"
import PlaceholderPostCardSide from "./placeholder-post-card-side"
import PlaceholderWPListPostFeatured from "./placeholder-wp-list-post-featured"

const PlaceholderHome: React.FunctionComponent = () => {
  return (
    <section className="mt-5 flex w-full flex-col pt-5">
      <div className="mx-auto mb-5 flex w-full flex-col px-4 md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="mb-[30px]">
          <PlaceholderWPListPostFeatured />
        </div>
      </div>
      <div className="mx-auto flex w-full flex-row md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px]">
        <div className="flex w-full flex-col px-4 lg:w-8/12">
          <div>
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
    </section>
  )
}

export default PlaceholderHome

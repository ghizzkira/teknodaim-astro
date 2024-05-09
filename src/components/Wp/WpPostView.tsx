import * as React from "react"

// import { Icon } from "@/components/UI/Icon"

// import { api } from "@/lib/trpc/react"

interface WPPostViewProps extends React.HTMLAttributes<HTMLDivElement> {
  post_slug: string
}

const WpPostView: React.FunctionComponent<WPPostViewProps> = () => {
  // TODO :  create connent to api
  // const { post_slug, className } = props
  // const { data } = api.wpPopularPost.bySlug.useQuery(post_slug)

  return (
    <>
      {/* {data && data?.views > 99 && (
        <div className={className}>
          <Icon.Visibility
            aria-label="View"
            className="h-3 w-3 text-foreground/80"
          />
          <span className="pl-[5px] text-[13px] text-foreground/80">
            {data?.views}
          </span>
        </div>
      )} */}
    </>
  )
}

export default WpPostView

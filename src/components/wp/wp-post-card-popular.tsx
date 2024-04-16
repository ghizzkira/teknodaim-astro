// import * as React from "react"

// import Image from "@/components/image"
// import ShareButtonPopular from "@/components/share/share-button-popular"
// import { Icon } from "@/components/ui/icon"
// import env from "@/env"
// import type { LanguageType } from "@/lib/validation/language"

// const DateWrapper = dynamic(
//   async () => {
//     const DateWrapper = await import("@/components/date-wrapper")
//     return DateWrapper.default
//   },
//   {
//     ssr: false,
//     loading: () => (
//       <span className="inline-block h-4 w-8 animate-pulse rounded-md bg-muted" />
//     ),
//   },
// )

// interface WpPostCardPopularProps {
//   title: string
//   slug: string
//   published_time: Date
//   thumbnail: string
//   author_name: string
//   author_slug: string
//   locale: LanguageType
//   author_avatar_url: string
//   primary_category_slug: string
//   index: number
// }

// const WpPostCardPopular: React.FunctionComponent<WpPostCardPopularProps> = (
//   props,
// ) => {
//   const {
//     title,
//     slug,
//     published_time,
//     thumbnail,
//     author_name,
//     author_slug,
//     locale,
//     primary_category_slug,
//     index,
//     author_avatar_url,
//   } = props

//   return (
//     <article className="flex w-full flex-col rounded-lg border p-4">
//       <div className="my-4">
//         <NextLink
//           role="link"
//           aria-label={`Go To ${title} Page`}
//           href={`/${primary_category_slug}/${slug}`}
//         >
//           <h3 className="line-clamp-3 text-[22px] font-bold leading-[1.35] hover:text-primary md:text-[29px]">
//             {title}
//           </h3>
//         </NextLink>
//       </div>
//       <div className="-mx-4 mb-[10px]">
//         <NextLink
//           role="link"
//           href={`/${primary_category_slug}/${slug}`}
//           aria-label={`Go To ${title} Page`}
//           className="relative block aspect-video h-auto w-full"
//         >
//           <div className="absolute z-10 bg-main p-2 font-bold text-white">
//             {index}
//           </div>
//           <Image
//             src={thumbnail}
//             alt={`Image ${title}`}
//             className="overflow-hidden object-cover"
//             priority={true}
//           />
//         </NextLink>
//       </div>
//       <div className="flex flex-row items-center">
//         {author_name && (
//           <>
//             <div className="hidden flex-row items-center md:flex">
//               {author_avatar_url && (
//                 <div className="relative h-[20px] w-[20px]">
//                   <Image
//                     src={author_avatar_url}
//                     className="overflow-hidden rounded-full object-cover"
//                     alt={author_name}
//                     sizes="(max-width: 768px) 20px, 50px"
//                   />
//                 </div>
//               )}
//               <NextLink
//                 role="link"
//                 aria-label={author_name}
//                 href={`/author/${author_slug}`}
//               >
//                 <h4 className="ml-2 text-[12px]">{author_name}</h4>
//               </NextLink>
//             </div>
//           </>
//         )}
//         {published_time && (
//           <div className="flex items-center max-md:mt-[10px]">
//             <Icon.AccessTime
//               aria-label="Date"
//               className="h-3 w-3 text-foreground/80 md:ml-2"
//             />
//             <time
//               className="pl-[5px] text-xs text-foreground/80"
//               dateTime={published_time as unknown as string}
//               suppressHydrationWarning={true}
//             >
//               <DateWrapper
//                 date={published_time as unknown as string}
//                 language={locale}
//               />
//             </time>
//           </div>
//         )}
//       </div>
//       <div className="mt-[15px]">
//         <ShareButtonPopular
//           text={title}
//           url={`${env.PUBLIC_SITE_URL}/${primary_category_slug}/${slug}`}
//         />
//       </div>
//     </article>
//   )
// }

// export default WpPostCardPopular

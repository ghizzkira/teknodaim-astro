export type WpLanguageType = "ID" | "EN"

export interface WpAvatarDataProps {
  url: string
}

export interface WpAuthorsDataProps {
  node: WpAuthorsDataProps
  name: string
  description?: string
  seo: WpSeoProps
  slug: string
  bio: string
  avatar: WpAvatarDataProps
  og: WpOgDataProps
  title: string
  uri: string
}

export interface WpFeaturedImageDataProps {
  node: WpFeaturedImageDataProps
  id: string
  sourceUrl: string
  altText: string
  caption: string
  srcSet: string
  sizes: string
}

export interface WpCategoriesDataProps {
  language: {
    slug: WpLanguageType
  }
  title: string
  seo: WpSeoProps
  id: string
  name: string
  children: {
    nodes: {
      slug: string
      name: string
      taxonomyName: string
    }[]
  }
  slug: string
  parent?: { node: { id: string } }
  description?: string
  og: WpOgDataProps
  translations: {
    language: {
      slug: WpLanguageType
    }
    title: string
    seo: WpSeoProps
    id: string
    name: string
    children: {
      nodes: {
        slug: string
        name: string
        taxonomyName: string
      }[]
    }
    slug: string
    parent?: { node: { id: string } }
    description?: string
    og: WpOgDataProps
  }[]
}

export interface SeoWPProps {
  title: string
  excerpt: string
  description: string
  slug: string
  category: WpCategoriesDataProps
  authorName: string
  authorUrl: string
  authorImg: string
  categories: WpCategoriesDataProps[]
  featuredImageUrl: string
  featuredImageAlt: string
  featuredImageCaption: string
  date: string
  modified: string
  tags: WpTagsDataProps[]
}

export interface WpTagsDataProps {
  language: { slug: WpLanguageType }
  seo: WpSeoProps

  id: string
  name: string
  slug: string
  description?: string
  og: WpOgDataProps
  posts: {
    pageInfo: WPPageInfoProps
    edges: { node: WpMapPostDataProps }[]
  }
  translations?: {
    language: { slug: WpLanguageType }
    title: string
    seo: WpSeoProps

    id: string
    name: string
    slug: string
    description?: string
  }[]
}

export interface WpTagsEdgesDataProps {
  edges: { node: WpTagsDataProps }[]
}

export interface WpCategoriesEdgesDataProps {
  edges: { node: WpCategoriesDataProps }[]
}

export interface WpSinglePostDataProps {
  language: {
    slug: WpLanguageType
  }
  id: string
  postId: number
  article: string
  title: string
  slug: string
  excerpt: string
  date: string
  seo: WpSeoProps
  published: string
  modified: string
  content: string
  featuredImage: WpFeaturedImageDataProps
  categories: WpCategoriesDataProps[]
  tags: WpTagsDataProps[]
  author: WpAuthorsDataProps
  uri: string
  translations?: {
    id: string
    slug: string
    language: {
      slug: WpLanguageType
    }
    categories: WpCategoriesDataProps[]
  }
}

export interface WpInfinitePostsProps {
  pageInfo: WPPageInfoProps
  posts: WpSinglePostDataProps[]
}

export interface WpSeoProps {
  readingTime: string
  title: string
  schema: {
    raw: string
  }
  metaDesc: string
  metaKeywords: string
  metaRobotsNofollow: string
  metaRobotsNoindex: string
  opengraphAuthor: string
  cornerstone: string
  focuskw: string
  opengraphDescription: string
  opengraphPublishedTime: string
  opengraphModifiedTime: string
  opengraphPublisher: string
  opengraphSiteName: string
  opengraphTitle: string
  opengraphType: string
  opengraphUrl: string
  social?: {
    facebook?: string
    instagram?: string
    linkedIn?: string
    twitter?: string
    youTube?: string
    pinterest?: string
  }
}

export interface WpPopularPosts {
  slug: string
  views: number
  date: string
  post: WpSinglePostDataProps
}

export interface WpArticleDataProps {
  publishedTime: string
  modifiedTime: string
}

export interface WpPostsDataProps {
  slug: string
  post: WpSinglePostDataProps
}

export interface WpSiteDataProps {
  description: string
  language: string
  title: string
}

export interface WpOgDataProps {
  title: string
  description: string
  imageUrl: string
  imageSecureUrl: string
  imageWidth: string
  imageHeight: string
  url: string
  type: string
}

export interface WpTwitterDataProps {
  title: string
  ImageUrl: string
  altText: string
}

export interface WPPageInfoProps {
  hasNextPage: boolean
  endCursor: string
  offsetPagination: { total: number }
}

export interface WpMapPostDataProps {
  id: string
  postId: number
  article: string
  title: string
  language: { slug: string }
  metaTitle: string
  slug: string
  excerpt: string
  date: string
  seo: WpSeoProps
  published: string
  modified: string
  content: string
  featuredImage: WpFeaturedImageDataProps
  categories: WpCategoriesEdgesDataProps
  tags: WpTagsEdgesDataProps
  author: WpAuthorsDataProps

  uri: string
  translations?: {
    id: string
    slug: string
    language: {
      slug: WpLanguageType
    }
    categories: WpCategoriesEdgesDataProps
  }[]
}

export interface WpGetAllPostsResponse {
  data: {
    posts: {
      pageInfo: WPPageInfoProps
      edges: { node: WpMapPostDataProps }[]
    }
  }
}

export interface WpGetPostsSlugByCategorySlugResponse {
  data: {
    category: {
      posts: {
        pageInfo: WPPageInfoProps
        edges: { node: WpMapPostDataProps }[]
      }
    }
  }
}

export interface WpResPostProps {
  data: {
    post: WpMapPostDataProps
  }
  error?: {
    message: string
  }
}

export interface WpResPostsByTagProps {
  data: {
    tag: {
      posts: {
        pageInfo: WPPageInfoProps
        edges: { node: WpMapPostDataProps }[]
      }
    }
  }
}

export interface WpGetAllTagsResponse {
  tags: {
    edges: {
      node: WpTagsDataProps
    }[]
  }
}

export interface WpMenusProps {
  url: string
  label: string
}

export interface WpResMenusProps {
  menu: {
    menuItems: { edges: { node: { url: string; label: string } }[] }
  }
}

export interface WPFeedPostsProps {
  id: string
  title: string
  language: { slug: string }
  slug: string
  excerpt: string
  date: string
  modified: string
  content: string
  featuredImage: Pick<
    WpFeaturedImageDataProps,
    "altText" | "id" | "sizes" | "srcSet" | "sourceUrl" | "caption"
  >
  categories: Pick<WpCategoriesDataProps, "parent" | "slug" | "name" | "id">[]
  author: Pick<WpAuthorsDataProps, "uri" | "slug" | "name" | "avatar">
  uri: string
}

export interface WPPage {
  id: string
  content: string
  title: string
  seo: WpSeoProps
  language: { slug: string }
  featuredImage: { node: { sourceUrl: string } } | null
  translations?:
    | {
        content: string
        title: string
        seo: WpSeoProps
        language: { slug: string }
        featuredImage: { node: { sourceUrl: string } } | null
      }[]
    | null
}

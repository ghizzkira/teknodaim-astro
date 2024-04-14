export const QUERY_WP_ALL_POSTS = `
query AllPosts($language: LanguageCodeFilterEnum = ID) {
  posts(
    first: 10
    where: {language: $language, orderby: {field: DATE, order: DESC}}
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        postId
        title
        slug
        uri
      }
    }
  }
}
`
export const QUERY_POSTS_ALL_SLUG = `
query AllPosts($language: LanguageCodeFilterEnum = ID) {
  posts(first: 50, where: {language: $language}) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        slug
        uri
      }
    }
  }
}
`

export const QUERY_POSTS_SITEMAP = `query GetPostsSitemap($language: LanguageCodeFilterEnum = ID, $offset: Int = null) {
  posts(
    where: {offsetPagination: {offset: $offset, size: 100}, language: $language, status: PUBLISH}
  ) {
    edges {
      node {
        id
        title
        slug
        language {
          slug
        }
        uri
        date
      }
    }
  }
}`

export const QUERY_WP_ALL_SLUG = `
query AllSlug($after: String) {
  posts(after: $after, first: 100) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        slug
        categories {
          edges {
            node {
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const QUERY_WP_ALL_POSTS_LOAD_MORE = `
query AllPosts($after: String, $language: LanguageCodeFilterEnum = ALL) {
  posts(first: 10, after: $after, where: {language: $language}) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        postId
        title
        seo {
          readingTime
          title
          schema {
            raw
          }
          metaDesc
          metaKeywords
          metaRobotsNofollow
          metaRobotsNoindex
          opengraphAuthor
          cornerstone
          focuskw
          opengraphDescription
          opengraphPublishedTime
          opengraphModifiedTime
          opengraphPublisher
          opengraphSiteName
          opengraphTitle
          opengraphType
          opengraphUrl
        }
        slug
        uri
      }
    }
  }
}
`

export const QUERY_WP_POST_BY_SLUG = `
query PostBySlug($slug: ID = "") {
  post(idType: SLUG, id: $slug) {
    author {
      node {
        avatar {
          height
          url
          width
        }
        id
        name
        slug
      }
    }
    id
    language {
      slug
    }
    seo {
      readingTime
      title
      schema {
        raw
      }
      metaDesc
      metaKeywords
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphAuthor
      cornerstone
      focuskw
      opengraphDescription
      opengraphPublishedTime
      opengraphModifiedTime
      opengraphPublisher
      opengraphSiteName
      opengraphTitle
      opengraphType
      opengraphUrl
    }
    categories {
      edges {
        node {
          categoryId
          id
          name
          slug
          children {
            nodes {
              id
              slug
              name
            }
          }
          parent {
            node {
              id
            }
          }
        }
      }
    }
    tags {
      edges {
        node {
          tagId
          id
          name
          slug
        }
      }
    }
    content
    date
    excerpt
    featuredImage {
      node {
        altText
        caption
        sourceUrl
        srcSet
        sizes
        id
      }
    }
    modified
    postId
    title
    slug
    uri
    translations {
      id
      language {
        slug
      }
      slug
      categories {
        edges {
          node {
            categoryId
            id
            name
            slug
            children {
              nodes {
                id
                slug
                name
              }
            }
            parent {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
}
`

export const QUERY_WP_POSTS_BY_CATEGORY_ID = `
query PostsByCategoryId($after: String, $categoryId: [ID] = "") {
  posts(
    where: {categoryIn: $categoryId, orderby: {field: DATE, order: DESC}}
    after: $after
    first: 10
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        tags {
          edges {
            node {
              tagId
              id
              name
              slug
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        modified
        postId
        title
        slug
        uri
      }
    }
  }
}`

export const QUERY_POSTS_PAGINATION = `query QUERY_POSTS_PAGINATION($offset: Int!, $categoryName: String = "", $size: Int = 10) {
  posts(
    where: {offsetPagination: {offset: $offset, size: $size}, categoryName: $categoryName}
  ) {
    edges {
      node {
       author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        title
        slug
        uri
      }
    }
  }
}`
export const QUERY_WP_POSTS_BY_CATEGORY_SLUG = `
query PostsByCategoryId($categoryId: String, $after: String, $notIn: [ID] = "") {
  posts(
    where: {categoryName: $categoryId, notIn: $notIn}
    after: $after
    first: 4
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        tags {
          edges {
            node {
              tagId
              id
              name
              slug
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        modified
        title
        slug
        uri
      }
    }
  }
}
`

export const QUERY_WP_POSTS_BY_TAG_SLUG = `
  query PostsByTagSlug($id: ID!, $after: String ) {
  tag(id:$id,idType: SLUG) {
     posts(after: $after, first: 10) {
       pageInfo {
         endCursor
         hasNextPage
       }
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
              uri
            }
          }
          id
          categories {
            edges {
              node {
                categoryId
                id
                name
                slug
                parent {
                  node {
                    id
                  }
                }
              }
            }
          }
          
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          postId
          title
          slug
          uri
        }
      }
    }
  }
}
`
export const QUERY_WP_POSTS_BY_TAG_ID = `
query PostsByTagSlug($id: ID!, $after: String) {
  tag(id: $id, idType: ID) {
    posts(after: $after, first: 10, where: {orderby: {field: DATE, order: DESC}}) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
              uri
            }
          }
          id
          categories {
            edges {
              node {
                categoryId
                id
                name
                slug
                parent {
                  node {
                    id
                  }
                }
              }
            }
          }
          date
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
              srcSet
            }
          }
          modified
          postId
          title
          slug
          uri
        }
      }
    }
  }
}`

export const QUERY_WP_POSTS_BY_AUTHOR_SLUG = `
query PostByAuthorSlug($slug: String, $after: String, $language: LanguageCodeFilterEnum = ID) {
  posts(
    where: {authorName: $slug, language: $language, orderby: {field: DATE, order: DESC}}
    first: 10
    after: $after
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        excerpt
        featuredImage {
          node {
            altText
            caption
            id
            sizes
            sourceUrl
            srcSet
          }
        }
        id
        modified
        postId
        slug
        uri
        title
      }
    }
  }
}
`

export const QUERY_WP_POST_PER_PAGE = `
  query PostPerPage {
    allSettings {
      readingSettingsPostsPerPage
    }
  }
`

export const QUERY_WP_SEARCH_POSTS = `
query SearchPosts($search: String!, $language: LanguageCodeFilterEnum = ALL) {
  posts(first: 10, where: {search: $search, language: $language}) {
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        content
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        title
        slug
        uri
      }
    }
  }
}
`
export const GET_INFINITE_SCROLL_POSTS = `query GET_POSTS_BY_CATEGORY($categoryIn: [ID] = "",$after: String = "") {
  posts(where: { categoryIn: $categoryIn }, first: 1,after: $after){
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            id
            name
            slug
          }
        }
        id
        categories {
          edges {
            node {
              categoryId
              id
              name
              slug
              children {
                  nodes {
                    id
                    slug
                    name
                  }
                }
              parent {
                    node {
                      id
                    }
                  }
            }
          }
        }
        tags {
          edges {
            node {
              tagId
              id
              name
              slug
            }
          }
        }
        content
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        postId
        title
        slug
        uri
      }
    }
  }
}
`

export const GET_TOTAL_POSTS = `query GetPostsSitemap($language: LanguageCodeFilterEnum = ID) {
  posts(where: {language: $language, status: PUBLISH}) {
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}
`

export const QUERY_WP_POSTS_SLUG_BY_CATEGORY_ID = `query PostsSlugByCategoryId($categorySlug: ID = "") {
  category(id: $categorySlug, idType: SLUG) {
    id
    posts(first: 100) {
      edges {
        node {
          id
          categories {
            edges {
              node {
                id
                name
                slug
                parent {
                  node {
                    id
                  }
                }
              }
            }
          }
          language {
            slug
          }
          slug
          uri
        }
      }
    }
  }
}`

export const QUERY_WP_POSTS_FEED = `
query FeedPosts($language: LanguageCodeFilterEnum = ID) {
  posts(
    first: 12
    where: {language: $language, orderby: {field: DATE, order: DESC}}
  ) {
    edges {
      node {
        author {
          node {
            avatar {
              height
              url
              width
            }
            name
            slug
            uri
          }
        }
        id
        categories {
          edges {
            node {
              id
              name
              slug
              parent {
                node {
                  id
                }
              }
            }
          }
        }
        date
        excerpt
        featuredImage {
          node {
            altText
            caption
            sourceUrl
            srcSet
            sizes
            id
          }
        }
        modified
        title
        slug
        uri
        content
        language {
          slug
        }
      }
    }
  }
}
`

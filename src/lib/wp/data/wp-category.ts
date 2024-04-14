export const QUERY_WP_ALL_CATEGORIES = `
query ALL_CATEGORIES {
  categories(where: {order: DESC, orderby: COUNT}, first: 10) {
    edges {
      node {
        description
        id
        name
        language {
          slug
        }
        slug
      }
    }
  }
}
`

export const QUERY_WP_SEARCH_CATEGORIES = `query ALL_CATEGORIES($search: String = "", $language: LanguageCodeFilterEnum = ID) {
  categories(where: {search: $search, language: $language}, first: 10) {
    edges {
      node {
        description
        id
        name
        language {
          slug
        }
        slug
      }
    }
  }
}`

export const QUERY_WP_ALL_CATEGORIES_SITEMAP = `
  {
    categories(first: 1000) {
      edges {
        node {
          categoryId
          description
          id
          language {
            slug
          }
          name
          slug
        }
      }
    }
  }
`

export const QUERY_WP_CATEGORY_BY_SLUG = `
query CategoryBySlug($language: LanguageCodeFilterEnum = ALL, $slug: [String] = "") {
  categories(first: 1, where: {language: $language, slug: $slug}) {
    edges {
      node {
        categoryId
        description
        id
        name
        language {
          slug
        }
        seo {
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
        children {
          nodes {
            uri
            taxonomyName
            name
            slug
          }
        }
        translations {
          categoryId
          description
          id
          name
          language {
            slug
          }
          slug
          children {
            nodes {
              uri
              taxonomyName
              name
              slug
            }
          }
        }
      }
    }
  }
}
`

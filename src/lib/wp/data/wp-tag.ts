export const QUERY_WP_ALL_TAGS = `
{
  tags(first: 10, where: {orderby: COUNT, order: DESC}) {
    edges {
      node {
        tagId
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

export const QUERY_WP_ALL_TAGS_SITEMAP = `
{
  tags(first: 100, where: {orderby: COUNT, order: DESC}) {
    edges {
      node {
        tagId
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

export const QUERY_WP_SEARCH_TAGS = `query ALL_TAGS($search: String = "") {
    tags(where: {search: $search}, first: 10) {
      edges {
        node {
          description
          id
          name
          slug
        }
      }
    }
  }`

export const QUERY_WP_TAG_BY_SLUG = `
query TagBySlug($slug: [String] = "") {
  tags(where: {slug: $slug, language: ALL}, first: 1) {
    edges {
      node {
        description
        id
        name
        language {
          slug
        }
        uri
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
        translations {
          description
          id
          language {
            slug
          }
          name
          uri
          slug
        }
      }
    }
  }
}
`

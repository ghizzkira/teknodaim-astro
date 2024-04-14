export const QUERY_WP_PAGE_BY_URI = `
query getPageByUri($id: ID = "") {
    page(id: $id, idType: URI) {
      id
      title
      language {
        slug
      }
      content(format: RENDERED)
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
      featuredImage {
        node {
          sourceUrl
         
        }
      }
      translations {
        content(format: RENDERED)
        title
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
        featuredImage {
        node {
          sourceUrl
        }
      }
      }
    }
  }`

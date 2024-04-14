export const QUERY_WP_ALL_USERS = `
  {
    users(where: {hasPublishedPosts: POST}, first: 10) {
      edges {
        node {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
        }
      }
    }
  }
`

export const QUERY_WP_ALL_USERS_SLUG = `
  {
  users(first: 10) {
    edges {
      node {
        id
        slug
      }     
    }
  }
}
`

export const QUERY_WP_USERS_BY_ID = `
  query AuthorId($id: String){
    user(id: $id) {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
        
    }
  }
`
export const QUERY_WP_USERS_BY_SLUG = `
  query AuthorId($slug: ID!){
    user(id: $slug,idType: SLUG) {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          seo {
            title
            schema {
              raw
            }
            metaDesc
            metaRobotsNofollow
            metaRobotsNoindex
            opengraphDescription
            opengraphTitle
            social {
              facebook
              instagram
              linkedIn
              twitter
              youTube
              pinterest
            }
          }
          roles {
            nodes {
              name
            }
          }
          slug
        
    }
  }
`

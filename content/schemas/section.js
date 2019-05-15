export default `
  type ParentNode {
    default: String
  }

  type SiteTopper {
    site_logo_image: String
  }

  type Results {
    name: String
    _id: String
    site_topper: [SiteTopper]
    parent: [ParentNode]
  }

  type Query {
    q_results: [Results]
  }
`

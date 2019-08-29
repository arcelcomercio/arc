export default `
  type ParentNode {
    default: String
  }
  type ResizedUrls {
    original: String
    landscape_xl: String
    landscape_xs: String
    lazy_default: String
  }

  type SiteTopper {
    site_logo_image: String
    resized_urls: [ResizedUrls]
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

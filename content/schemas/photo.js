export default `
  type ResizedUrls {
    original: String
    landscape_xl: String
    landscape_l: String
    landscape_md: String
    landscape_s: String
    landscape_xs: String
    portrait_xl: String
    portrait_l: String
    portrait_md: String
    portrait_s: String
    portrait_xs: String
    square_xl: String
    square_l: String
    square_md: String
    square_s: String
    square_xs: String
    lazy_default: String
    small: String
    medium: String
    large: String
  }
  type Properties {
    owner: String
    published: Boolean
    resized_urls: ResizedUrls
  }
  type Query {
    _id: String!
    url: String!
    caption: String
    subtitle: String
    additional_properties: Properties
  }
`

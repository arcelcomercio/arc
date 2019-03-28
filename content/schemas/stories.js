export default `
  type Description {
    basic: String
  }
  type Headlines {
    basic: String
  }
  type Subheadlines {
    basic: String
  }
  type Image {
    url: String
  }
  type By {
    type: String!
    version: String
    name: String!
    slug: String
    url: String
    description: String
    image: Image
  }
  type Credits {
    by: [By]
  }
  scalar ResizedUrls
  type AdditionalPropertiesImage {
    mime_type: String
    originalName: String
    originalUrl: String
    proxyUrl: String
    published: Boolean
    resizeUrl: String
  }
  type BasicImage {
    height: Int!
    type: String!
    url: String!
    width: Int!
    caption: String
    subtitle: String
    resized_urls: ResizedUrls
    additional_properties: AdditionalPropertiesImage
  }
  type Streams {
    height: Int!
    width: Int!
    filesize: Int
    stream_type: String
    url: String!
  }
  type BasicVideo {
    headlines: Headlines
    subheadlines: Subheadlines
    description: Description
    duration: Int!
    streams: [Streams]
    type: String
    promo_items: PromoItems
    promo_image: BasicImage
  }
  type BasicHtml {
    content: String!
    type: String
  }
  type AdditionalPropertiesGallery {
    galleryOrder: Int
    mime_type: String
    originalName: String
    originalUrl: String
    proxyUrl: String
    published: Boolean
    resizeUrl: String
  }
  type ContentElementsGallery {
    height: Int!
    type: String!
    url: String!
    width: Int!
    additional_properties: AdditionalPropertiesGallery
  }
  type BasicGallery {
    headlines: Headlines
    description: Description
    type: String
    promo_items: PromoItems
    content_elements: [ContentElementsGallery]
  }
  type PromoItems {
    basic: BasicImage
    basic_html: BasicHtml
    basic_video: BasicVideo
    basic_gallery: BasicGallery
  }
  type Tags {
    text: String
    description: String
    slug: String
  }
  type Taxonomy {
    sections: [Sections]
    tags: [Tags]
    seo_keywords: [String]
    sites:[Sites]
  }
  type Sites {
    additional_properties: AdditionalProperties
  }
  type AdditionalProperties{
    original: Original
  }
  type Original{
    site_topper: SiteTopper
  }
  type SiteTopper{
    site_logo_image: String!
  }
  type Sections {
    _id: String!,
    _website: String!,
    type: String!,
    name: String!,
    path: String!,
    parent_id: String,
    _website_section_id: String!
  }
  type WebsiteSection {
    _id: String
    _website: String
    type: String
    name: String
    description: String
    path: String
  }
  type DataWebsites {
      website_section: WebsiteSection
      website_url: String
  }
  type Websites {
      elcomercio: DataWebsites
      peru21: DataWebsites
  }
  type ContentElements {
    canonical_url: String
    type: String!
    subtype: String!
    version: String!
    description: Description
    headlines: Headlines
    subheadlines: Subheadlines
    promo_items: PromoItems
    credits: Credits
    website: String!
    website_url: String!
    websites: Websites!
    created_date: String
    publish_date: String
    display_date: String
    last_updated_date: String
    taxonomy: Taxonomy
  }
  type Query {
    canonical_url: String
    type: String!
    version: String!
    description: Description
    headlines: Headlines
    subheadlines: Subheadlines
    promo_items: PromoItems
    credits: Credits
    website: String!
    website_url: String!
    created_date: String
    publish_date: String
    display_date: String
    last_updated_date: String
    taxonomy: Taxonomy
    websites: Websites!
    section_name: String
    
    content_elements: [ContentElements]
    section_name: String
    count: Int
  }
`
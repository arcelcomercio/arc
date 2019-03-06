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
  type By {
    type: String!
    version: String
    name: String!
    slug: String
    url: String
    description: String
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
    resized_url: ResizedUrls
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
    seo_keywords: Array
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
    created_date: String
    publish_date: String
    display_date: String
    last_updated_date: String
    taxonomy: Taxonomy
  }

  type Query {
    content_elements: [ContentElements]
    count: Int
  }

`;
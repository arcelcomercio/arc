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
  type ByCredits {
    type: String
    version: String
    name: String
  }
  type Credits {
    by: [ByCredits]
  }
  type AdditionalPropertiesBasicPromoItems{
    mime_type: String
    originalName: String
    originalUrl: String
    proxyUrl: String
    published: Boolean
    resizeUrl: String
  }
  type BasicPromoItems {
    height: Int
    type: String
    url: String
    width: Int
    additional_properties: AdditionalPropertiesBasicPromoItems
  }
  type PromoItems {
    basic: BasicPromoItems
  }
  type Taxonomy {
    sections: [SectionTaxonomy]
  }
  type SectionTaxonomy {
    _id: String!,
    _website: String!,
    type: String!,
    name: String!,
    path: String!,
    parent_id: String,
    _website_section_id: String!
  }

  type Content_elements {
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
    taxonomy: Taxonomy
  }
  
  type Query {
    content_elements: [Content_elements]
    count: Int!
  }

`;
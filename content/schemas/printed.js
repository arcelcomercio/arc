export default `
type Headlines {
    basic: String
}
type BasicImage {
    url: String!
}
type PromoItems {
    basic: BasicImage
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
    gestion: DataWebsites
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
type Tags {
    text: String
    description: String
    slug: String
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
type Taxonomy {
    sections: [Sections]
    tags: [Tags]
    seo_keywords: [String]
    sites:[Sites]
}
type Query {
    display_date: String
    headlines: Headlines
    promo_items: PromoItems
    websites: Websites!
    taxonomy: Taxonomy
}
`

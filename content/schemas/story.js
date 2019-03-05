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
    slug: String
    url: String
    description: String
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
type PromoImageVideo {
    type: String
    caption: String
    url: String
    width: Int
    height: Int
}
type BasicVideoPromoItems {
    _id: Int
    type: String
    canonical_url: String
    duration: Int
    video_type: String
    embed_html: String
    promo_image: PromoImageVideo
}
scalar Resized_urls 
type BasicUrlImg{
    url: String
    caption: String
    resized_urls: Resized_urls
}
type PromoItemsGallery {
    basic: BasicPromoItems
}
type galleryItems {
    type: String
    promo_items: PromoItemsGallery
}
type BasicUrlImgVideo{
    promo_items: Promo_items_video
}
type Promo_items_video {
    basic: BasicUrlImg
}
type PromoItems {
    basic: BasicPromoItems
    Basic: BasicVideoPromoItems
    gallery: galleryItems
    basic_image: BasicUrlImg
    basic_video: BasicUrlImgVideo
    basic_gallery: BasicUrlImgVideo
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
 taxonomy: Taxonomy
 websites: Websites!
}
`

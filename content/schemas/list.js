const schema = `

type Headlines{
    basic:String
}
type BasicUrlImg{
    url:String
    caption:String
}
type BasicUrlImgVideo{
    promo_items: Promo_items_video
}
type Promo_items_video {
    basic: BasicUrlImg
}
type Promo_items{
    basic:BasicUrlImg
    Basic: BasicUrlImgVideo
    basic_video: BasicUrlImgVideo
    basic_image: BasicUrlImg
}
type ByCredits {
    type: String
    version: String
    name: String
    url: String
}
type Credits {
    by: [ByCredits]
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
type Contentelements{
    canonical_url:String
    headlines:Headlines
    website_url:String
    display_date:String
    promo_items:Promo_items
    credits: Credits
    websites: Websites!
}
type Query{
    content_elements:[Contentelements]   
}
`
export default schema

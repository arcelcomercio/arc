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
type Contentelements{
    canonical_url:String
    headlines:Headlines
    website_url:String
    display_date:String
    promo_items:Promo_items
}
type Query{
    content_elements:[Contentelements]   
}
`
export default schema

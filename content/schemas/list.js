const schema= `

type Headlines{
    basic:String
}
type BasicUrlImg{
    url:String
}
type Promo_items{
    basic:BasicUrlImg
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
`;
export default schema;
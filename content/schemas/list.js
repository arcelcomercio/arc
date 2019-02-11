const schema= `

type Headlines{
    basic:String
}
type Contentelements{
    canonical_url:String
    headlines:Headlines
    website_url:String
    display_date:String
}
type Query{
    content_elements:[Contentelements]   
}
`;
export default schema;
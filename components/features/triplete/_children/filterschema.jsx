export const filterSchema = `{
    headlines {
        basic
    }
    promo_items {
        Basic {
            type
            promo_image {
                type
                url
            }
        }
        gallery {
            type 
            promo_items {
                basic {
                    type 
                    url
                }
            }
        }
        basic {
            type 
            url
        }
    }
    credits {
        by {
            type 
            name
            url
        }
    }
    website
    website_url
    taxonomy {
        sections {
            _id 
            _website 
            type 
            name 
            path
        }
    }
    websites {
        elcomercio {
            website_section {
                name
                path
            }
        }
        peru21 {
            website_section {
                name
                path
            }
        }
    }
}`
//TODO: improve the data websites and promo_items nodes
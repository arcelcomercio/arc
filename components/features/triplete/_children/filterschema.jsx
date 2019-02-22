export const filterSchema = `{
    headlines {
        basic
    }
    promo_items {
        basic {
            type 
            url
        }
    }
    credits {
        by {
            type 
            name
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
//@todo improve the data websites nodes
// eslint-disable-next-line import/prefer-default-export
const schemaFilter = arcSite => `{
    headlines {
        basic
    }
    promo_items {
        basic_video {
            type
            promo_items {
                basic {
                    type 
                    url
                }
            }
        }
        basic_gallery {
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
        ${arcSite} {
            website_section {
                name
                path
            }
        }
    }
}`
// TODO: improve the data of promo_items nodes
export default schemaFilter

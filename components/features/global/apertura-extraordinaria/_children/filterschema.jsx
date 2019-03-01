// eslint-disable-next-line import/prefer-default-export
export const filterSchema = arcSite => `{
    headlines {
        basic
    }
    subheadlines {
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
    websites {
        ${arcSite} {
            website_section {
                name
                path
            }
        }
    }
}`
export const filterSchema = `{
    headlines {
        basic
    }
    subheadlines {
        basic
    }
    promo_items {
        basic {
            type url
        }
    }
    credits {
        by {
            type name
        }
    }
    website
    website_url
    taxonomy {
        sections {
            _id _website type name path
        }
    }
}`
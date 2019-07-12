const schemaFilter = arcSite => `{
    headlines {
        basic
    }
    subheadlines {
        basic
    }
    promo_items {
        basic_video {
            _id
            type
            promo_items {
                basic {
                    type 
                    url
                    resized_urls { 
                        small
                        medium
                        large
                    }
                }
            }
            embed_html
        }
        basic_gallery {
            type 
            promo_items {
                basic {
                    type 
                    url
                    resized_urls { 
                        small
                        medium
                        large
                    }
                }
            }
        }
        basic {
            type 
            url
            resized_urls { 
                small
                medium
                large
            }
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
    websites {
        ${arcSite} {
            website_url
            website_section {
                name
                path
            }
        }
    }
}`
export default schemaFilter

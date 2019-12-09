export default arcSite => `{
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
                    resized_urls { 
                        square_s
                        lazy_default
                    }
                }
            }
        }
        basic_gallery {
            type 
            promo_items {
                basic {
                    type 
                    url
                    resized_urls { 
                        square_s
                        lazy_default
                    }
                }
            }
        }
        basic {
            type 
            url
            resized_urls { 
                square_s
                lazy_default
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
            website_url
        }
    }
}`

// TODO: Verificar si esta bien que siga buscando websites { ${arcSite} { website_section {
// TODO: improve the data of promo_items nodes

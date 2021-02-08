export default arcSite => `{
    _id
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
        basic_jwplayer {
            subtype
            type
            embed{
                config{
                    thumbnail_url
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
            website_url
        }
    }
}`

// TODO: Verificar si esta bien que siga buscando websites { ${arcSite} { website_section {

// Verificar si al final se va a usar headlines y subheadlines de story o de video

export default (arcSite, promoType) => `{
    content_elements {
        headlines {
            basic
        }
        subheadlines {
            basic
        }
        websites {
            ${arcSite} {
                website_url
            }
        }
        promo_items {
            ${promoType} {
                promo_image {
                    url
                }
                headlines {
                    basic
                }
                subheadlines { 
                    basic
                }
                description {
                    basic
                }
                streams {
                    stream_type
                    url
                    height
                    width
                }
                duration
                display_date
                taxonomy {
                    primary_section {
                        name
                    }
                    tags {
                        text
                    }
                }
            }
        }
    }
}`
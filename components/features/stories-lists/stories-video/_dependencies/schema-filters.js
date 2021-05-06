export default (arcSite) => `{
    headlines {
        basic
    }
    websites { ${arcSite} { website_url website_section{name path} } }
    promo_items{
        basic_video{
            _id
            embed_html
            promo_items{
                basic{
                    resized_urls{
                        landscape_xxs
                    }
                }
            }
            duration
        }
        basic_jwplayer {
            subtype
            embed {
                id
                config {
                    key
                    duration
                    has_ads
                    account
                    resized_urls {
                        landscape_xxs
                    }
                }
            }
        }
        youtube_id{
            content
        }
        basic{
            resized_urls{
                landscape_xxs
            }
        }
    }
}`

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
                        landscape_xl
                        landscape_l
                        square_l
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
                        landscape_xl
                        landscape_l
                        square_l
                    }
                }
            }
        }
        basic_jwplayer {
            subtype
            type
            embed{
              config{
                thumbnail_url
                resized_urls { 
                    landscape_xs
                    landscape_s
                    lazy_default 
                  }
              }
            }
          }
        basic {
            type 
            url
            resized_urls { 
                landscape_xl
                landscape_l
                square_l
            }
        }
        youtube_id {
            content
        }
    }
    credits {
        by {
            type 
            name
            url
        }
    }
    taxonomy {
        primary_section { 
            name
            path
        }
    }
    website
    websites {
        ${arcSite} {
            website_url
        }
    }
}`
export default schemaFilter

export default `
    {
      content_elements {
        canonical_url
        website_url
        display_date
        _id
        headlines {
          basic
        }
        promo_items {
          basic {
            url
            type
            caption
          }
          basic_video {
            promo_items {
              basic {
                url
                type
                caption
              }
            }
          }
          basic_gallery {
            promo_items {
              basic {
                url
                type
                caption
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
        }
      }
    }`

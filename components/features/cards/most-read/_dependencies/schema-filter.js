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
            resized_urls { 
              landscape_xs
            }
          }
          basic_video {
            promo_items {
              basic {
                url
                type
                caption
                resized_urls { 
                  landscape_xs
                }
              }
            }
          }
          basic_gallery {
            promo_items {
              basic {
                url
                type
                caption
                resized_urls { 
                  landscape_xs
                }
              }
            }
          }
        }
      }
    }`
export default `
    {
      content_elements{
        canonical_url
        website_url
        publish_date
        display_date
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
                resized_urls { 
                  landscape_md
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
                  landscape_md
                }
              }
            }
          }
          basic {
            type 
            url
            resized_urls { 
              landscape_md
            }
          }
        }
        headlines{
          basic
        }
      }
    }
    `
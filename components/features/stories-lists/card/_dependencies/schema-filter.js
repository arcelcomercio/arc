export default `
    {
      content_elements{
        canonical_url
        website_url
        publish_date
        promo_items{
          basic_video {
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
        headlines{
          basic
        }
      }
    }
    `

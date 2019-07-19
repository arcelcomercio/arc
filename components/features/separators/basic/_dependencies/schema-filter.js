export default `
    {
      content_elements{
        canonical_url
        website_url
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
                resized_urls { 
                  landscape_s
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
                  landscape_s
                }
              }
            }
          }
          basic {
            type 
            url
            resized_urls { 
              landscape_s
            }
          }
        }
        headlines{
          basic
        }
      } 
      section_name
    }
    `
export default `
    {
      content_elements{
        canonical_url
        website_url
        display_date
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
                resized_urls { 
                  portrait_md
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
                  portrait_md
                }
              }
            }
          }
          basic {
            type 
            url
            resized_urls { 
              portrait_md
            }
          }
        }
        headlines{
          basic
        }
        taxonomy {
          primary_section { 
            name 
            path
          }
        }
      }
    }
    `

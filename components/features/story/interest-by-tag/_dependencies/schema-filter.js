export default `
    {
      content_elements{
        canonical_url
        website_url
        _id
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
                resized_urls { 
                  landscape_md
                  landscape_l
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
                  landscape_l
                }
              }
            }
          }
          basic {
            type 
            url
            resized_urls { 
              landscape_md
              landscape_l
            }
          }
        }
        headlines{
          basic
        }
        taxonomy {
          primary_section {
              _id 
              _website 
              type 
              name 
              path
          }
        }
      }
    }
    `

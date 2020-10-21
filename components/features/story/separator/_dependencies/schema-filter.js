export default arcSite => `
    {
      content_elements{
        canonical_url
        websites {
          ${arcSite} {
            website_url
          }
        }
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
                resized_urls { 
                  portrait_xs
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
                  portrait_xs
                }
              }
            }
          }
          basic {
            type 
            url
            resized_urls { 
              portrait_xs
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

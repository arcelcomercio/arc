export default (website) => `
    {
      content_elements{
        canonical_url
        content_restrictions{
          content_code
        }
        websites {
          ${website} {
            website_url
            website_section {
              name
              path
            }
          }
        }
        _id
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
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
              }
            }
          }
          basic {
            type 
            url
          }
        }
        headlines{
          basic
        }
        subheadlines{
          basic
        }
      }
    }
    `

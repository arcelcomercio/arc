export default website => `
    {
      content_elements{
        canonical_url
        content_restrictions{
          content_code
        }
        websites {
          ${website} {
            website_url
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
                resized_urls { 
                  landscape_md
                  landscape_l
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
        subheadlines{
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

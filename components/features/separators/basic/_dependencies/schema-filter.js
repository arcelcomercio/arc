// TODO: cambiar website_url por websites.[arcSite].website_url
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
                  landscape_s
                  lazy_default
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
                  landscape_s
                  lazy_default
                  portrait_md
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
          basic {
            type 
            url
            resized_urls { 
              landscape_s
              lazy_default
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
      section_name
    }
    `

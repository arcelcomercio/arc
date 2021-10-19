// TODO: cambiar website_url por websites.[arcSite].website_url
export default (arcSite) => `
    {
      content_elements{
        content_restrictions { content_code }
        canonical_url
        websites {
          ${arcSite} {
            website_url
            website_section {
              name
              path
            }
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
                resized_urls { 
                  landscape_xs
                  landscape_s
                  lazy_default 
                }
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
      } 
      section_name
    }
    `

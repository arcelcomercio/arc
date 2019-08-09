// TODO: cambiar website_url por websites.[arcSite].website_url
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
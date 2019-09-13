// TODO: cambiar website_url por websites.[arcSite].website_url
export default `
    {
      content_elements{
        canonical_url
        website_url
        credits {
          by { 
            name url type 
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
                  landscape_s
                  lazy_default
                  portrait_md
                  landscape_l
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
              landscape_l
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

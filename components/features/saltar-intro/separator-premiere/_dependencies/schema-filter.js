export default (arcSite) => `
    {
      content_elements{
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
        content_elements {
          _id
          type
          subtype
          embed {
            config {
              title
              release_date
              plataform
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
        credits {
          by { name url type }
        } 
      } 
      section_name
    }
    `

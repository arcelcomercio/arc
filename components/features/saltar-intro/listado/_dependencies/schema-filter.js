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
        content_elements {
          _id
          type
          subtype
          embed {
            config {
              career_interviewed
              interviewed
            }
          }
        }
        headlines{
          basic
        }
        subheadlines{
          basic
        }
        credits {
          by { name url type }
        }
        display_date 
      } 
      section_name
    }
    `

export default function(arcSite) {
  return `{
    content_elements { 
      headlines { basic }
      websites { ${arcSite} { website_url } }
      display_date
      promo_items {
        basic { 
          url 
          type 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
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
          promo_items {
            basic { 
              url 
              type 
            }
          }
        }

      }
      taxonomy {
        primary_section { name }
      }
    }
  }`
}

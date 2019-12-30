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
          resized_urls { 
            impresa_s
            lazy_default 
          } 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                impresa_s
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
              resized_urls { 
                impresa_s
                lazy_default 
              } 
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

export default function (arcSite) {
  return `{
    websites { 
      ${arcSite} { 
        website_url 
        website_section {
          name
          path
        }
      } 
    }
    promo_items {
      basic { 
        url 
        type
        subtitle
        caption
        resized_urls { 
          landscape_md
          lazy_default
        } 
      }
      basic_video {
        promo_items {
          basic { 
            url 
            type
            subtitle
            caption
            resized_urls { 
              landscape_md
              lazy_default
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
        promo_items {
          basic { 
            url 
            type
            subtitle
            caption
            resized_urls { 
              landscape_md
              lazy_default
            } 
          }
        }
      }
    }
    headlines { basic }
    display_date
    section_name
  }`
}

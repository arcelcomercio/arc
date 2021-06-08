export default (arcSite) => {
  return `
  { 
    next
    content_elements {
      _id
      headlines { basic }
      promo_items {
        youtube_id {
          content
        }
        basic_html {
          content
        }
        basic { 
          url 
          type 
          resized_urls { 
            portrait_md
          } 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
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
        basic_gallery {
          content_elements { type }
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                portrait_md 
              } 
            }
          }
        }
      }
      websites {
        ${arcSite} {
          website_url
          website_section {
            name
            path
          }
        }
      }
    }
  }`
}

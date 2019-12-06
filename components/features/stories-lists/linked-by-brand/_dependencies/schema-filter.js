export default arcSite => {
  return `
  {
    content_elements {
      headlines { basic }
      websites {
        ${arcSite} {
          website_section {
            name
            path
          }
          website_url
        }
      }
      promo_items {
        youtube_id {
          content
        }
        basic_html {
          content
        }
        basic { 
          type 
          resized_urls { 
            square_s
            landscape_s
          } 
        }
        basic_video {
          promo_items {
            basic { 
              type 
              resized_urls { 
                square_s
                landscape_s
              } 
            }
          }
        }
        basic_gallery {
          promo_items {
            basic { 
              type 
              resized_urls { 
                square_s
                landscape_s
              } 
            }
          }
        }
      }
    }
  }
  `
}

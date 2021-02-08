export default arcSite => {
  return `
  {
    content_elements {
      content_restrictions { content_code }
      headlines { basic }
      websites {
        ${arcSite} {
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
          url
        }
        basic_video {
          promo_items {
            basic { 
              type 
              url
            }
          }
        }
        basic_jwplayer {
          subtype
          type
          embed{
            config{
              thumbnail_url
            }
          }
        }
        basic_gallery {
          promo_items {
            basic { 
              type 
              url
            }
          }
        }
      }
    }
  }
  `
}

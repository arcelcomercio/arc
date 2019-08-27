export default `
  {
    content_elements {
      promo_items {
        basic { 
          url 
          type 
          resized_urls { 
            preset1
            preset2
          } 
        }
        basic_video {
          _id
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                preset1
                preset2
              } 
            }
          }
        }
        youtube_id {
          content
        }
      }
      headlines { basic }
      display_date
    }
    section_name
  }
  `

export default arcSite => {
  return `
  { 
    content_elements {
      headlines { basic }
      subheadlines { basic }
      credits {
        by { 
          name url type 
          image { url }
          additional_properties { original { role education { name } } } 
        }
      }
      promo_items {
        youtube_id {
          content
        }
        basic { 
          url 
          type 
          resized_urls { 
            landscape_l 
            landscape_md 
            portrait_md 
            square_s
            lazy_default 
          } 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                landscape_l 
                landscape_md 
                portrait_md 
                square_s
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
                landscape_l 
                landscape_md 
                portrait_md 
                square_s
                lazy_default 
              } 
            }
          }
        }
      }
      websites {
        ${arcSite} {
          website_section {
            name
            path
          }
          website_url
        }
      }
      taxonomy { 
        primary_section { 
          name
          path 
        }
        sections {
          name
          path 
        }
      }
      website_url
    }
  }`
}

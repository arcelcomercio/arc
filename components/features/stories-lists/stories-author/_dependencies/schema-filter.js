export default (arcSite) => {
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
      websites {
        ${arcSite} {
          website_url
          website_section {
            name
            path
          }
        }
      }
      taxonomy { 
        sections {
          name
          path 
        }
      }
    }
  }`
}

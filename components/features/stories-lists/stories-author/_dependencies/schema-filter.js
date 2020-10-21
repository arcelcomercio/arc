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
    }
  }`
}

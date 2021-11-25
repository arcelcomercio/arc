export default (arcSite) => `{ 
    next
    content_elements {
      _id
      headlines { basic mobile }
      subheadlines { basic }
      display_date
      content_restrictions { content_code }
      credits {
        by { 
          name url type 
          image {
            url
          }
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
          url 
          type 
          resized_urls { 
            landscape_xs
            landscape_s
            lazy_default 
          } 
        }
        basic_video {
          promo_items {
            basic { 
              url 
              type 
              resized_urls { 
                landscape_xs
                landscape_s
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
              resized_urls { 
                landscape_xs
                landscape_s
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
        sections {
          name
          path 
        }
      }
      website_url
    }
  }`

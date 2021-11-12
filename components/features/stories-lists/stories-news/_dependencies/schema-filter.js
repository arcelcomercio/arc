export default (arcSite) => `{ 
    content_elements { 
      headlines { basic mobile }
      subheadlines { basic }
      display_date
      credits {
        by { 
          name url type 
          image {
            url
          }
        }
      }
      websites { ${arcSite} { website_url website_section{name path} } }
      promo_items {
        youtube_id {
          content
        }
        basic { url type resized_urls { landscape_xs landscape_md landscape_s lazy_default } }
        basic_video {
          promo_items {
            basic { url type resized_urls { landscape_xs landscape_md landscape_s lazy_default } }
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
            basic { url type resized_urls { landscape_xs landscape_md landscape_s lazy_default } }
          }
        }
        basic_html {
          content 
        }
      }
    }    
  }`

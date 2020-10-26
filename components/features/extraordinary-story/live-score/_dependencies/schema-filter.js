export default arcSite => `{
  headlines { basic }
  subheadlines { basic }
  promo_items {
    basic { 
      url 
      type 
      resized_urls { 
        landscape_l 
      } 
    }
    basic_video {
      promo_items {
        basic { 
          url 
          type 
          resized_urls { 
            landscape_l 
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
            landscape_l 
          } 
        }
      }
    }
  }
  websites { ${arcSite} { website_url } }
}`

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

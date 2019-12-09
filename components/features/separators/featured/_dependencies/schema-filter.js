export default arcSite => `
{
  content_elements{
    websites { ${arcSite} { website_url } }
    promo_items{
      basic_video {
        type
        promo_items {
          basic {
            type 
            url
            caption
            resized_urls { 
              portrait_s
              lazy_default
            }
          }
        }
      }
      basic_gallery {
        type 
        promo_items {
          basic {
            type 
            url
            caption
            resized_urls { 
              portrait_s
              lazy_default
            }
          }
        }
      }
      basic {
        type 
        url
        caption
        resized_urls { 
          portrait_s
          lazy_default
        }
      }
    }
    headlines{
      basic
    }
    taxonomy {
      primary_section {
          name
          path
      }
    }
  } 
}
`

export default arcSite => {
  return `
  {
    websites { 
      ${arcSite} { 
        website_url 
      } 
    }
    promo_items {
      basic { 
        url 
        type 
        resized_urls { 
          landscape_md
        } 
      }
      basic_video {
        promo_items {
          basic { 
            url 
            type 
            resized_urls { 
              landscape_md
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
              landscape_md
            } 
          }
        }
      }
    }
    headlines { basic }
    publish_date
    taxonomy {
      primary_section {
        path
        name
      }
    }
    section_name
  }
  `
}

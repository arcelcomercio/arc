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
        subtitle
        caption
        resized_urls { 
          landscape_md
          lazy_default
        } 
      }
      basic_video {
        promo_items {
          basic { 
            url 
            type
            subtitle
            caption
            resized_urls { 
              landscape_md
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
            subtitle
            caption
            resized_urls { 
              landscape_md
              lazy_default
            } 
          }
        }
      }
    }
    headlines { basic }
    display_date
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

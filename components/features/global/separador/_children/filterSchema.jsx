const schemaFilter = () => {
  return `
    {
      content_elements{
        canonical_url
        website_url
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
              }
            }
          }
          basic_gallery {
            type 
            promo_items {
              basic {
                type 
                url
              }
            }
          }
          basic {
            type 
            url
          }
        }
        headlines{
          basic
        }
      } 
      section_name
    }
    `
}

export default schemaFilter

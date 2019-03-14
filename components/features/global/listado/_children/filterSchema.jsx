const filterSchema = () => {
  return `
    {
      content_elements{
        canonical_url
        website_url
        display_date
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
    }
    `
}

export default filterSchema

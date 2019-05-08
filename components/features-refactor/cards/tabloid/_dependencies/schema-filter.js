const filterSchema = arcSite => {
  return `
    {
      content_elements{
        canonical_url
        website_url
        publish_date
        websites {
          ${arcSite} {
            website_section {
              name
            }
          }
        }
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

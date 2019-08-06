export default arcSite => `
    {
      websites {
        ${arcSite} {
          website_url
        }
      }
      display_date
      promo_items{
        basic {
          type 
          url
          resized_urls { 
            printed_md
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
    `

export default arcSite => `
    {
      websites {
        ${arcSite} {
          website_url
        }
      }
      display_date
      section_name
      promo_items{
        basic {
          type 
          url
          resized_urls { 
            printed_md
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
    `
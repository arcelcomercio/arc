export default arcSite => `
    {
      websites {
        ${arcSite} {
          website_url
        }
      }
      created_date
      section_name
      promo_items{
        basic {
          type 
          url
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

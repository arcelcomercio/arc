export default (arcSite) => `
    {
      websites { 
        ${arcSite} {
          website_url
          website_section {
            name
            path
          }
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
    }
    `

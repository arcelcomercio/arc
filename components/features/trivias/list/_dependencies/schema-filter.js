export default (arcSite) => `
    {
      content_elements {
        canonical_url
        website_url
        _id
        websites {
          ${arcSite} {
            website_url
          }
        }
        headlines {
          basic
        }
        promo_items {
          basic {
            url
            type
            caption
          }
        }
      }
    }`

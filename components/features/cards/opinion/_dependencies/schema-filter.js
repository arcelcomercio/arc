export default arcSite => `
  {
    headlines {
        basic
    }
    websites {
      ${arcSite} {
        website_url
      }
    }
    canonical_url
    taxonomy{
      sections{
        name
        path
        additional_properties{
          original{
            site_topper{
              site_logo_image
            }
          }
        }
      }
    }
    subheadlines{
      basic
    }
  }
  `

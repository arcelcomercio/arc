const schemaFilter = () => {
  return `
  {
    content_elements{
      headlines {
          basic
      }
      canonical_url
      taxonomy{
        sites{
          additional_properties{
            original{
              site_topper{
                site_logo_image
              }
            }
          }
        }
        sections{
          name
          path
        }
      }
      subheadlines{
        basic
      }
    }
  }
  `
}

export default schemaFilter

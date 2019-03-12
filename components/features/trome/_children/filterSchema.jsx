const filterSchema = () => {
  return `{
      content_elements{
        headlines {
          basic
        }
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
        }
        subheadlines{
          basic
        }
      }
    }
    `
}

export default filterSchema()

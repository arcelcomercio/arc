const schemaFilter = () => `
{
  content_elements{
    _id
    website_url
    taxonomy{
      primary_section{
        name
        path
      }
    }
    credits{
      by{
        type
        name
        url
        image{
          url
        }
      }
    }
    headlines{
      basic
    }
  }
}
`
export default schemaFilter

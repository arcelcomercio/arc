export default arcSite => {
  return `{
    content_elements { 
      headlines { basic }
      websites { ${arcSite} { website_url } }
      content_elements {
        _id
        type
        subtype
        content
        text
        embed {
          id
          config {
            date
            content
          }
        }
      }
      display_date
    }
  }`
}

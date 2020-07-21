export default arcSite => {
  return `{
    content_elements { 
      headlines { basic }
      websites { ${arcSite} { website_url } }
      content_elements {
        _id
        type
        content
        text
      }
      display_date
    }
  }`
}

export const bandFilter = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
  }
}`

export const menuFilter = `{
  children {
      name
      _id
      display_name
      url
      children {
          name
          _id
          display_name
          url
          children {
              name
              _id
              display_name
              url
              children {
                  name
                  _id
                  display_name
                  url
              }
          } 
      }
  }
}
`

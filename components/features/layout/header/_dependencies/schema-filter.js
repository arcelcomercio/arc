export default (headerType) => {
    switch (headerType) {
        case 'standard':
        case 'somos':
            return `{ 
            children {
              name
              _id
              display_name
              url
              node_type
            }
          }`

        default:
            return ''
    }
}
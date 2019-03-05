const schema = `
  type Children {
    name: String
    _id: String
    children: [Children]
    display_name: String
    url: String
    node_type: String
  }

  type Query {
    children: [Children]
  }
`

export default schema

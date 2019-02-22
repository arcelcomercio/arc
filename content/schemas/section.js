const schema = `
  type Children {
    name: String
    _id: String
    children: [Children]
  }

  type Query {
    children: [Children]
  }
`

export default schema
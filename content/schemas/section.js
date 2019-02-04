const schema = `
  type Children {
    name: String
  }

  type Query {
    children: [Children]
  }
`

export default schema
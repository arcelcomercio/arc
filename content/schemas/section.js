export default `
  type ParentNode {
    default: String
  }

  type Results {
    name: String
    _id: String
    parent: [ParentNode]
  }

  type Query {
    q_results: [Results]
  }
`

export default `
type Description {
 basic: String
}
type Headlines {
 basic: String
}
type Subheadlines {
 basic: String
}
type Query {
 type: String!
 version: String!
 description: Description
 headlines: Headlines
 subheadlines: Subheadlines
}
`
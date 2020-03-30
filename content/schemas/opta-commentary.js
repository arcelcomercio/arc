export default `
type Commentary {
    commentary_id: String
    comment: String
    lastModified: String
    minute: Int
    second: Int
    time: String
    period_id: Int
    commentary_type: {
        id: Int
        name: String 
    }
}
type Query {
    meta: {
        total_count: Int
    }
    items: [Commentary]
}
`

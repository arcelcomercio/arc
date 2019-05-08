import filterSchemaParent from '../../_dependencies/schema-filter'

const filterSchema = arcSite => `{
    content_elements 
        ${filterSchemaParent(arcSite)}
}`
export default filterSchema

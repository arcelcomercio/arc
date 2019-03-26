import filterSchemaParent from '../../_children/filterschema'

const filterSchema = arcSite => `{
    content_elements 
        ${filterSchemaParent(arcSite)}
}`
export default filterSchema

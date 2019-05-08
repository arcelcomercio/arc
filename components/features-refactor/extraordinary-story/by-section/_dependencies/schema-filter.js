import schemaFilterParent from '../../_dependencies/schema-filter'

const schemaFilter = arcSite => `{
    content_elements 
        ${schemaFilterParent(arcSite)}
}`
export default schemaFilter

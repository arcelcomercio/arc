import schemaFilterParent from '../../_children/filterschema'

const schemaFilter = arcSite => `{
    content_elements 
        ${schemaFilterParent(arcSite)}
}`
export default schemaFilter

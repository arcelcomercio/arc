import schemaFilterParent from '../../_dependencies/schema-filter'

export const schemaStory = arcSite => `{
    content_elements 
        ${schemaFilterParent(arcSite)}
}`

export const schemaSection = () => `{
    
}`

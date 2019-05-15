import schemaFilterParent from '../../_dependencies/schema-filter'

export const schemaStory = arcSite => schemaFilterParent(arcSite)

export const schemaSection = () => `{
    _id
    name
    site_topper {
        site_logo_image
    }
}`

import schemaFilterParent from '../../_dependencies/schema-filter'

export const storySchema = arcSite => schemaFilterParent(arcSite)

export const sectionSchema = `{
    _id
    name
    site_topper {
        site_logo_image
        resized_urls {
            lazy_default
            landscape_xl
            landscape_s
        }
    }
}`

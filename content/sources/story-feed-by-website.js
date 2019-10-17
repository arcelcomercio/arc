import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

const params = [
    {
        name: 'website',
        displayName: 'Sitio web',
        type: 'text',
    },
    {
        name: 'stories_qty',
        displayName: 'Cantidad de historias',
        type: 'number',
    },
]

const resolve = ({ website, stories_qty: storiesQty }) => {

    if (!website) throw new Error('Website no ha sido definido')

    const sourceExclude = `&_sourceExclude=owner,address,workflow,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,related_content`

    const requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=${storiesQty || 50}&website=${website}${sourceExclude}&q=type:story+AND+revision.published:true`

    return requestUri
}

const transform = (data, key) => {
    const website = key['arc-site'] || 'Arc Site no está definido'
    const dataStories = data
    const { resizerUrl } = getProperties(website)
    dataStories.content_elements = addResizedUrlsToStory(
        dataStories.content_elements,
        resizerUrl,
        resizerSecret,
        addResizedUrls
    )
    return dataStories
}

export default {
    resolve,
    transform,
    params,
    ttl: 120,
}

// Este Source debe devolver la úlitima historia publicada, filtrada por sección y con la imágen redimensionada

import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

const schemaName = 'stories'

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
]

// TODO: Cambiar "taxonomy.sites.path" por "taxonomy.sections..."

const resolve = key => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  const requestUri = `/content/v4/search/published?q=taxonomy.sites.path:"/${key.section ||
    ''}"&sort=display_date:desc&from=0&size=1&website=${website}${excludedFields}`
  return requestUri
}

const transform = data => {
  const dataStory = data
  const { resizerUrl } = getProperties(website)
  return (
    addResizedUrlsToStory(
      [dataStory],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0] || null
  )
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}

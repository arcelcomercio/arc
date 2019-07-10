// Este Source debe devolver la úlitima historia publicada, filtrada por sección y con la imágen redimensionada

import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

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
  const requestUri = `/content/v4/search/published?q=taxonomy.sites.path:"/${key.section ||
    ''}"&sort=publish_date:desc&from=0&size=1&website=${website}`
  return requestUri
}

const transform = data => {
  const { resizerUrl } = getProperties(website)
  return addResizedUrls(data, {
    resizerUrl,
    resizerSecret,
    presets: {
      small: {
        width: 100,
        height: 200,
      },
      medium: {
        width: 480,
      },
      large: {
        width: 940,
        height: 569,
      },
      amp: {
        width: 600,
        height: 375,
      },
    },
  })
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}

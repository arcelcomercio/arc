// Este Source debe devolver la úlitima historia publicada, filtrada por sección y con la imágen redimensionada

import getProperties from 'fusion:properties'
import { addResizedUrls } from '../../resources/utilsJs/thumbs'

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
  const website = key['arc-site'] || 'Arc Site is not defined.'
  const requestUri = `/content/v4/search/published?q=taxonomy.sites.path:"/${
    key.section
  }"&sort=publish_date:desc&from=0&size=1&website=${website}`
  return requestUri
}

const transform = ({ content_elements: contentElements = [] }) => {
  const { website } = contentElements[0]

  const aspectRatios = ['288:157|288x157', '164:187|328x374', '388:187|676x374']
  const { resizerSecretKeyEnvVar, resizerUrl } = getProperties(website)
  // const resizerSecretKey = envVars[resizerSecretKeyEnvVar];
  return addResizedUrls(
    contentElements[0],
    resizerUrl,
    resizerSecretKeyEnvVar,
    aspectRatios
  )
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}

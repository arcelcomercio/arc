// Este Source debe devolver la úlitima historia publicada, filtrada por sección y con la imágen redimensionada

import getProperties from 'fusion:properties'
import { addResizedUrls } from '../../resources/utilsJs/thumbs'

const resolve = key => {
  const requestUri = `/content/v4/search/published?q=taxonomy.sites.path:"/${
    key.section
  }"&sort=publish_date:desc&from=0&size=1&website=${key.website}`
  return requestUri
}

const transform = data => {
  const firstStory = data.content_elements[0]
  const { website } = firstStory
  const aspectRatios = ['288:157|288x157', '164:187|328x374', '388:187|676x374']
  const { resizerSecretKeyEnvVar, resizerUrl } = getProperties(website)
  // const resizerSecretKey = envVars[resizerSecretKeyEnvVar];
  return addResizedUrls(
    data.content_elements[0],
    resizerUrl,
    resizerSecretKeyEnvVar,
    aspectRatios
  )
}

export default {
  resolve,
  transform,
  schemaName: 'story',
  params: {
    section: 'text',
    website: 'text',
  },
}

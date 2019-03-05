import envVars from 'fusion:environment'
import { addResizedUrls } from '../../resources/utilsJs/thumbs'
import getProperties from 'fusion:properties'

const resolve = key => {
  const requestUri = `/content/v4/stories/?website_url=${key.website_url ||
    key}&website=${key.website}`
  return requestUri
}

const transform = data => {
  const { website } = data
  const aspectRatios = [
    '2:3|620x356',
    '3:4|895x514',
    '288:157|288x157',
    '164:187|328x374',
    '388:187|676x374',
  ]
  const { resizerSecretKeyEnvVar, resizerUrl } = getProperties(website)
  // const resizerSecretKey = envVars[resizerSecretKeyEnvVar];
  return addResizedUrls(data, resizerUrl, resizerSecretKeyEnvVar, aspectRatios)
}

export default {
  resolve,
  schemaName: 'story',
  transform,
  params: {
    website_url: 'text',
    website: 'text',
  },
}

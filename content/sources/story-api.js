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
    '16:9|288x157',
    '4:3',
    '3:2',
    '2:1',
    '1:1',
    '1:2|300x374',
    '2:3|620x356',
    '3:4|895x514',
    '9:16',
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

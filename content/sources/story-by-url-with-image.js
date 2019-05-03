// import envVars from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addResizedUrls } from '../../components/utilities/thumbs'

// Está así porque la intención es que acceda por token

const resolve = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const requestUri = `/content/v4/stories/?website_url=${key.website_url ||
    key}&website=${website}`
  return requestUri
}

const transform = data => {
  const { website } = data
  const aspectRatios = [
    '3:4|895x514',
    '2:3|620x356',
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
  schemaName: 'stories',
  transform,
  params: {
    website_url: 'text',
  },
}

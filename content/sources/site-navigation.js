import { CONTENT_BASE } from 'fusion:environment'

const resolve = (query) => {
  const requestUri = `${CONTENT_BASE}site/v3/navigation/`

  if (query.hasOwnProperty('website')) return `${requestUri}${query.website}`

  throw new Error('site-navigation content source requires a website')
}

export default {
  resolve,
  schemaName: 'section',
  params: {
    website: 'text'
  }
}
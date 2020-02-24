/* eslint-disable jsx-a11y/alt-text */
import * as ENV from 'fusion:environment'
import createHmac from 'create-hmac'
import qs from 'query-string'
import uuid from 'uuid'

const hmac256 = (queryString, secret, encoding = 'base64') => {
  const hmac = createHmac('sha256', Buffer.from(secret))
  hmac.update(queryString)
  return hmac.digest(encoding)
}

function buildBrowserTag(
  params,
  secret,
  baseUrl = 'https://www.facebook.com/tr'
) {
  const queryString = qs.stringify({ ...params, eid: uuid(), ts: Date.now() })
  const signature = encodeURIComponent(hmac256(queryString, secret))
  const uri = `${baseUrl}?${queryString}&sig=${signature}`
  return uri
}

function generateSignedFbEventUri(pixelId, event, data) {
  const payload = {
    id: pixelId,
    ev: event,
    cd: data,
    noscript: 1,
  }
  return buildBrowserTag(payload, ENV.FB_APP_SECRET)
}

const fetch = (key = {}) => {
  const { 'arc-site': site, event, ...data } = key
  const pixelId = ENV[`FB_PIXEL_ID_${site.toUpperCase()}`]
  const uri = generateSignedFbEventUri(pixelId, event, data)
  return Promise.resolve({ uri })
}

export default { fetch }

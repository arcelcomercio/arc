/* eslint-disable jsx-a11y/alt-text */
import { fbAppSecret, fbPixelId } from 'fusion:environment'
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

function generateSignedFbEventUri(event, data) {
  const pixelId = fbPixelId
  const appSecret = fbAppSecret
  const payload = {
    id: pixelId,
    ev: event,
    cd: data,
    noscript: 1,
  }
  return buildBrowserTag(payload, appSecret)
}

const fetch = (key = {}) => {
  const { event, ...data } = key
  const uri = generateSignedFbEventUri(event, data)
  return Promise.resolve({ uri })
}

export default { fetch }

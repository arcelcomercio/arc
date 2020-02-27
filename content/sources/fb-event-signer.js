/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
import * as ENV from 'fusion:environment'
const createHmac = require('create-hmac')
const uuid = require('uuid')
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
  const finalParams = {
    ...params,
    eid: uuid(),
    ts: Date.now(),
  }
  const encodedParams = Object.keys(finalParams).reduce((prev, key) => {
    let value = finalParams[key]
    if (typeof value !== 'object') {
      value = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      return [...prev, value]
    }
    const innerParams = Object.keys(value).reduce((prev, innerKey) => {
      const innerValue = value[innerKey]
      let valueToSet =
        typeof innerValue === 'string' ? innerValue : JSON.stringify(innerValue)
      valueToSet = encodeURIComponent(valueToSet)
      const keyToSet = encodeURIComponent(`[${innerKey}]`)
      return [...prev, `${key}${keyToSet}=${valueToSet}`]
    }, [])
    return [...prev, ...innerParams]
  }, [])
  const queryString = encodedParams.join('&')
  const signature = encodeURIComponent(hmac256(queryString, secret))
  const uri = `${baseUrl}?${queryString}&sig=${signature}`
  return { uri }
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
  const site = key['arc-site']
  const { event, ...data } = key
  const pixelId = ENV[`FB_PIXEL_ID_${site.toUpperCase()}`]
  return generateSignedFbEventUri(pixelId, event, data)
}

export default { fetch }
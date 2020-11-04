/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
const ENV = require('fusion:environment')
const getProperties = require('fusion:properties')
const request = require('request-promise-native')
const createHmac = require('create-hmac')
const uuid = require('uuid')
const {
  interpolateUrl,
} = require('../../components/features/paywall/_dependencies/domains')

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
  const {
    fbPixelId,
    paywall: { urls },
  } = getProperties(site)
  const { debug, accessToken, event, ...data } = key
  const uri = interpolateUrl(`${urls.originApi}${urls.arcEntitlements}`)
  return new Promise((resolve, reject) => {
    if (event === 'LogIntoAccount') {
      request({
        uri,
        headers: {
          Authorization: accessToken,
        },
        json: true, // Automatically parses the JSON string in the response
      })
        .then(entitlements => {
          if (debug)
            console.log(`Subscriptions: ${JSON.stringify(entitlements.skus)}`)
          const isSubscriber =
            Array.isArray(entitlements.skus) && entitlements.skus.length > 0
          resolve(isSubscriber)
        })
        .catch(reject)
    } else {
      resolve(undefined)
    }
  }).then(isSubscriber => {
    if (isSubscriber !== undefined) {
      data.is_subscriber = isSubscriber
    }
    if (debug) console.log(`Event: ${event}`)
    if (debug) console.log(`SignatureParams: ${JSON.stringify(data)}`)
    const signedRes = generateSignedFbEventUri(fbPixelId, event, data)
    if (isSubscriber !== undefined) {
      signedRes.isSubscriber = isSubscriber
    }
    if (debug) console.log(`SignatureResponse: ${JSON.stringify(signedRes)}`)
    return signedRes
  })
}

export default { fetch }

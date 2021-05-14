/* eslint-disable import/no-extraneous-dependencies */
import Base64 from 'crypto-js/enc-base64'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import { FB_APP_SECRET } from 'fusion:environment'
import getProperties from 'fusion:properties'
import request from 'request-promise-native'
import { ConentSourceBase } from 'types/content-source'
import { v4 as uuidv4 } from 'uuid'

import { interpolateUrl } from '../../components/features/paywall/_dependencies/domains'

export type FbEventSignerQuery = {
  event: string
  subscription_id: string
  debug?: boolean
  accessToken?: string
  offer_code?: string
  value?: number
  currency?: string
  is_subscriber?: boolean
}

type FbEventSignerParams = FbEventSignerQuery & ConentSourceBase

type EventParams = {
  id: string
  ev: string
  cd: Partial<FbEventSignerQuery>
  noscript: number
}

type UniqueEventParams = {
  eid: string
  ts: number
}

type FinalEventParams = EventParams & UniqueEventParams

type FbEventSignature = {
  uri: string
  isSubscriber: unknown
}

const hmac256 = (queryString: string, secret: string): string =>
  Base64.stringify(hmacSHA256(queryString, secret))

const buildPixelUrl = (
  params: EventParams,
  secret: string,
  baseUrl = 'https://www.facebook.com/tr'
) => {
  const finalParams: FinalEventParams = {
    ...params,
    eid: uuidv4(),
    ts: Date.now(),
  }

  const encodedParams = Object.keys(finalParams).reduce<string[]>(
    (prev, key) => {
      let value = finalParams[key as keyof FinalEventParams]
      if (typeof value !== 'object') {
        value = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        return [...prev, value]
      }
      const innerParams = Object.keys(value).map((valKey) => {
        const innerValue = (value as Partial<FbEventSignerQuery>)[
          valKey as keyof Partial<FbEventSignerQuery>
        ]
        let valueToSet =
          typeof innerValue === 'string'
            ? innerValue
            : JSON.stringify(innerValue)
        valueToSet = encodeURIComponent(valueToSet)
        const keyToSet = encodeURIComponent(`[${valKey}]`)
        return `${key}${keyToSet}=${valueToSet}`
      })
      return [...prev, ...innerParams]
    },
    []
  )

  const queryString = encodedParams.join('&')
  const signature = encodeURIComponent(hmac256(queryString, secret))

  // Ejemplo en documentacion de FB
  // https://developers.facebook.com/docs/instant-articles/subscriptions/account-linking/#:~:text=example%20result%20of%20the%20code
  return `${baseUrl}?${queryString}&sig=${signature}`
}

const fetch = (key: FbEventSignerParams): Promise<FbEventSignature> => {
  const site = key['arc-site']
  const {
    fbPixelId,
    paywall: { urls },
  } = getProperties(site)

  const { debug, accessToken, event, ...data } = key || {}
  const uri = interpolateUrl(`${urls.originApi}${urls.arcEntitlements}`)

  return new Promise((resolve, reject) => {
    if (event === 'LogIntoAccount') {
      request({
        uri,
        headers: {
          Authorization: accessToken,
        },
        gzip: true,
        json: true,
      })
        .then((entitlements) => {
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
  }).then((isSubscriber) => {
    if (isSubscriber !== undefined) {
      data.is_subscriber = isSubscriber as boolean
    }

    const signedRes = {
      isSubscriber,
      uri: buildPixelUrl(
        {
          id: fbPixelId,
          ev: event,
          cd: data,
          noscript: 1,
        },
        FB_APP_SECRET
      ),
    }

    if (debug) {
      console.log(`Event: ${event}`)
      console.log(`SignatureParams: ${JSON.stringify(data)}`)
      console.log(`SignatureResponse: ${JSON.stringify(signedRes)}`)
    }
    return signedRes
  })
}

export default { fetch }

/* eslint-disable import/no-extraneous-dependencies */
import { PAYMENT_TRACKER_TOKEN } from 'fusion:environment'
import request from 'request-promise-native'
import { ConentSourceBase } from 'types/content-source'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

export type PaywallTrackingQuery = {
  url_referer: 'text'
  confirm_subscription: 'text'
  medium: 'text'
  is_pwa: 'text'
  user_agent: 'text'
  uuid: 'text'
  arc_order: 'text'
}

type PaywallTrackingParams = PaywallTrackingQuery & ConentSourceBase

const fetch = (key: PaywallTrackingParams): request.RequestPromise<any> => {
  const website = key?.['arc-site']
  const data = key || {}
  const { urls: urlCommon } = PropertiesCommon

  return request({
    method: 'POST',
    uri: `${urlCommon.paymentTracker}/service/arc/paywall/tracking`,
    headers: {
      Authorization: PAYMENT_TRACKER_TOKEN,
      'X-arc-site': website,
    },
    body: data,
    gzip: true,
    json: true,
  })
}

export default {
  fetch,
  params: {
    url_referer: 'text',
    confirm_subscription: 'text',
    medium: 'text',
    is_pwa: 'text',
    user_agent: 'text',
    uuid: 'text',
    arc_order: 'text',
  },
}
